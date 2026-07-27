# Experiment

## User and job

- Target user: 日本語でBlueskyを利用し、目的に合うカスタムフィードを見つけたい人
- Job to be done: 候補を探し回らず、信頼できそうなフィードを3件以内で比較し、Blueskyで開く
- Current workaround: Bluesky内の探索、フィード共有投稿、フィーナビ！のカテゴリ一覧

## Hypothesis

小さく選定した日本語フィードを、視覚的な目的カテゴリと短い検索語で3件へ絞れば、一覧を巡回するよりも短く保存・ピン留め候補へ到達できる。

## Method

- Recruitment channel: `yhay81`からの個別案内と公開導線。外部投稿は公開前時点では未実施
- Participants: 20人
- Duration: 公開から30日
- Comparison: ふだんのBluesky内探索または既存一覧
- Confirmation: 実際にBlueskyで保存・ピン留めしたか、再び使いたいかを本人へ直接確認

## Decision

- Early signal: 5人以上が候補を表示し、2人以上がBlueskyで開く。継続判断ではなく配布を続ける最低条件
- Success signal: 20人中8人以上が実フィードをBlueskyで保存・ピン留めし、5人以上が次回利用意思を直接表明
- Failure signal: 保存・ピン留め確認が4人未満、または「公式検索/フィーナビ！で十分」「候補品質を信頼できない」「探す頻度が低い」に理由が集中
- Deadline: 2026-08-26
- Maximum build time: 2日
- Maximum monthly infrastructure cost: Cloudflare無料枠内

匿名イベントの`feed_saved`はSky Dial内の「あとで見る」であり、Blueskyでの保存・ピン留めを証明しません。最終判断には直接確認を使います。

## Guardrails

- 検索語、カテゴリ、フィードURIをサーバーへ保存しない。
- 公開フィードURI以外の非公開データを扱わない。
- 一般投稿、評価、作者申請を初期機能へ加えない。
- 候補数やAPI取得量のためにレート制限や保持期限を弱めない。
- 成功条件を途中で変更しない。
