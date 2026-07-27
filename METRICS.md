# Metrics

## Anonymous funnel

| Event           | Meaning                            |
| --------------- | ---------------------------------- |
| `visited`       | 操作画面を開いた                   |
| `results_shown` | 1件以上の候補が表示された          |
| `feed_opened`   | Blueskyのフィード画面を開いた      |
| `feed_saved`    | Sky Dialの「あとで見る」へ追加した |
| `returned`      | 同じ端末から別日に再訪した         |

各イベントはブラウザで作るUUIDをSHA-256で一方向変換し、イベント名と日付だけをD1へ保存します。同じ端末・イベント・日付は一度だけ数え、35日後に削除します。

## Product outcome

- Candidate rate: `results_shown / users`
- Open rate: `feed_opened / results_shown`
- Local-save rate: `feed_saved / results_shown`
- Return rate: `returned / users`
- Seven-day users and feed opens

`feed_saved`はBluesky内の保存・ピン留めではありません。検証成功は本人への直接確認で判定し、匿名集計だけで代用しません。

## Operator contract

`npm run metrics`は次の形の集計JSONだけを標準出力します。

- `generated_at`
- `service`
- `environment`
- `funnel`
- `rates`

検索語、カテゴリ、フィードURI、UUID、ハッシュ、IPアドレス、生ログは出力しません。分母0の比率は0です。
