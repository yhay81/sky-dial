import { describe, expect, it, vi } from "vitest";

import { feedDefinitions, loadFeeds } from "../src/feed-data";

describe("feed data", () => {
  it("requests only the fixed public feed URIs and normalizes live metadata", async () => {
    const requested: URL[] = [];
    const target = feedDefinitions[0];
    const fakeFetch = async (input: RequestInfo | URL) => {
      const url = new URL(
        typeof input === "string" ? input : input instanceof URL ? input.href : input.url,
      );
      requested.push(url);
      return Response.json({
        feeds: url.searchParams.getAll("feeds").includes(target?.uri ?? "")
          ? [
              {
                description: "<b>日本語</b>\u0000 の投稿",
                displayName: "  N-Feed Live  ",
                indexedAt: "2026-07-27T01:02:03.000Z",
                likeCount: 321.4,
                uri: target?.uri,
              },
              {
                displayName: "Injected",
                uri: "at://did:plc:outside/app.bsky.feed.generator/not-curated",
              },
            ]
          : [],
      });
    };

    const payload = await loadFeeds(fakeFetch);
    const feed = payload.feeds.find((item) => item.uri === target?.uri);

    expect(feedDefinitions).toHaveLength(30);
    expect(requested).toHaveLength(2);
    expect(
      requested.every(
        (url) =>
          url.origin === "https://public.api.bsky.app" &&
          url.pathname === "/xrpc/app.bsky.feed.getFeedGenerators",
      ),
    ).toBe(true);
    expect(requested.flatMap((url) => url.searchParams.getAll("feeds"))).toEqual(
      feedDefinitions.map((definition) => definition.uri),
    );
    expect(payload.feeds).toHaveLength(30);
    expect(payload.liveCount).toBe(1);
    expect(feed).toMatchObject({
      description: "日本語の投稿を幅広く流すカスタムフィード。",
      likeCount: 321,
      name: "N-Feed Live",
    });
    expect(payload.feeds.some((item) => item.name === "Injected")).toBe(false);
  });

  it("keeps every curated feed usable when the upstream API fails", async () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const payload = await loadFeeds(() => Promise.reject(new Error("offline")));

    expect(payload.feeds).toHaveLength(30);
    expect(payload.liveCount).toBe(0);
    expect(payload.feeds.every((feed) => feed.name && feed.description && feed.url)).toBe(true);
    expect(payload.feeds.every((feed) => feed.likeCount === null)).toBe(true);
    warning.mockRestore();
  });
});
