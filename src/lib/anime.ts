import type { CollectionEntry } from "astro:content";

/** 作品スラッグ = `_series.md` の id から末尾の `/_series` を除いたもの */
export const seriesSlug = (id: string) => id.replace(/\/_series$/, "");

/** エピソード / キャラクターの id は `<作品スラッグ>/(episodes|characters)/<ファイル名>` */
export const ownerSlug = (id: string) => id.split("/")[0];

/** id の末尾のファイル名部分。URL の最下層セグメントに使う。 */
export const leafSlug = (id: string) => id.split("/").at(-1) as string;

/** 作品一覧のセクション順。国内・海外のどちらにも属さない値が来ても末尾に落ちる。 */
export const REGION_ORDER = ["海外", "国内"] as const;

type Series = CollectionEntry<"animeSeries">;
type Episode = CollectionEntry<"animeEpisodes">;

/** 放送年の表示（例: "2012 - 2016", "2012 -"）。開始年がなければ空文字。 */
export function formatYears(data: Series["data"]): string {
  const { yearStart, yearEnd } = data;
  if (!yearStart) {
    return "";
  }
  if (yearEnd === yearStart) {
    return `${yearStart}`;
  }
  return `${yearStart} - ${yearEnd ?? ""}`;
}

/**
 * エピソードをシーズンごとにまとめる。
 * シーズンは番号順、シーズン内は話数順。
 */
export function groupBySeason(episodes: Episode[]) {
  const bySeason = new Map<number, Episode[]>();
  for (const ep of episodes) {
    const s = ep.data.season;
    if (!bySeason.has(s)) {
      bySeason.set(s, []);
    }
    bySeason.get(s)?.push(ep);
  }
  return [...bySeason.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([season, items]) => ({
      season,
      title: items.find((i) => i.data.seasonTitle)?.data.seasonTitle,
      items: items.sort((a, b) => a.data.episode - b.data.episode),
    }));
}
