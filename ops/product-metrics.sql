SELECT
  COUNT(DISTINCT session_hash) AS users,
  COUNT(DISTINCT CASE WHEN name = 'results_shown' THEN session_hash END) AS results_shown,
  COUNT(DISTINCT CASE WHEN name = 'feed_opened' THEN session_hash END) AS feed_opened,
  COUNT(DISTINCT CASE WHEN name = 'feed_saved' THEN session_hash END) AS feed_saved,
  COUNT(DISTINCT CASE WHEN name = 'returned' THEN session_hash END) AS returned,
  COUNT(DISTINCT CASE WHEN occurred_on >= date('now', '-6 days') THEN session_hash END) AS users_7d,
  COUNT(DISTINCT CASE WHEN name = 'feed_opened' AND occurred_on >= date('now', '-6 days') THEN session_hash END) AS feed_opened_7d
FROM product_events;
