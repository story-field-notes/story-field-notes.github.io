# 物語採集記

ゲーム・漫画・映画・アニメから物語を探究し、その素晴らしさを紹介するサイト。

https://story-field-notes.github.io/

## 扱うもの

- 作品紹介
- 登場キャラクター紹介
- シーズンごとのエピソードレビュー

## 環境

- Astro.js
- GitHub Pages（`main` への push で [deploy.yml](.github/workflows/deploy.yml) が自動デプロイ）

Organization の user site として公開しているためルート `/` 配信であり、
`astro.config.mjs` に `base` は指定していない。

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
