# Sky Dial

日本語のBlueskyカスタムフィードを、目的と検索語から3件以内へ絞り、Blueskyで開くWebアプリです。

## Product

- 10カテゴリを円形ダイヤルから選択
- 30件の選定済み公開フィードを端末内で検索・順位付け
- 名称、説明、いいね数、更新日時はBluesky公開APIから更新
- API障害時も選定済みの名称と説明で利用可能
- 最大3件を「あとで見る」へ端末保存
- 登録、投稿、評価、課金なし

検索語、カテゴリ、フィードURIはサーバーへ送りません。匿名イベントは日単位で重複排除し、35日後に削除します。

## Stack

- Cloudflare Workers / D1 / Workers Rate Limiting
- Hono / Hono JSX
- Vite+ / TypeScript / Vitest / Oxlint / Oxfmt

Better Authは、所有者アカウントや長期セッションが不要なため導入していません。

## Local development

```powershell
npm ci
npx wrangler d1 migrations apply sky-dial --local
npm run dev
```

## Verification

```powershell
npm run release:check
npm run check
npm test
npm run build
npm audit
npm run metrics -- -Local
```

## Deployment

```powershell
npx wrangler d1 migrations apply sky-dial --remote
npm run deploy
npm run indexnow
```

## Public data

対象フィードは公開URIを小さく手動選定し、`app.bsky.feed.getFeedGenerators`で公開メタデータを更新します。一般投稿によるフィード登録は受け付けません。

- [Bluesky custom feeds](https://docs.bsky.app/docs/tutorials/custom-feeds)
- [Viewing feeds](https://docs.bsky.app/docs/tutorials/viewing-feeds)
- [フィーナビ！](https://navi.1yen.jp/introduction/about.html)

検証条件は[EXPERIMENT.md](./EXPERIMENT.md)、集計定義は[METRICS.md](./METRICS.md)、データ境界は[PRIVACY.md](./PRIVACY.md)を参照してください。
