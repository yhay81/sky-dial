# Decisions

## 2026-07-27 — 30-day public pilot

- Status: advance
- Evidence: 日本語UIを持つ既存ナビゲータが2025年・2026年の登録を継続し、Bluesky公式のカスタムフィード機構と公開取得APIが利用可能
- Decision: 30件の公開フィードを手動選定し、目的と検索語から3件へ絞る
- Contradicting evidence: Bluesky公式検索と既存ナビゲータで十分な可能性があり、探索頻度と移行意図は未確認
- Scope boundary: 認証、課金、一般UGC、評価、作者申請を持たない
- Next review: 2026-08-26

## 2026-07-27 — Browser-side search

- Search and category filtering run only in the browser.
- The Worker receives neither query text nor selected category.
- The Worker refreshes only fixed public feed metadata.
- Better Auth is omitted because there is no owner account or protected state.
