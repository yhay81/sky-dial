export type FeedCategory =
  | "animals"
  | "books"
  | "creation"
  | "food"
  | "illustration"
  | "japanese"
  | "music"
  | "news"
  | "photo"
  | "tech";

type FeedDefinition = {
  accent: string;
  category: FeedCategory;
  fallbackDescription: string;
  fallbackName: string;
  glyph: string;
  keywords: string[];
  uri: string;
};

export type FeedCard = {
  accent: string;
  category: FeedCategory;
  description: string;
  glyph: string;
  indexedAt: string;
  keywords: string[];
  likeCount: number | null;
  name: string;
  uri: string;
  url: string;
};

const definitions: FeedDefinition[] = [
  {
    accent: "#3766E8",
    category: "japanese",
    fallbackDescription: "日本語の投稿を幅広く流すカスタムフィード。",
    fallbackName: "N-Feed",
    glyph: "あ",
    keywords: ["日本語", "総合", "会話"],
    uri: "at://did:plc:64aqvld6on6kzrejzqha4w6j/app.bsky.feed.generator/n-feed",
  },
  {
    accent: "#4F7FF2",
    category: "japanese",
    fallbackDescription: "日本語で書かれたテキスト投稿を中心に見るフィード。",
    fallbackName: "JP+Text",
    glyph: "文",
    keywords: ["日本語", "テキスト", "文章"],
    uri: "at://did:plc:ujbv5agep7botiks7dozqbo3/app.bsky.feed.generator/aaadk6jeazfuc",
  },
  {
    accent: "#7797F7",
    category: "japanese",
    fallbackDescription: "日本語の話題になっているテキスト投稿を探すフィード。",
    fallbackName: "Japanese Hot text",
    glyph: "熱",
    keywords: ["日本語", "話題", "人気"],
    uri: "at://did:plc:zw26cvxphqe6czbg42qn2cbw/app.bsky.feed.generator/aaaihvgkfyd3e",
  },
  {
    accent: "#F06B8D",
    category: "illustration",
    fallbackDescription: "水彩で描かれた作品と制作の投稿を集めるフィード。",
    fallbackName: "watercolor",
    glyph: "水",
    keywords: ["水彩", "絵", "アート"],
    uri: "at://did:plc:35lvx35atkar45zhqwl7a3zp/app.bsky.feed.generator/aaak3r4gfx4xw",
  },
  {
    accent: "#E44F78",
    category: "illustration",
    fallbackDescription: "反応を集めているイラスト作品を見つけるフィード。",
    fallbackName: "人気イラスト",
    glyph: "絵",
    keywords: ["イラスト", "絵", "人気"],
    uri: "at://did:plc:vqtxme5e53gonxakqpfpsspg/app.bsky.feed.generator/aaaiywal7okpc",
  },
  {
    accent: "#C94D70",
    category: "illustration",
    fallbackDescription: "鉛筆、絵具、版画などアナログ制作の投稿を見るフィード。",
    fallbackName: "アナログアート",
    glyph: "筆",
    keywords: ["アナログ", "絵", "画材"],
    uri: "at://did:plc:33s2hsqykgchtnzeff7ihqvk/app.bsky.feed.generator/aaaiqlffpxmli",
  },
  {
    accent: "#E9553B",
    category: "news",
    fallbackDescription: "日本語で読めるニュース投稿をまとめて見るフィード。",
    fallbackName: "ニュース（日本語）",
    glyph: "新",
    keywords: ["ニュース", "日本", "時事"],
    uri: "at://did:plc:ssebkmhtxgk33r67ggkfl7xr/app.bsky.feed.generator/aaaajtub7bar2",
  },
  {
    accent: "#F1704F",
    category: "news",
    fallbackDescription: "映画、音楽、芸能などエンタメニュースを追うフィード。",
    fallbackName: "エンタメニュース",
    glyph: "娱",
    keywords: ["エンタメ", "映画", "芸能", "ニュース"],
    uri: "at://did:plc:ssebkmhtxgk33r67ggkfl7xr/app.bsky.feed.generator/aaapo6otw3txs",
  },
  {
    accent: "#C83C35",
    category: "news",
    fallbackDescription: "サイバーセキュリティに関する日本語情報を追うフィード。",
    fallbackName: "Cyber Security",
    glyph: "盾",
    keywords: ["セキュリティ", "脆弱性", "ニュース"],
    uri: "at://did:plc:i47tsqkj3vckd3pct4ryp7tv/app.bsky.feed.generator/aaajomi5ctnz2",
  },
  {
    accent: "#12A887",
    category: "tech",
    fallbackDescription: "Go言語の技術記事、開発メモ、会話を集めるフィード。",
    fallbackName: "golang",
    glyph: "Go",
    keywords: ["Go", "Golang", "プログラミング"],
    uri: "at://did:plc:26eoqvsiov3hmsfqruoi4d3s/app.bsky.feed.generator/aaaid2c3aam4w",
  },
  {
    accent: "#169B7E",
    category: "tech",
    fallbackDescription: "プログラミングやソフトウェア開発の投稿を見るフィード。",
    fallbackName: "プログラミング",
    glyph: "</>",
    keywords: ["プログラミング", "開発", "コード"],
    uri: "at://did:plc:46deiyrvsknr6jfhpy6hazep/app.bsky.feed.generator/aaaio6wxwwjfi",
  },
  {
    accent: "#2EB499",
    category: "tech",
    fallbackDescription: "生成AIの活用例や使い方を日本語で探すフィード。",
    fallbackName: "生成AI活用法",
    glyph: "AI",
    keywords: ["生成AI", "AI", "活用"],
    uri: "at://did:plc:dzpllgtrvsgrjttsqmzaxe5v/app.bsky.feed.generator/aaaiv7gfzyjyg",
  },
  {
    accent: "#2587B8",
    category: "photo",
    fallbackDescription: "海辺で見つけた漂着物やビーチコーミングの写真を見るフィード。",
    fallbackName: "ビーチコーミング",
    glyph: "波",
    keywords: ["海", "浜辺", "写真", "ビーチコーミング"],
    uri: "at://did:plc:aymxgcl35x7z2fxrmwm3sk5h/app.bsky.feed.generator/aaaj6tduesqdi",
  },
  {
    accent: "#2875A1",
    category: "photo",
    fallbackDescription: "NikonやLeicaで撮られた写真と機材の投稿を見るフィード。",
    fallbackName: "Nikon / Leica",
    glyph: "◉",
    keywords: ["Nikon", "Leica", "カメラ", "写真"],
    uri: "at://did:plc:fs4fm7dpz7ineau52hijo2xe/app.bsky.feed.generator/aaafw6s4cquek",
  },
  {
    accent: "#4B92B8",
    category: "photo",
    fallbackDescription: "日常のささやかな一枚や、気軽な写真投稿を見るフィード。",
    fallbackName: "どうでもいい！",
    glyph: "日",
    keywords: ["日常", "写真", "スナップ"],
    uri: "at://did:plc:s6wnmqbuwcs44lkzjxlrlfj2/app.bsky.feed.generator/aaamuwc2asb6a",
  },
  {
    accent: "#8B61C2",
    category: "books",
    fallbackDescription: "本棚、読書記録、気になる本の投稿を集めるフィード。",
    fallbackName: "Bookshelf",
    glyph: "本",
    keywords: ["本", "読書", "本棚"],
    uri: "at://did:plc:vy5x3iml3qkmhl3ydhw4jqca/app.bsky.feed.generator/aaajlfhotw73y",
  },
  {
    accent: "#7650AC",
    category: "books",
    fallbackDescription: "国書刊行会の本や関連する読書投稿を見るフィード。",
    fallbackName: "国書刊行会",
    glyph: "国",
    keywords: ["本", "出版", "国書刊行会"],
    uri: "at://did:plc:y4lmkgbgwktjfoftz3ucer2p/app.bsky.feed.generator/aaansuo42bbfa",
  },
  {
    accent: "#9B75C7",
    category: "books",
    fallbackDescription: "ミステリー小説、感想、読書記録を集めるフィード。",
    fallbackName: "ミステリー",
    glyph: "?",
    keywords: ["ミステリー", "小説", "読書"],
    uri: "at://did:plc:lyrmsmhhg7vzz4ghj44y5xzq/app.bsky.feed.generator/ac93dbe7629d",
  },
  {
    accent: "#E19A31",
    category: "animals",
    fallbackDescription: "大きな犬たちの写真や暮らしを眺めるフィード。",
    fallbackName: "大型犬",
    glyph: "犬",
    keywords: ["犬", "大型犬", "動物"],
    uri: "at://did:plc:7r6esmrk57rzhueg5xz36ybp/app.bsky.feed.generator/aaajl47r67agm",
  },
  {
    accent: "#D8852C",
    category: "animals",
    fallbackDescription: "毛布でくつろぐ犬や猫の写真を集めるフィード。",
    fallbackName: "犬猫毛布",
    glyph: "眠",
    keywords: ["犬", "猫", "毛布", "動物"],
    uri: "at://did:plc:hxegvdc3i2upykepczv3fx6c/app.bsky.feed.generator/aaaaa7r6lcny2",
  },
  {
    accent: "#F0AE4B",
    category: "animals",
    fallbackDescription: "子猫の写真や動画をまとめて楽しむフィード。",
    fallbackName: "子猫天国",
    glyph: "猫",
    keywords: ["猫", "子猫", "動物"],
    uri: "at://did:plc:hxegvdc3i2upykepczv3fx6c/app.bsky.feed.generator/aaach5pwgsftg",
  },
  {
    accent: "#78A835",
    category: "food",
    fallbackDescription: "植物性の料理、献立、レシピを探すフィード。",
    fallbackName: "Vegan Recipes",
    glyph: "葉",
    keywords: ["ヴィーガン", "料理", "レシピ"],
    uri: "at://did:plc:6odbrzw3j64dshtya33ckxe2/app.bsky.feed.generator/aaafsubuool7c",
  },
  {
    accent: "#68992B",
    category: "food",
    fallbackDescription: "日本の季節の食べ物や旬の味を楽しむフィード。",
    fallbackName: "日本の季節の食",
    glyph: "旬",
    keywords: ["季節", "和食", "料理", "食"],
    uri: "at://did:plc:rlvjis3tbvxlyyipndzb5gn5/app.bsky.feed.generator/aaagnwkwteqok",
  },
  {
    accent: "#8FB449",
    category: "food",
    fallbackDescription: "ファストフードの新商品や食べた記録を見るフィード。",
    fallbackName: "Fast Food",
    glyph: "食",
    keywords: ["ファストフード", "新商品", "食"],
    uri: "at://did:plc:eecol4eiydvds57lcihf3bbx/app.bsky.feed.generator/fast-food",
  },
  {
    accent: "#B84F95",
    category: "music",
    fallbackDescription: "ジャズの演奏、作品、話題を探すフィード。",
    fallbackName: "Jazz",
    glyph: "♪",
    keywords: ["ジャズ", "音楽", "演奏"],
    uri: "at://did:plc:tiof7p5zsplfetwern3gj7pc/app.bsky.feed.generator/aaan6lxm23ef4",
  },
  {
    accent: "#A94587",
    category: "music",
    fallbackDescription: "はっぴいえんど周辺や風街の音楽を語るフィード。",
    fallbackName: "kazemachi",
    glyph: "風",
    keywords: ["風街", "音楽", "はっぴいえんど"],
    uri: "at://did:plc:7lqpacozemtviidikmsnpct6/app.bsky.feed.generator/aaamxtbg4b3z2",
  },
  {
    accent: "#C76AAB",
    category: "music",
    fallbackDescription: "オタク向けクラブイベントやDJ情報を集めるフィード。",
    fallbackName: "オタククラブイベント",
    glyph: "DJ",
    keywords: ["クラブ", "DJ", "イベント", "音楽"],
    uri: "at://did:plc:2i42hcu22b2gv5uhihls46a3/app.bsky.feed.generator/aaahmmpzokbvm",
  },
  {
    accent: "#E06B55",
    category: "creation",
    fallbackDescription: "同人誌即売会や創作イベントの開催情報を追うフィード。",
    fallbackName: "同人イベント",
    glyph: "創",
    keywords: ["同人", "即売会", "創作", "イベント"],
    uri: "at://did:plc:2i42hcu22b2gv5uhihls46a3/app.bsky.feed.generator/aaahmump3utts",
  },
  {
    accent: "#CE5748",
    category: "creation",
    fallbackDescription: "東方Projectのイベントや頒布情報を追うフィード。",
    fallbackName: "東方イベント",
    glyph: "東",
    keywords: ["東方", "同人", "創作", "イベント"],
    uri: "at://did:plc:2i42hcu22b2gv5uhihls46a3/app.bsky.feed.generator/aaahmtl5smsbs",
  },
  {
    accent: "#EB806C",
    category: "creation",
    fallbackDescription: "クリエイター向けオークションの作品投稿を見るフィード。",
    fallbackName: "つなぐオークション",
    glyph: "◇",
    keywords: ["イラスト", "オークション", "創作"],
    uri: "at://did:plc:jsoidtiis2m2ftznjj4h6wcu/app.bsky.feed.generator/tngAuction",
  },
];

const categoryRank: FeedCategory[] = [
  "japanese",
  "illustration",
  "news",
  "tech",
  "photo",
  "books",
  "animals",
  "food",
  "music",
  "creation",
];

type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

function stringValue(value: unknown, maximum: number) {
  return typeof value === "string"
    ? value
        .replaceAll(/<[^>]*>/g, " ")
        .replaceAll(/\p{Cc}/gu, " ")
        .replaceAll(/\s+/g, " ")
        .trim()
        .slice(0, maximum)
    : "";
}

function feedUrl(uri: string) {
  const match = /^at:\/\/(did:plc:[a-z2-7]+)\/app\.bsky\.feed\.generator\/([A-Za-z0-9._~-]+)$/.exec(
    uri,
  );
  return match
    ? `https://bsky.app/profile/${match[1] ?? ""}/feed/${match[2] ?? ""}`
    : "https://bsky.app/";
}

function fallback(definition: FeedDefinition): FeedCard {
  return {
    accent: definition.accent,
    category: definition.category,
    description: definition.fallbackDescription,
    glyph: definition.glyph,
    indexedAt: "",
    keywords: definition.keywords,
    likeCount: null,
    name: definition.fallbackName,
    uri: definition.uri,
    url: feedUrl(definition.uri),
  };
}

function chunk<T>(values: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

async function fetchChunk(uris: string[], fetcher: Fetcher) {
  const endpoint = new URL("https://public.api.bsky.app/xrpc/app.bsky.feed.getFeedGenerators");
  uris.forEach((uri) => endpoint.searchParams.append("feeds", uri));
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6500);
  try {
    const response = await fetcher(endpoint, {
      headers: {
        accept: "application/json",
        "user-agent": "SkyDial/0.1 (+https://sky-dial.yusuke8h.workers.dev)",
      },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`bluesky_${response.status}`);
    }
    const body = (await response.json()) as Record<string, unknown>;
    return Array.isArray(body.feeds) ? body.feeds : [];
  } finally {
    clearTimeout(timer);
  }
}

export async function loadFeeds(fetcher: Fetcher = fetch) {
  const allowedUris = new Set(definitions.map((definition) => definition.uri));
  const batches = chunk(
    definitions.map((definition) => definition.uri),
    25,
  );
  const settled = await Promise.allSettled(batches.map((batch) => fetchChunk(batch, fetcher)));
  const live = new Map<string, Record<string, unknown>>();
  for (const result of settled) {
    if (result.status === "rejected") {
      console.warn(
        JSON.stringify({
          event: "feed_metadata_failed",
          message: result.reason instanceof Error ? result.reason.message : "unknown_error",
        }),
      );
      continue;
    }
    for (const item of result.value) {
      if (!item || typeof item !== "object") continue;
      const record = item as Record<string, unknown>;
      const uri = stringValue(record.uri, 300);
      if (allowedUris.has(uri)) live.set(uri, record);
    }
  }

  const feeds = definitions.map((definition) => {
    const base = fallback(definition);
    const current = live.get(definition.uri);
    if (!current) return base;
    const likeCount =
      typeof current.likeCount === "number" && Number.isFinite(current.likeCount)
        ? Math.max(0, Math.round(current.likeCount))
        : null;
    return {
      ...base,
      indexedAt: stringValue(current.indexedAt, 40),
      likeCount,
      name: stringValue(current.displayName, 72) || definition.fallbackName,
    };
  });

  return {
    checkedAt: new Date().toISOString(),
    feeds: feeds.sort((left, right) => {
      const categoryDifference =
        categoryRank.indexOf(left.category) - categoryRank.indexOf(right.category);
      if (categoryDifference !== 0) return categoryDifference;
      return (right.likeCount ?? -1) - (left.likeCount ?? -1);
    }),
    liveCount: live.size,
  };
}

export { definitions as feedDefinitions };
