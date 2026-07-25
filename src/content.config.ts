import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog/", pattern: "*.md" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const tech = defineCollection({
	// Load Markdown and MDX files in the `src/content/tech/` directory.
	loader: glob({ base: "./src/content/tech/", pattern: "*.md" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		// ジャンル（例: "プログラミング", "3DCG", "自作キーボード"）。カードのタグに表示。
		genre: z.string().optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

// 参考書ごとの解説記事。`src/content/math/<参考書スラッグ>/<記事>.md` に置く。
// `_` で始まるファイル（参考書メタの `_book.md`）は記事から除外する。
const math = defineCollection({
	loader: glob({ base: "./src/content/math/", pattern: ["**/*.md", "!**/_book.md"] }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		// 章番号（1章, 2章, ...）。同じ章番号の記事がひとまとまりで表示される。
		chapter: z.number().default(1),
		// 章タイトル（例: "ベクトル空間"）。同じ章の記事は同じ値にする。見出しに使用。
		chapterTitle: z.string().optional(),
		// 章の中での並び順。小さいほど先（表示には使わない）。
		section: z.number().default(1),
		// カードに表示する節ラベル（例: "§3"）。節番号のない本では省略するとタグ非表示。
		sectionLabel: z.string().optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

// 参考書そのもののメタ情報。各参考書ディレクトリの `_book.md` を読み込む。
const mathBooks = defineCollection({
	loader: glob({ base: "./src/content/math/", pattern: "**/_book.md" }),
	schema: z.object({
		title: z.string(),
		author: z.string().optional(),
		publisher: z.string().optional(),
		// シリーズ名（例: "松坂和夫 数学入門シリーズ 2"）
		series: z.string().optional(),
		// ISBN（ISBN-13 を推奨）
		isbn: z.string().optional(),
		description: z.string().optional(),
		// 分野（例: "線形代数", "解析学", "確率・統計"）。未指定は「その他」に分類。
		field: z.string().default("その他"),
		// /public 以下の表紙画像パス（例: "/covers/linear-algebra.jpg"）
		coverImage: z.string().optional(),
		// 参考書一覧での並び順。小さいほど先。
		order: z.number().default(0),
	}),
});

// 海外アニメ作品そのもののメタ情報。各作品ディレクトリの `_series.md` を読み込む。
// 作品は `src/content/anime/<作品スラッグ>/` 以下にまとめる。
const animeSeries = defineCollection({
	loader: glob({ base: "./src/content/anime/", pattern: "**/_series.md" }),
	schema: z.object({
		// 日本語表記のタイトル。公式の邦題がない作品は通称でよい。
		title: z.string(),
		// 原題（例: "Gravity Falls"）
		originalTitle: z.string().optional(),
		// 大分類。作品一覧はまずこの単位でセクションに分かれる。
		region: z.enum(["海外", "国内"]).default("海外"),
		// 製作国（例: "アメリカ", "イギリス", "日本"）。region 内での小見出しに使用。
		country: z.string().optional(),
		// 制作スタジオ・放送局（例: "Disney Television Animation"）
		studio: z.string().optional(),
		// 原作者・シリーズ創案者
		creator: z.string().optional(),
		// 放送開始年 / 終了年。終了年は放送中なら省略。
		yearStart: z.number().optional(),
		yearEnd: z.number().optional(),
		status: z.enum(["放送中", "完結", "制作中"]).default("完結"),
		// ジャンルタグ（例: ["ミステリー", "コメディ"]）
		genres: z.array(z.string()).default([]),
		description: z.string(),
		// /public 以下のポスター画像パス（例: "/anime-posters/gravity-falls.jpg"）
		posterImage: z.string().optional(),
		// 作品一覧での並び順。小さいほど先。
		order: z.number().default(0),
	}),
});

// エピソードごとのレビュー。`src/content/anime/<作品スラッグ>/episodes/*.md` に置く。
const animeEpisodes = defineCollection({
	loader: glob({ base: "./src/content/anime/", pattern: "**/episodes/*.md" }),
	schema: z.object({
		// 日本語のエピソードタイトル。公式邦題が確認できない場合は訳題でよい。
		title: z.string(),
		originalTitle: z.string().optional(),
		description: z.string(),
		// シーズン番号。同じ番号のエピソードがひとまとまりで表示される。
		season: z.number().default(1),
		// シーズン名（例: "Book 1: 水"）。同じシーズンの記事は同じ値にする。
		seasonTitle: z.string().optional(),
		// シーズン内の話数。一覧はこの順に並ぶ。
		episode: z.number(),
		// 現地での初放送日
		airDate: z.coerce.date().optional(),
		// レビューを書いた日
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

// 劇場版のレビュー。`src/content/anime/<作品スラッグ>/movies/*.md` に置く。
// テレビシリーズ由来の映画はここに入れ、原作を持たない映画は扱わない。
const animeMovies = defineCollection({
	loader: glob({ base: "./src/content/anime/", pattern: "**/movies/*.md" }),
	schema: z.object({
		title: z.string(),
		originalTitle: z.string().optional(),
		description: z.string(),
		// 本国での公開年。一覧は order → この年の順に並ぶ。
		releaseYear: z.number(),
		// 本国での公開日（判明している場合）
		releaseDate: z.coerce.date().optional(),
		// 上映時間（分）
		runtime: z.number().optional(),
		director: z.string().optional(),
		// レビューを書いた日
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// 一覧での並び順。小さいほど先。
		order: z.number().default(0),
	}),
});

// 登場キャラクターの紹介。`src/content/anime/<作品スラッグ>/characters/*.md` に置く。
const animeCharacters = defineCollection({
	loader: glob({ base: "./src/content/anime/", pattern: "**/characters/*.md" }),
	schema: z.object({
		name: z.string(),
		originalName: z.string().optional(),
		// 立ち位置（例: "主人公", "レギュラー", "敵役"）。カードのタグに表示。
		role: z.string().optional(),
		// 原語版の声優
		voiceActor: z.string().optional(),
		// 日本語吹替の声優
		voiceActorJa: z.string().optional(),
		description: z.string(),
		// /public 以下のキャラクター画像パス
		image: z.string().optional(),
		// 一覧での並び順。小さいほど先。
		order: z.number().default(0),
	}),
});

export const collections = {
	blog,
	tech,
	math,
	mathBooks,
	animeSeries,
	animeEpisodes,
	animeMovies,
	animeCharacters,
};
