# Ishikawaのホームページ

とりあえずGitHub Pagesで公開する。

https://ishikawa-masashi.github.io/

## 予定

- ホームページ
- ブログ
- プロジェクト紹介

## 環境

- Astro.js

## アニメ紹介の追加方法

作品ごとに `src/content/anime/<作品スラッグ>/` を作り、以下を置く。

```
src/content/anime/gravity-falls/
├── _series.md            # 作品メタ + 作品紹介本文（必須）
├── characters/*.md       # キャラクター紹介（1 人 1 ファイル）
└── episodes/*.md         # エピソードレビュー（1 話 1 ファイル）
```

生成される URL は以下のとおり。

| ページ | URL |
| --- | --- |
| 作品一覧（海外 / 国内でセクション分け） | `/anime/` |
| 作品紹介 + キャラ一覧 + シーズン別エピソード一覧 | `/anime/<作品>/` |
| キャラクター一覧 | `/anime/<作品>/characters/` |
| キャラクター詳細 | `/anime/<作品>/characters/<名前>/` |
| エピソードレビュー | `/anime/<作品>/episodes/<ファイル名>/` |

- 海外 / 国内の振り分けは `_series.md` の `region`（`"海外"` または `"国内"`）で決まる。
- シーズンの区切りはエピソード側の `season`、話数順は `episode` で決まる。ディレクトリを分ける必要はない。
- 各フィールドの意味は [src/content.config.ts](src/content.config.ts) のコメントを参照。
