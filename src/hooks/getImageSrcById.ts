type ImageData = {
  id: number;
  src: string; // 画像のパス
  alt: string;
};

const images: ImageData[] = [
  { id: 1, src: "/images/profileIcon/buta.png", alt: "ぶた" },
  { id: 2, src: "/images/profileIcon/gorira.png", alt: "ゴリラ" },
  { id: 3, src: "/images/profileIcon/kitune.png", alt: "きつね" },
  { id: 4, src: "/images/profileIcon/panda.png", alt: "ぱんだ" },
  { id: 5, src: "/images/profileIcon/pengin.png", alt: "ペンギン" },
  { id: 6, src: "/images/profileIcon/rion.png", alt: "らいおん" },
];

/**
 * 指定された ID に対応する画像の src を取得します。
 * @param id - 画像の ID
 * @returns 画像の src（パス）
 */
export const getImageSrcById = (id: number): string | null => {
  const image = images.find((img) => img.id === id);
  return image ? image.src : null;
};

/**
 * 指定された src に対応する画像の ID を取得します。
 * @param src - 画像の src（パス）
 * @returns 画像の ID
 */
export const getImageIdBySrc = (src: string): number => {
  const image = images.find((img) => img.src === src);
  return image ? image.id : -1; // 見つからない場合のデフォルト ID
};
