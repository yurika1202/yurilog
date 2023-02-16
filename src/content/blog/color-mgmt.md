---
layout: ../../layouts/Post.astro
title: 【DartSass】カラー管理とフォント周りを考える
description:
publishDate: 2022/04/09
image: {
  src: thumbnail/,
  alt: カラー管理とフォント周りを考える
}
category: coding
tags: ['sass', 'カラー管理']
draft: false
---

こんにちは、ゆりかです。  
少し前に LibSass が非推奨になる！と Twitter がザワザワしていましたよね。  
その時に DartSass には乗り換えていた勢なんですが、なんだか Sass をうまく使いこなせてないなぁとモヤっていたので、改めて勉強し直しております。  
ひとまずカラーとフォント周りを分かりやすく効率的に管理し、コーディングスピードを 1 秒でも早くするべく試行錯誤したのでその記録です。

## ビルトインモジュールという存在

今回久しぶりに Sass についていろいろとググっていると、なんだか初見な**ビルトインモジュール**さん…  
さらに調べると、なんと DartSass ではスラッシュを使った除算（割り算）は非推奨！  
これまで何の疑問も持たずにスラッシュ多用してました…  
代わりにビルトインモジュールを使用するのですが、実際の例がこちら。

```sass
@use "sass:math"; // ビルトインモジュール
.contents {
	width: math.div(100px, 5);
}

// コンパイル後
.contents {
	width: 20px;
}
```

簡単にいうと`@use`でモジュールを読み込んで、CSS の関数との競合をなくしてこーぜ！って感じです。

詳しい解説は「ウェブマガジン カミナリ」様の記事が分かりやすかったのでリンクを置いておきます。

[Sass における除算で / は非推奨となり、将来的には廃止されます。 | ウェブマガジン カミナリ | 鳥取県米子市のホームページ制作・広告代理店・デザイン](https://kaminarimagazine.com/web/2021/07/09/divide-by-slash-is-deprecated-and-will-be-removed/)

[公式ドキュメント](https://sass-lang.com/documentation)の「Built-In Modules」コンテンツを覗くと、計算以外にもカラーなどいろいろ種類があってへぇ～～が止まらないです。

[](https://sass-lang.com/documentation/modules)

特にカラーなんて使いどころありまくりそうですね。

ということで、この便利システムを使いつつ効率化を図っていきます！

![457DA444-C774-4372-A766-D162CE076B16.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/29d7fc3c-45ff-4904-b413-67a82a28f55b/457DA444-C774-4372-A766-D162CE076B16.jpeg)

## 関数を使ってカラー管理

カラー管理をしようと思ったきっかけは[安田学さんの Qiita 記事](https://qiita.com/manabuyasuda/items/ae42db5604cd723fb3cd)。

[Sass で色を管理する色々な方法 - Qiita](https://qiita.com/manabuyasuda/items/ae42db5604cd723fb3cd)

たまたま目にして、もうウロコがでてくるのを抑えきれず！！！

すぐさまカラー管理に取り組みました 🍃

### これまでの管理方法

わりとこのタイプの人多いんじゃないかなぁと思うのですが、私はこれまで変数でカラーコードをベターっと記述していました。

```sass
// text color
$color-text-default: #2B2B2B;
$color-text-gray: #707070;

// title color
$color-title: #333;

// background color
$color-body: #fff;
$color-background-gray: #EDEDED;
```

大規模なサイト制作をしているわけでもなく、チーム制作ではなかったので、なんとかこれで問題も起きずに済んでいたって感じです。

カラフルなサイトだったりしたら、ごっちゃになってしまうのがモヤモヤポイントでした。（私の記述法がよくないだけかも）

### さっそくカラー管理にトライ！

と、その前に私の Sass ファイル構成をさらっとご紹介。

ちなみに PRECSS が好きなので、接頭辞が`bl`だったり`el`だったりします。

```markup
└─ sass
　　　├─ foundation // 基礎ファイル
　　　│　├─_base.scss
　　　│　├─_reset.scss
　　　│　└─_index.scss
　　　├─ functions // 関数管理
　　　│　├─_color.scss
　　　│　├─_font.scss
　　　│　├─ ...
　　　│　└─_index.scss
　　　├─ mixins // mixin管理
　　　│　├─_responsive.scss
　　　│　├─_hover.scss
　　　│　├─ ...
　　　│　└─_index.scss
　　　├─ variables // 変数管理
　　　│　├─_breakpoints.scss
　　　│　├─_colors.scss
　　　│　├─_others.scss
　　　│　├─ ...
　　　│　└─_index.scss
　　　├─ layout // レイアウトに関するファイル
　　　│　├─_header.scss
　　　│　├─_main.scss
　　　│　├─_footer.scss
　　　│　├─ ...
　　　│　└─_index.scss
　　　├─ object // モジュールに関するファイル
　　　│　├─ component
　　　│  │　├─ _bl.scss
　　　│  │　├─ _el.scss
　　　│  │　└─ _index.scss
　　　│　├─ javascript
　　　│  │　├─ _js.scss
　　　│  │　├─ ...
　　　│  │　└─ _index.scss
　　　│　├─ page
　　　│  │　├─ _top.scss
　　　│  │　├─ ...
　　　│  │　└─ _index.scss
　　　│　└─ utility
　　　│   　├─ _hp.scss
　　　│   　├─ ...
　　　│   　└─ _index.scss
　　　└─ style.scss
```

mixin と変数を global ファイルでまとめようかとも思ってるんですが、少し迷い中です。

まとめたら記述は少し楽になるかもだけど、そしたら DartSass の名前空間がつけれる意味ってなんだろう思うんですが、う～ん…

ここはもう少し勉強が必要そうです。

**マップ変数を作成**

```sass
// variables/_colors.scss

// palettes
// --------------------------------------------------------------------------
$black: #333;
$mildBlack: #2B2B2B;
$white: #fff;
$gray: #707070;
$lightGray: #EDEDED;
$silverGray: #A0A0A0;

//color map
// --------------------------------------------------------------------------
$colors: (
    color-body-background: $white,
    color-block-background: $lightGray,
    color-global-text: $mildBlack,
    color-global-icon: $gray,
    color-headingLv2-text: $black,
    color-headingLv2-border: $silverGray,
    color-info-border: $silverGray,
    color-contact-btn: $silverGray,
    color-contact-border: $silverGray,
);
```

パレットとして使用カラーを変数でまとめ、マップを作成しました。

直接マップにカラーコードを記述しない理由としては、一目で紐づいている色を分かりやすくするためです。

この考えはこちらの記事を参考にさせていただきました。

[変更に強い Sass の色管理プラクティス - Qiita](https://qiita.com/1natsu172/items/ef6b0fcba6bbe380df1e)

色の名前はすっごく悩んだんですが、上記の記事でも紹介されている「[Name that Colo**r**](https://chir.ag/projects/name-that-color/)」というサイトを参考にしつつ考えています。

**関数を作成**

```sass
// functions/_color.scss

@use "sass:map";
@use "../variables" as *;

@function colors($key) {
    @return map.get($colors, $key);
}
```

先ほど作成したマップを簡単に使用できるよう関数を作成しました。

ここで活躍してくれるのがビルトインモジュール！

`@use "sass:map";`を記述し、map モジュールを読み込みます。

そして`map.get`関数（指定したキーの値を返してくれる関数）を使用して、カラー管理の`@function`を作成します。

最近`map-get`から`map.get`へメソッド名が変更されたようなので、注意が必要です！

**関数を使用する**

```sass
// foundation/_base.scss

@use "../functions/" as *;
@use "../variables/" as var;

body {
	background: colors(color-body-background);
  color: colors(color-global-text);
}
```

関数ファイルを読み込んで、実際に作成した関数を使用します。

function ファイルの名前空間を\*にして、関数使用時に宣言なしに使用できるようにしましたが、あんまりよくないことかも…

名前空間にアスタリスクを使用することによるデメリットも、もう少し理解を深めて記述を再試行していこうと思います。

とりあえず現段階ではこれで！

コンパイル後はこんな感じになります。

```css
body {
  background: #fff;
  color: #2b2b2b;
}
```

うまくいきました～ 👏

### @each を使用しなかった理由

[安田学さんの記事](https://qiita.com/manabuyasuda/items/ae42db5604cd723fb3cd)では`@each`を使用して、処理を自動化する方法も紹介されています。

[Sass で色を管理する色々な方法 - Qiita](https://qiita.com/manabuyasuda/items/ae42db5604cd723fb3cd)

でも今回のカラー管理においては、それを使用しませんでした。

理由は Bootstrap みたいな感じになって、個人的にしっくりこないなあと思ったから。（アンチ Bootstrap ではないですよ！）

例えば安田学さんの記事で例であげられている SNS カラーの場合は、`＠each`で自動化するのがとても便利そうですが、全カラーを自動化すると`!important`が必要な状況になってしまったりしないかなあと思っています。

ただこれは私の勉強不足故に使いこなせないだけの可能性が高いので、ここも同様に勉強を続けます。

## 関数を使ってフォントを管理

フォントに関しては、`font-family`と`font-size`の関数を作成しました。

`font-family`に関しては上記のカラー管理とほぼ一緒なので、さらっといきます。

### font-family の管理

```sass
// variables/_others.scss

$myriad: myriad-pro, sans-serif;
$poppins: poppins, sans-serif;
$basic: YuGothic,'Yu Gothic','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3',sans-serif;

$font: (
    font-global: $myriad,
    font-heading: $poppins,
    font-lead: $basic,
)
```

```sass
// functions/_font.scss

@use "sass:map";
@use "../variables" as *;

@function font-family($key) {
  @return map.get($font, $key);
}
```

```sass
// foundation/_base.scss

@use "../functions/" as *;
@use "../variables/" as var;

body {
	font-family: font-family(font-global);
}
```

```css
body {
  font-family: myriad-pro, sans-serif;
}
```

カラー管理の方法と変わりないですね。

ちなみに web フォントを直接読み込んでいるので`@fontface`は使用していません。

### フォントサイズの単位を rem に統一させる

[TAK さんの記事](https://zenn.dev/tak_dcxi/articles/2cc1828e9c1fe2)を参考に、`px`から`rem`へ変更させる関数を作っていきます。

[よく使う Sass の mixin と function のスニペットをまとめてみた](https://zenn.dev/tak_dcxi/articles/2cc1828e9c1fe2)

**関数を作成**

```sass
// functions/strip-unit.scss

@use "sass:math";

@function strip-unit($number) {
    @if type-of($number) == 'number' and not unitless($number) {
        @return math.div($number, ($number * 0 + 1));
    }

    @return $number;
}
```

```sass
// functions/_font.scss
@use "sass:math";
@use "./strip-unit" as *;

@function rem($px, $base: 16px) {
  $value: $px;

  // 単位がpx以外の場合は警告を出してそのまま返す
  @if (unit($px) != 'px') {
    @warn 'rem()の引数にpx以外の値を指定しても計算できません';
    @return $value;
  }

  $value: math.div(strip-unit($px), strip-unit($base)) * 1rem;

  @return $value;
}
```

ここでもビルトインモジュールの登場！

`@use "sass:math";`を記述して、math モジュールを読み込みます。

今回の関数では除算（割り算）をしたいので、`math.div`関数を使用していきます。

まずは`px`などの単位を取り除く strip-unit 関数を記述します。

詳しいコード解説はこちらの記事が分かりやすかったので、リンクを置いておきます。

[Sass で数値から単位を除去する](https://cly7796.net/blog/css/remove-units-from-numbers-with-sass/)

そして strip-unit 関数ファイルを読み込ませた先で、`px`から`rem`に変更する関数を記述します。

ほぼ TAK さんの記事にあるコードそのままです。ありがとうございます 🙇‍♀️

**関数を使用する**

```sass
// foundation/_base.scss

body {
	font-size: rem(16px);
}
```

```css
body {
	font-size: 1rem
```

関数使用時とコンパイル後はこんな感じ。

この他にも、変数を引数として渡すことも可能です。

```sass
// variables/_size.scss

$lv1FontSize: 120px;

// foundation/_base.scss

@use "../functions/" as *;
@use "../variables/" as var;

body {
	font-size: rem(var.$lv1FontSize);
}
```

```css
body {
  font-size: 7.5rem;
}
```

便利すぎて泣く！！！

## さいごに

こんな感じで粗削りではありますが、カラーとフォントを管理することが出来たかなと思います。

改めて Sass の表面部分しか理解できてなかったなぁと反省です。

今回もっと理解を深めたいと思った点は、

- その他のビルトインモジュールの活用法
- 名前空間を使うことの意味
- @each を使っての管理方法の模索

です。

知れば知るほど便利な Sass を、これからも勉強していきたいと思います。

それでは、どろんっ ☁️
