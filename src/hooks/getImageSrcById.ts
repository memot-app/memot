type ImageData = {
  id: number;
  src: any; // ローカル画像用に型を any に変更
  alt: string;
};

const images: ImageData[] = [
  { id: 1, src: require('../assets/images/profileIcon/buta.png'), alt: 'ぶた' },
  { id: 2, src: require('../assets/images/profileIcon/gorira.png'), alt: 'ゴリラ' },
  { id: 3, src: require('../assets/images/profileIcon/kitune.png'), alt: 'きつね' },
  { id: 4, src: require('../assets/images/profileIcon/panda.png'), alt: 'ぱんだ' },
  { id: 5, src: require('../assets/images/profileIcon/pengin.png'), alt: 'ペンギン' },
  { id: 6, src: require('../assets/images/profileIcon/rion.png'), alt: 'らいおん' },
];

/**
 * 指定された ID に対応する画像の src を取得します。
 * @param id - 画像の ID
 * @returns 画像の src（require 形式）
 */
export const getImageSrcById = (id: number): any => {
  const image = images.find((img) => img.id === id);
  return image?.src || null;  
};

/**
 * 指定された src に対応する画像の ID を取得します。
 * @param src - 画像の src（require 形式）
 * @returns 画像の ID
 */
export const getImageIdBySrc = (src: any): number => {
  const image = images.find((img) => img.src === src);
  return image ? image.id : -1; // 見つからない場合のデフォルト ID
};