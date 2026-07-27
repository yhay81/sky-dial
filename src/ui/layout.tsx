import type { Child } from "hono/jsx";

import { product } from "../config/product";

type LayoutProps = {
  children: Child;
  description?: string;
  noIndex?: boolean;
  path?: string;
  title?: string;
};

export function Layout({
  children,
  description = product.description,
  noIndex = false,
  path = "/",
  title = product.name,
}: LayoutProps) {
  const canonical = new URL(path, product.url).href;
  return (
    <html itemscope itemtype="https://schema.org/WebApplication" lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={description} name="description" />
        <meta content={product.name} itemProp="name" />
        <meta content={description} itemProp="description" />
        <meta content={product.url} itemProp="url" />
        <meta content={product.applicationCategory} itemProp="applicationCategory" />
        <meta content="Any" itemProp="operatingSystem" />
        <meta content="true" itemProp="isAccessibleForFree" />
        <meta content={description} property="og:description" />
        <meta content={`${product.url}/og.png`} property="og:image" />
        <meta content="1664" property="og:image:width" />
        <meta content="928" property="og:image:height" />
        <meta content="ja_JP" property="og:locale" />
        <meta content={title} property="og:title" />
        <meta content="website" property="og:type" />
        <meta content={canonical} property="og:url" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content={description} name="twitter:description" />
        <meta content={`${product.url}/og.png`} name="twitter:image" />
        <meta content={title} name="twitter:title" />
        {noIndex ? <meta content="noindex" name="robots" /> : null}
        <link href={canonical} rel="canonical" />
        <link href="/icon.svg" rel="icon" type="image/svg+xml" />
        <link href="/manifest.webmanifest" rel="manifest" />
        <link href="/styles.css?v=2" rel="stylesheet" />
        <script defer src="/app.js?v=5"></script>
        <title>{title}</title>
      </head>
      <body>
        <a class="skip-link" href="#main">
          本文へ移動
        </a>
        <header class="site-header">
          <a class="brand" href="/">
            <span aria-hidden="true" class="brand-mark">
              <i></i>
            </span>
            {product.name}
          </a>
          <nav aria-label="メイン">
            <a class="saved-link" href="#saved-panel">
              保存 <output id="header-saved-count">0</output>
            </a>
            <a href="/privacy">プライバシー</a>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer>
          <span>Sky Dial</span>
          <nav aria-label="フッター">
            <a href="/privacy">プライバシー</a>
            <a href="/healthz">稼働状態</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
