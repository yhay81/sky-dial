(() => {
  "use strict";

  const resultRoot = document.querySelector("#feed-results");
  const feedTemplate = document.querySelector("#feed-card-template");
  const savedTemplate = document.querySelector("#saved-card-template");
  const savedTray = document.querySelector("#saved-tray");
  if (
    !(resultRoot instanceof HTMLElement) ||
    !(feedTemplate instanceof HTMLTemplateElement) ||
    !(savedTemplate instanceof HTMLTemplateElement) ||
    !(savedTray instanceof HTMLElement)
  ) {
    return;
  }

  const storageKey = "sky-dial:v1";
  const allowedCategories = new Set([
    "animals",
    "books",
    "creation",
    "food",
    "illustration",
    "japanese",
    "music",
    "news",
    "photo",
    "tech",
  ]);
  const categoryLabels = {
    animals: "動物",
    books: "本",
    creation: "創作",
    food: "食",
    illustration: "イラスト",
    japanese: "日本語",
    music: "音楽",
    news: "ニュース",
    photo: "写真",
    tech: "技術",
  };
  const preferredUris = [
    "at://did:plc:64aqvld6on6kzrejzqha4w6j/app.bsky.feed.generator/n-feed",
    "at://did:plc:vqtxme5e53gonxakqpfpsspg/app.bsky.feed.generator/aaaiywal7okpc",
    "at://did:plc:vy5x3iml3qkmhl3ydhw4jqca/app.bsky.feed.generator/aaajlfhotw73y",
  ];
  const state = {
    category: "all",
    feeds: [],
    query: "",
    saved: [],
    sessionId: crypto.randomUUID(),
    lastVisit: "",
  };

  const text = (value, maximum) =>
    typeof value === "string"
      ? value
          .replaceAll(/\p{Cc}/gu, " ")
          .replaceAll(/\s+/g, " ")
          .trim()
          .slice(0, maximum)
      : "";

  const bskyUrl = (uri) => {
    const match =
      /^at:\/\/(did:plc:[a-z2-7]+)\/app\.bsky\.feed\.generator\/([A-Za-z0-9._~-]+)$/.exec(uri);
    return match ? `https://bsky.app/profile/${match[1]}/feed/${match[2]}` : "";
  };

  const validSessionId = (value) =>
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

  const readState = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (!parsed || typeof parsed !== "object") return;
      if (validSessionId(parsed.sessionId)) state.sessionId = parsed.sessionId;
      if (typeof parsed.lastVisit === "string") state.lastVisit = parsed.lastVisit.slice(0, 10);
      if (Array.isArray(parsed.saved)) {
        state.saved = [
          ...new Set(
            parsed.saved.filter((uri) => typeof uri === "string" && bskyUrl(uri)).slice(0, 3),
          ),
        ];
      }
    } catch {
      // The tool remains usable if storage is blocked or damaged.
    }
  };

  const persist = () => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          lastVisit: state.lastVisit,
          saved: state.saved,
          sessionId: state.sessionId,
        }),
      );
    } catch {
      // Current-view state still works without persistence.
    }
  };

  const track = (name) => {
    void fetch("/api/telemetry", {
      body: JSON.stringify({ name, sessionId: state.sessionId }),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      method: "POST",
    }).catch(() => undefined);
  };

  const normalize = (value) =>
    value.normalize("NFKC").toLocaleLowerCase("ja-JP").replaceAll(/\s+/g, " ").trim();

  const cleanFeed = (value) => {
    if (!value || typeof value !== "object") return null;
    const uri = text(value.uri, 300);
    const expectedUrl = bskyUrl(uri);
    const category = text(value.category, 32);
    if (
      !expectedUrl ||
      value.url !== expectedUrl ||
      !allowedCategories.has(category) ||
      !/^#[0-9a-f]{6}$/i.test(value.accent)
    ) {
      return null;
    }
    const keywords = Array.isArray(value.keywords)
      ? value.keywords
          .map((keyword) => text(keyword, 30))
          .filter(Boolean)
          .slice(0, 8)
      : [];
    return {
      accent: value.accent,
      category,
      description: text(value.description, 180),
      glyph: text(value.glyph, 4),
      indexedAt: text(value.indexedAt, 40),
      keywords,
      likeCount:
        typeof value.likeCount === "number" && Number.isFinite(value.likeCount)
          ? Math.max(0, Math.round(value.likeCount))
          : null,
      name: text(value.name, 72),
      uri,
      url: expectedUrl,
    };
  };

  const scoreFeed = (feed, terms) => {
    const name = normalize(feed.name);
    const description = normalize(feed.description);
    const keywords = normalize(feed.keywords.join(" "));
    let score = Math.log10((feed.likeCount ?? 0) + 1);
    for (const term of terms) {
      let matched = false;
      if (name.includes(term)) {
        score += 9;
        matched = true;
      }
      if (keywords.includes(term)) {
        score += 7;
        matched = true;
      }
      if (description.includes(term)) {
        score += 4;
        matched = true;
      }
      if (!matched) return -1;
    }
    return score;
  };

  const visibleFeeds = () => {
    const categoryFeeds = state.feeds.filter(
      (feed) => state.category === "all" || feed.category === state.category,
    );
    const terms = normalize(state.query).split(" ").filter(Boolean).slice(0, 4);
    if (terms.length === 0 && state.category === "all") {
      return preferredUris
        .map((uri) => categoryFeeds.find((feed) => feed.uri === uri))
        .filter(Boolean);
    }
    return categoryFeeds
      .map((feed, index) => ({ feed, index, score: scoreFeed(feed, terms) }))
      .filter((entry) => entry.score >= 0)
      .sort(
        (left, right) =>
          right.score - left.score ||
          (right.feed.likeCount ?? -1) - (left.feed.likeCount ?? -1) ||
          left.index - right.index,
      )
      .slice(0, 3)
      .map((entry) => entry.feed);
  };

  const dateLabel = (value) => {
    if (!value) return "更新日 —";
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return "更新日 —";
    return `更新 ${new Intl.DateTimeFormat("ja-JP", {
      month: "numeric",
      day: "numeric",
    }).format(date)}`;
  };

  const setSavedButton = (button, feed) => {
    const selected = state.saved.includes(feed.uri);
    button.dataset.selected = String(selected);
    button.setAttribute("aria-pressed", String(selected));
    const mark = button.querySelector("[aria-hidden]");
    if (mark) mark.textContent = selected ? "★" : "☆";
    button.setAttribute(
      "aria-label",
      selected ? `${feed.name}を保存から外す` : `${feed.name}をあとで見るへ保存`,
    );
  };

  const announce = (message) => {
    const status = document.querySelector("#feed-status");
    if (status) status.textContent = message;
  };

  const toggleSaved = (feed) => {
    if (state.saved.includes(feed.uri)) {
      state.saved = state.saved.filter((uri) => uri !== feed.uri);
    } else if (state.saved.length < 3) {
      state.saved = [...state.saved, feed.uri];
      track("feed_saved");
    } else {
      announce("保存は3件までです");
      savedTray.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-4px)" },
          { transform: "translateX(4px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 220 },
      );
      return;
    }
    persist();
    renderResults();
    renderSaved();
  };

  const makeFeedCard = (feed) => {
    const fragment = feedTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".feed-card");
    const orbit = fragment.querySelector(".feed-orbit span");
    const category = fragment.querySelector(".feed-category");
    const heading = fragment.querySelector("h3");
    const description = fragment.querySelector(".feed-description");
    const likes = fragment.querySelector(".feed-likes");
    const updated = fragment.querySelector(".feed-updated");
    const saveButton = fragment.querySelector(".save-feed");
    const openLink = fragment.querySelector(".open-feed");
    if (
      !(card instanceof HTMLElement) ||
      !(orbit instanceof HTMLElement) ||
      !(category instanceof HTMLElement) ||
      !(heading instanceof HTMLElement) ||
      !(description instanceof HTMLElement) ||
      !(likes instanceof HTMLElement) ||
      !(updated instanceof HTMLElement) ||
      !(saveButton instanceof HTMLButtonElement) ||
      !(openLink instanceof HTMLAnchorElement)
    ) {
      return document.createDocumentFragment();
    }

    card.dataset.category = feed.category;
    orbit.textContent = feed.glyph || feed.name.slice(0, 1);
    category.textContent = categoryLabels[feed.category];
    heading.textContent = feed.name;
    description.textContent = feed.description;
    likes.textContent =
      feed.likeCount === null
        ? "—"
        : new Intl.NumberFormat("ja-JP", { notation: "compact" }).format(feed.likeCount);
    updated.textContent = dateLabel(feed.indexedAt);
    setSavedButton(saveButton, feed);
    saveButton.addEventListener("click", () => toggleSaved(feed));
    openLink.href = feed.url;
    openLink.addEventListener("click", () => track("feed_opened"));
    return fragment;
  };

  function renderResults() {
    const feeds = visibleFeeds();
    resultRoot.replaceChildren(...feeds.map(makeFeedCard));
    resultRoot.setAttribute("aria-busy", "false");
    const empty = document.querySelector("#empty-results");
    if (empty instanceof HTMLElement) empty.hidden = feeds.length > 0;
    const count = document.querySelector("#result-count");
    if (count instanceof HTMLOutputElement) count.textContent = `${feeds.length} / 3`;
    if (feeds.length > 0) track("results_shown");
  }

  function renderSaved() {
    const savedFeeds = state.saved
      .map((uri) => state.feeds.find((feed) => feed.uri === uri))
      .filter(Boolean);
    if (state.feeds.length > 0 && savedFeeds.length !== state.saved.length) {
      state.saved = savedFeeds.map((feed) => feed.uri);
      persist();
    }
    if (savedFeeds.length === 0) {
      const empty = document.createElement("div");
      empty.className = "saved-empty";
      const mark = document.createElement("span");
      mark.ariaHidden = "true";
      mark.textContent = "＋";
      const copy = document.createElement("p");
      copy.textContent = "星を押した候補が、ここに並びます。";
      empty.append(mark, copy);
      savedTray.replaceChildren(empty);
    } else {
      const cards = savedFeeds.map((feed) => {
        const fragment = savedTemplate.content.cloneNode(true);
        const card = fragment.querySelector(".saved-card");
        const mark = fragment.querySelector(".saved-mark");
        const heading = fragment.querySelector("strong");
        const category = fragment.querySelector("small");
        const link = fragment.querySelector("a");
        const remove = fragment.querySelector("button");
        if (
          !(card instanceof HTMLElement) ||
          !(mark instanceof HTMLElement) ||
          !(heading instanceof HTMLElement) ||
          !(category instanceof HTMLElement) ||
          !(link instanceof HTMLAnchorElement) ||
          !(remove instanceof HTMLButtonElement)
        ) {
          return document.createDocumentFragment();
        }
        card.dataset.category = feed.category;
        mark.textContent = feed.glyph || feed.name.slice(0, 1);
        heading.textContent = feed.name;
        category.textContent = categoryLabels[feed.category];
        link.href = feed.url;
        link.addEventListener("click", () => track("feed_opened"));
        remove.setAttribute("aria-label", `${feed.name}を保存から外す`);
        remove.addEventListener("click", () => toggleSaved(feed));
        return fragment;
      });
      savedTray.replaceChildren(...cards);
    }
    for (const selector of ["#saved-count", "#header-saved-count"]) {
      const output = document.querySelector(selector);
      if (output) {
        output.textContent =
          selector === "#saved-count" ? `${savedFeeds.length} / 3` : `${savedFeeds.length}`;
      }
    }
    const clear = document.querySelector("#clear-saved");
    if (clear instanceof HTMLButtonElement) clear.hidden = savedFeeds.length === 0;
  }

  const selectCategory = (category) => {
    state.category = category;
    document.querySelectorAll("[data-category]").forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      const selected = button.dataset.category === category;
      button.dataset.selected = String(selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    renderResults();
  };

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button instanceof HTMLButtonElement) {
        selectCategory(button.dataset.category || "all");
      }
    });
  });

  let queryTimer;
  document.querySelector("#feed-query")?.addEventListener("input", (event) => {
    if (!(event.currentTarget instanceof HTMLInputElement)) return;
    state.query = event.currentTarget.value.slice(0, 40);
    clearTimeout(queryTimer);
    queryTimer = setTimeout(renderResults, 140);
  });

  document.querySelector("#reset-filters")?.addEventListener("click", () => {
    state.query = "";
    const input = document.querySelector("#feed-query");
    if (input instanceof HTMLInputElement) input.value = "";
    selectCategory("all");
  });

  document.querySelector("#clear-saved")?.addEventListener("click", () => {
    state.saved = [];
    persist();
    renderResults();
    renderSaved();
  });

  const load = async () => {
    try {
      const response = await fetch("/api/feeds?v=3");
      if (!response.ok) throw new Error("feed_load_failed");
      const body = await response.json();
      state.feeds = Array.isArray(body.feeds) ? body.feeds.map(cleanFeed).filter(Boolean) : [];
      if (state.feeds.length === 0) throw new Error("empty_feed_list");
      renderResults();
      renderSaved();
      const checkedAt = new Date(body.checkedAt);
      announce(
        Number.isNaN(checkedAt.valueOf())
          ? "候補を更新しました"
          : `${new Intl.DateTimeFormat("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(checkedAt)} 更新`,
      );
    } catch {
      resultRoot.replaceChildren();
      resultRoot.setAttribute("aria-busy", "false");
      const empty = document.querySelector("#empty-results");
      if (empty instanceof HTMLElement) {
        empty.hidden = false;
        empty.textContent = "候補を読み込めませんでした。少し待ってから再読み込みしてください。";
      }
      const count = document.querySelector("#result-count");
      if (count) count.textContent = "0 / 3";
      announce("更新できませんでした");
    }
  };

  readState();
  const today = new Date().toISOString().slice(0, 10);
  track("visited");
  if (state.lastVisit && state.lastVisit !== today) track("returned");
  state.lastVisit = today;
  persist();
  renderSaved();
  void load();
})();
