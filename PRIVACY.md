# Privacy

## Browser-only data

- 入力した検索語
- 選んだカテゴリ
- 「あとで見る」へ入れた最大3件の公開フィードURI
- 匿名の利用識別子と最終訪問日

検索語とカテゴリは永続化しません。保存候補は利用者自身がブラウザのサイトデータを消すか、画面の「すべて外す」で削除できます。

## Server-side data

D1には以下だけを保存します。

- 匿名UUIDのSHA-256ハッシュ
- 許可済みイベント名
- 発生日

検索語、カテゴリ、フィードURI、表示名、投稿本文、メールアドレス、IPアドレスはD1へ保存しません。Cloudflareの短期セキュリティログは基盤側の設定に従います。

## Public upstream data

固定した公開フィードURIについて、Sky DialのWorkerがBluesky公開APIから名称、説明、いいね数、更新日時を取得します。ブラウザからBluesky APIへ直接問い合わせません。Blueskyで開いた後の処理にはBluesky側の方針が適用されます。

## Retention

匿名イベントは35日後に日次処理で削除します。広告Cookieと外部解析SDKは使用しません。

## Operator

- Operator: `yhay81`
- Security reports: GitHub private vulnerability reporting
