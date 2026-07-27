import { Layout } from "./layout";

const categories = [
  { angle: 0, glyph: "あ", label: "日本語", value: "japanese" },
  { angle: 36, glyph: "✦", label: "イラスト", value: "illustration" },
  { angle: 72, glyph: "▤", label: "ニュース", value: "news" },
  { angle: 108, glyph: "</>", label: "技術", value: "tech" },
  { angle: 144, glyph: "◉", label: "写真", value: "photo" },
  { angle: 180, glyph: "▥", label: "本", value: "books" },
  { angle: 216, glyph: "♧", label: "動物", value: "animals" },
  { angle: 252, glyph: "⌁", label: "食", value: "food" },
  { angle: 288, glyph: "♪", label: "音楽", value: "music" },
  { angle: 324, glyph: "◇", label: "創作", value: "creation" },
] as const;

export function HomePage() {
  return (
    <Layout>
      <section class="dial-workbench" id="product">
        <aside class="dial-panel" aria-labelledby="dial-title">
          <header class="panel-head">
            <div>
              <span class="step-mark">01</span>
              <h1 id="dial-title">気分を合わせる</h1>
            </div>
            <button class="text-button" id="reset-filters" type="button">
              戻す
            </button>
          </header>

          <div class="category-dial" role="group" aria-label="カテゴリ">
            <div aria-hidden="true" class="dial-rings">
              <i></i>
              <i></i>
              <i></i>
            </div>
            {categories.map((category) => (
              <button
                aria-pressed="false"
                class="dial-choice"
                data-angle={category.angle}
                data-category={category.value}
                type="button"
              >
                <span aria-hidden="true">{category.glyph}</span>
                <b>{category.label}</b>
              </button>
            ))}
            <button
              aria-pressed="true"
              class="dial-center"
              data-category="all"
              data-selected="true"
              type="button"
            >
              <span aria-hidden="true">◎</span>
              <b>すべて</b>
            </button>
          </div>

          <label class="search-box">
            <span class="visually-hidden">フィードを検索</span>
            <i aria-hidden="true"></i>
            <input
              autocomplete="off"
              id="feed-query"
              maxlength={40}
              placeholder="例：犬、読書、Go"
              type="search"
            />
            <kbd>3</kbd>
          </label>
        </aside>

        <section class="result-panel" aria-labelledby="result-title">
          <header class="panel-head results-head">
            <div>
              <span class="step-mark">02</span>
              <h2 id="result-title">3つに絞る</h2>
            </div>
            <div class="result-state">
              <output id="result-count">読込中</output>
              <span aria-live="polite" id="feed-status">
                更新しています
              </span>
            </div>
          </header>

          <div aria-busy="true" class="feed-stack" id="feed-results">
            {[0, 1, 2].map((index) => (
              <article aria-hidden="true" class="feed-card skeleton" key={index}>
                <i></i>
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </article>
            ))}
          </div>
          <p class="empty-state" hidden id="empty-results">
            見つかりません。言葉を短くするか、すべてに戻してください。
          </p>
        </section>

        <aside class="saved-panel" id="saved-panel" aria-labelledby="saved-title">
          <header class="panel-head">
            <div>
              <span class="step-mark">03</span>
              <h2 id="saved-title">あとで見る</h2>
            </div>
            <output id="saved-count">0 / 3</output>
          </header>
          <div class="saved-tray" id="saved-tray">
            <div class="saved-empty">
              <span aria-hidden="true">＋</span>
              <p>星を押した候補が、ここに並びます。</p>
            </div>
          </div>
          <button class="text-button clear-saved" hidden id="clear-saved" type="button">
            すべて外す
          </button>
        </aside>
      </section>

      <template id="feed-card-template">
        <article class="feed-card">
          <div aria-hidden="true" class="feed-orbit">
            <span></span>
            <i></i>
          </div>
          <div class="feed-copy">
            <header>
              <div>
                <span class="feed-category"></span>
                <h3></h3>
              </div>
              <button class="save-feed" type="button">
                <span aria-hidden="true">☆</span>
                <span class="visually-hidden">あとで見るへ保存</span>
              </button>
            </header>
            <p class="feed-description"></p>
            <footer>
              <div class="feed-meta">
                <span class="feed-likes"></span>
                <span class="feed-updated"></span>
              </div>
              <a class="open-feed" rel="noreferrer" target="_blank">
                Blueskyで開く <span aria-hidden="true">↗</span>
              </a>
            </footer>
          </div>
        </article>
      </template>

      <template id="saved-card-template">
        <article class="saved-card">
          <span aria-hidden="true" class="saved-mark"></span>
          <div>
            <strong></strong>
            <small></small>
          </div>
          <a rel="noreferrer" target="_blank">
            開く <span aria-hidden="true">↗</span>
          </a>
          <button type="button">
            <span aria-hidden="true">×</span>
            <span class="visually-hidden">保存から外す</span>
          </button>
        </article>
      </template>
    </Layout>
  );
}

export function PrivacyPage() {
  return (
    <Layout path="/privacy" title="プライバシー | Sky Dial">
      <article class="prose">
        <span class="step-mark">PRIVACY</span>
        <h1>検索した言葉は、送信しません</h1>
        <section>
          <h2>この端末に残るもの</h2>
          <p>あとで見るへ保存したフィードURIと、匿名の利用識別子をブラウザに保存します。</p>
        </section>
        <section>
          <h2>サービス側で集計するもの</h2>
          <p>
            訪問、候補表示、Blueskyへの移動、端末保存、別日の再訪だけを、識別子を一方向変換して日単位で記録します。検索語、カテゴリ、フィードURI、IPアドレスはD1へ保存しません。
          </p>
        </section>
        <section>
          <h2>フィード情報</h2>
          <p>
            選定済みの公開フィードについて、Blueskyの公開APIから名称、説明、いいね数、更新日時を取得します。ブラウザからBluesky
            APIへ直接問い合わせることはありません。
          </p>
        </section>
        <section>
          <h2>保持期間</h2>
          <p>集計イベントは35日後に自動削除します。広告Cookieや外部解析SDKは使いません。</p>
        </section>
      </article>
    </Layout>
  );
}

export function NotFoundPage() {
  return (
    <Layout noIndex path="/404" title="ページが見つかりません | Sky Dial">
      <article class="prose not-found">
        <span aria-hidden="true" class="not-found-dial">
          ?
        </span>
        <h1>ページが見つかりません</h1>
        <p>ダイヤルへ戻って、フィードを探してください。</p>
        <a class="return-link" href="/">
          Sky Dialへ戻る
        </a>
      </article>
    </Layout>
  );
}
