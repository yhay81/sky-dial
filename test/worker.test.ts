import { describe, expect, it } from "vitest";

import { app, type Bindings } from "../src/worker";

const sessionId = "313c096a-2ab6-4bda-a6bc-21361e522e99";

type RecordedStatement = {
  bindings: unknown[];
  sql: string;
};

function environment(options: { limit?: boolean } = {}) {
  const recorded: RecordedStatement[] = [];
  const db = {
    prepare(sql: string) {
      let bindings: unknown[] = [];
      const statement = {
        bind(...values: unknown[]) {
          bindings = values;
          return statement;
        },
        run: async () => {
          recorded.push({ bindings, sql });
          return { meta: { changes: 1 }, success: true };
        },
      };
      return statement;
    },
  };
  const bindings: Bindings = {
    ASSETS: {
      fetch: () => Promise.resolve(new Response("not used")),
    } as unknown as Fetcher,
    DB: db as unknown as D1Database,
    WRITE_LIMITER: {
      limit: () => Promise.resolve({ success: options.limit !== false }),
    },
  };
  return { bindings, recorded };
}

async function hash(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

describe("worker", () => {
  it("renders the visual dial, three-result surface, and saved tray", async () => {
    const { bindings } = environment();
    const response = await app.request("/", undefined, bindings);
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-security-policy")).toContain("default-src 'self'");
    expect(response.headers.get("content-security-policy")).toContain("connect-src 'self'");
    expect(html).toContain('lang="ja"');
    expect(html).toContain('class="category-dial"');
    expect(html).toContain('id="feed-results"');
    expect(html).toContain('id="saved-tray"');
    expect(html).toContain("Blueskyで開く");
    expect(html).not.toContain('class="hero"');
    expect(html).not.toContain("仮説");
    expect(html).not.toContain("成功条件");
    expect(html).not.toContain("PUBLIC VALIDATION");
  });

  it("stores only a hash and allowlisted event name", async () => {
    const { bindings, recorded } = environment();
    const response = await app.request(
      "/api/telemetry",
      {
        body: JSON.stringify({ name: "feed_opened", sessionId }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
      bindings,
    );

    expect(response.status).toBe(204);
    expect(recorded).toHaveLength(1);
    expect(recorded[0]?.sql).toContain("INSERT OR IGNORE INTO product_events");
    expect(recorded[0]?.bindings).toEqual([await hash(sessionId), "feed_opened"]);
    expect(recorded[0]?.bindings).not.toContain(sessionId);
  });

  it("cannot receive query, category, or feed URI through telemetry", async () => {
    const { bindings, recorded } = environment();
    const response = await app.request(
      "/api/telemetry",
      {
        body: JSON.stringify({
          category: "books",
          name: "results_shown",
          query: "private query",
          sessionId,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
      bindings,
    );

    expect(response.status).toBe(400);
    expect(recorded).toHaveLength(0);
  });

  it("rejects cross-site, unknown, oversized, and rate-limited telemetry", async () => {
    const { bindings, recorded } = environment();
    const crossSite = await app.request(
      "/api/telemetry",
      {
        body: JSON.stringify({ name: "visited", sessionId }),
        headers: { "Content-Type": "application/json", "Sec-Fetch-Site": "cross-site" },
        method: "POST",
      },
      bindings,
    );
    const unknown = await app.request(
      "/api/telemetry",
      {
        body: JSON.stringify({ name: "query_submitted", sessionId }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
      bindings,
    );
    const oversized = await app.request(
      "/api/telemetry",
      {
        body: JSON.stringify({ name: "visited", padding: "x".repeat(600), sessionId }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
      bindings,
    );
    const limitedEnvironment = environment({ limit: false });
    const limited = await app.request(
      "/api/telemetry",
      {
        body: JSON.stringify({ name: "visited", sessionId }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
      limitedEnvironment.bindings,
    );

    expect(crossSite.status).toBe(403);
    expect(unknown.status).toBe(400);
    expect(oversized.status).toBe(400);
    expect(limited.status).toBe(429);
    expect(recorded).toHaveLength(0);
    expect(limitedEnvironment.recorded).toHaveLength(0);
  });

  it("serves privacy, health, API 404, and an HTML not-found page", async () => {
    const { bindings } = environment();
    const privacy = await app.request("/privacy", undefined, bindings);
    const privacyHtml = await privacy.text();
    const health = await app.request("/healthz", undefined, bindings);
    const apiMissing = await app.request("/api/missing", undefined, bindings);
    const missing = await app.request("/missing", undefined, bindings);
    const missingHtml = await missing.text();

    expect(privacy.status).toBe(200);
    expect(privacyHtml).toContain("検索した言葉は、送信しません");
    expect(privacyHtml).toContain(
      '<link href="https://sky-dial.yusuke8h.workers.dev/privacy" rel="canonical"',
    );
    expect(health.status).toBe(200);
    expect(health.headers.get("cache-control")).toBe("no-store");
    expect((await health.json<{ healthy: boolean }>()).healthy).toBe(true);
    expect(apiMissing.status).toBe(404);
    expect((await apiMissing.json<{ error: string }>()).error).toBe("not_found");
    expect(missing.status).toBe(404);
    expect(missingHtml).toContain("ページが見つかりません");
    expect(missingHtml).toContain('<meta content="noindex" name="robots"');
  });
});
