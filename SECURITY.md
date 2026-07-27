# Security Policy

## Reporting

脆弱性は公開Issueへ書かず、GitHubのprivate vulnerability reportingから連絡してください。

## Baseline

- APIは固定したBluesky公開エンドポイントと固定フィードURIだけへ接続する。
- 外部APIの文字列をHTMLとして描画せず、長さと制御文字を正規化する。
- テレメトリは同一サイトJSON、UUID形式、イベントallowlist、500 bytes以下に限定する。
- テレメトリ書き込みはCloudflare Workers Rate Limitingで制限する。
- CSP、HSTS、`nosniff`、frame拒否、Permissions Policyを返す。
- D1へ検索語、カテゴリ、フィードURI、UUIDの原文を保存しない。
- 依存関係、互換日付、D1 migrationをGitで固定する。

## Supported version

公開中の最新`main`だけをサポートします。
