---
layout: ../../layouts/Post.astro
title: faviconを考える
description:
publishDate: 2022/06/12
image: { src: thumbnail/, alt: faviconを考える }
category: cording
tags: ['favicon', 'html']
draft: false
---

こんにちは、ゆりかです。

ファビコンって名前・サイズ感・シンプルなデザインでかわいいですよね 🥺

小さいながらも個性が出る Web サイトの大事な一部であり、Twitter などでは通知を表示する機能がついていたりと、その存在感は大きいファビコンさん。

そんな重要なファビコンを私は今までなんとなくで設定しており、とりあえずいろんなサイズいれときゃいいんでしょ～～とズラァっと記述していたタイプでした。

そんなぞんざいに扱っていいわけがないので、改めてファビコンを理解するべくしたインプットの記録です。

## ファビコン設定の基本

まずは基本のファビコン設定です。

```html
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon.png" sizes="180x180" />
```

外部ソースと関連付けができる link 要素を使い、ファビコンを設定します。

- rel 属性
  `icon`を指定することによって、リンク先がアイコンであることを示します。
  ただし iOS では`icon`種別を使えないので、別途標準外である`apple-touch-icon`を使用する必要があります。
  ググっていると`shortcut`を使用している場合がありますが、これは現在では非推奨となっています。
  IE8 以下に対応する必要がある場合のみ`shortcut icon`と記述可能です。
  `icon shortcut`の逆順での記述や他キーワードと合わせての記述は出来ないので注意が必要です。
- type 属性
  リンク先の MIME タイプを記述します。
  ファビコンでは`image/png`、`image/svg+xml`を使うことが多いです。
  もし IE9/IE10 にも対応が必要な場合は`image/vnd.microsoft.icon`や`image/x-icon`を使用します。
  ちなみに MIME タイプとは外部ファイルを組み込む際にファイルの種類を判別させるためのもの。
  ブラウザは拡張子ではなく MIME タイプでファイルの種類を見ているので、正しく設定していないとバグの原因となる可能性があります。
  [MIME タイプ (IANA メディアタイプ) - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- href 属性
  ファイル先を指定します。
  ファビコンは必ずルートディレクトリ直下に置いておくこと。
  理由は以下の引用の通りです。
  > RSS リーダーなど一部のツールはサーバーの`/favicon.ico`にしかリクエストを送信せず、それ以外の場所をわざわざ探そうとしません。
  > [https://techracho.bpsinc.jp/hachi8833/2021_06_24/108697](https://techracho.bpsinc.jp/hachi8833/2021_06_24/108697)
  > なにかにつけてまとめておきたいタイプの私はムズムズしてきちゃいます…がまん… 😇
- sizes 属性
  rel 属性が`icon`または`apple-touch-icon`の場合のみ指定できます。
  `any`を指定した場合は、type 属性がどのようなサイズにも調整可能な`image/svg+xml`である必要があります。
  解説によっては複数のサイズのアイコンを用意し設定している場合がありますが、1 つ用意しておけば充分です。
  複数読み込んでいても適切なサイズを読み取ってくれるのは Safari のみで、多くの環境下では最初または最後のもののみが適応されるためです。
  以下は[https://techracho.bpsinc.jp/hachi8833/2021_06_24/108697](https://techracho.bpsinc.jp/hachi8833/2021_06_24/108697)で定義されていた、ファビコンのベストサイズをまとめたものになります。
  | favicon.ico | 32x32 |
  | --------------------------------------------------------- | --------------------- |
  | apple-touch-icon.png | 180x180 |
  | (padding と背景をつけておくべき) |
  | Android 用 | 192x192(ホーム画面用) |
  | 512x512(ホーム画面から起動した際のロード中に表示するもの) |

### 拡張子はどれにすべきか

**.ico**

すべてのブラウザで使用可能です。

アイコン専用の拡張子であり、複数のサイズを保持できます。

**.png**

現在すべてのブラウザで対応されています 🙌

ただし IE10 以下に対応する場合は、`.ico`を使用します。

じゃあ`.ico`だけでオッケーなんじゃない？と思いきや、Safari でホーム画面にお気に入りした場合は`apple-touch-icon.png`しか読み込まないという壁があるので、`.png`のファイルは必要です。

なんなら 2022 年 6 月で IE が終焉を迎えるので、それ以降は`.png`のみでよさそうですね 🥺

[PNG favicons | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/link-icon-png)

**.svg**

サイズやカラー変更を手軽にできてダークモード対応に優れているなど、いろいろとメリットのある`.svg`ですが、IE と Safari は未対応なのでまだファビコン拡張子のレギュラー争いには遅れをとっています。IE は置いておいて、Safari 未対応が痛い…

[SVG favicons | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/link-icon-svg)

**.gif**

動きのあるファビコンにする時などに使います。

ただし対応ブラウザは Firefox のみとなっており、その他のブラウザでは表示はされますがアニメーションはないので注意が必要です。

ちなみに`.png`の画像を JavaScript のイベントでアニメーションさせるこちらの記事、発想の天才…ってなりました 😇

ふわ～とハートがでてくるのかわいい…

[favicon をアニメーションさせてみる | ジャーナル | トライベック](https://www.tribeck.jp/column/opinion/production/20200525/)

### ファビコンのキャッシュ防止

ファビコンの更新時にはファイル名に`?v=2`を追加することで、ブラウザに新しいバージョンをダウンロードさせることができます。

```html
<link rel="icon" href="/favicon.ic?v=2" />
```

## SVG ファイルをいじる

SVG ファイルを開くと見慣れないタグや数字がズラァと並んでいて、そっと閉じてしまいませんか 😇

けどずっとは逃げれないので、ファビコンをきっかけに SVG の基本を少し勉強してみました。

[HTML SVG の基本的な使い方（SVG 入門）](https://www.webdesignleaves.com/pr/html/svg_basic.html)

[SVG を使うときに知っておくといいことをまとめました - Qiita](https://qiita.com/manabuyasuda/items/01a76204f97cd73ffc4e)

案外いけそう…！

食わず嫌いよくないってことで、今回のファビコンの設定に戻ります。

### ダークモード対応

ダークトーンのファビコンだと、ダークモード設定を適用している環境下では見えづらい問題があるので、SVG ファイルに CSS を記述して対応していきます。

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
	<style>
		path {
			fill: #000;
		}
		@media (prefers-color-scheme: dark) {
			path {
				fill:#fff;
			}
		}
	</style>
	<path d="..."/>
</svg>
```

- svg タグ
  - xmlns
    名前空間を指定します。
  - viewBox
    図形の描画座標を指定します。
    `viewBox="min-x, min-y, width, height”`となっており、単位は不要です。
- @media (prefers-color-scheme: dark)
  ダークモード時という意味のメディアクエリで、この中にダークモード時に適用させるカラーを記述します。
  - fill
    要素の塗りつぶすことができます。
  - stroke
    今回は使用していませんが、このプロパティを使うと線の色を変更できます。
- path タグ
  複雑な図形を描画する際に使用します。

### SVG ファイルの最適化

ついでに SVG ファイルの最適化もしておきます。

Gulp などで自動化する方法もあるようですが、今回は SVGOMG というツールを使用しました。

[SVGOMG](https://jakearchibald.github.io/svgomg/)

## manifest.json を作成する

manifest.json は MDN では以下のように解説されています。

> ウェブアプリマニフェストは、プログレッシブウェブアプリ(PWA) と呼ばれる一連のウェブ技術の一部であり、アプリストアを通さずに端末のホーム画面にインストールすることができるものです。

[https://developer.mozilla.org/ja/docs/Web/Manifest](https://developer.mozilla.org/ja/docs/Web/Manifest)

つまり「ホーム画面に追加」をする際の設定を定義できるファイル、ということになります。

### 今回の設定内容

こちらのサイトの「ブログ / ホームページ向けのマニフェスト」を参考にさせていただき、manifest.json を作成しました。

[ウェブアプリマニフェスト（manifest.json）の設定項目まとめ - WEBZINNE](https://www.webzinne.com/topics/qtaymy/)

```html
<link rel="manifest" href="/manifest.json" />
```

```json
{
  "name": "hoge WebApp",
  "short_name": "hoge",
  "icons": [
    {
      "src": "icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "background_color": "#fff",
  "theme_color": "#000",
  "description": "hogeのwebサイトです。"
}
```

- name/short_name
  ホーム画面に追加する際に表示される名前です。
  `short_name`はホーム画面に追加後、`name`が長く表示スペースがない場合に表示されるものです。
- icons
  ホーム画面に表示させるアイコンを設定します。
  192px がホーム画面用、512px はスプラッシュ画面（ホーム画面から起動した際のロード中に表示される画面）で使用されます。
- start_url
  アイコンをタップして起動させた際に表示される URL を記述します。
  今回は相対パス`”.”`を指定し、`manifest.json`と同階層にある`index.html`を表示させました。
- background_color
  起動させてから CSS が読み込まれるまでに表示される背景色を指定します。
  Web サイトの`background-color`と一致させることが推奨されています。
- theme_color
  ツールバーの色を設定します。
- description
  サイトの説明文を設定します。
- scope
  今回は設定していませんが、`sope`キーはナビゲーションを制限してスコープを定義するものです。
  もしもスコープ外へ移動した際には通常の Web ページに戻ります。
  デフォルトスコープ値は`manifest.json`のあるディレクトリなので、今回のように`scope`を指定しない場合は`manifest.json`があるディレクトリがスコープになっています。
  つまり自サイト以外へ移動した場合に、スコープから外れるということになります。
- display
  こちらも今回は設定していませんが、どのように表示させるかを指定するものです。
  - fullscreen
    ブラウザ UI を隠し、画面いっぱいに表示させる
  - standalone
    スタンドアロンアプリのように表示させる
  - minimal-ui
    standalone にナビゲーションを制御するための最低限の UI を表示させる
  - browser
    ブラウザと同様に表示させる
    web.dev に掲載されているの display イメージが分かりやすかったので、もしもイメージが湧かない方は参考に見てみてください。
    [Add a web app manifest](https://web.dev/add-manifest/#display)

## 結論と課題

以上を踏まえて、ファビコン設定は以下のようになりました。

2022 年 6 月以降は

```markup
	├─ index.html
	├─ favicon.ico
	├─ apple-touch-icon.png
	├─ icon-192.png
	├─ icon-512.png
	├─ manifest.json
	...

```

```html
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon.png" sizes="180x180" />
<link rel="manifest" href="/manifest.json" />
```

```json
{
  "name": "hoge WebApp",
  "short_name": "hoge",
  "icons": [
    {
      "src": "icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "background_color": "#fff",
  "theme_color": "#000",
  "description": "hogeのwebサイトです。"
}
```

なんと…！4 行…！

とてもミニマルで感動です 🥺

## おわりに

rel 属性に shortcut を指定することに、どこも辛口でにやけました 🤣

> 世の中には、未だに「HTML に favicon.ico を含めるときは以下のようにしましょう」という化石のような知識を教えるチュートリアルが山ほどあります。

[https://techracho.bpsinc.jp/hachi8833/2021_06_24/108697](https://techracho.bpsinc.jp/hachi8833/2021_06_24/108697)

> icon より以前はリンク種別  shortcut がよく使用されていましたが、これは非準拠で無視されますのでウェブ作者は今後使用してはいけません。

[https://developer.mozilla.org/ja/docs/Web/HTML/Link_types](https://developer.mozilla.org/ja/docs/Web/HTML/Link_types)

ちなみに画像作成からコード生成までしてくれるジェネレーターもあったりするので、こちらを活用するのもいいかもですね 👏

[Favicon Generator for perfect icons on all browsers](https://realfavicongenerator.net/)

☁️ ぼんっ

### 参考サイト
