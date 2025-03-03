// utils/timeUtils.ts

export function getRelativeTimeString(dateString: string): string {
  const now = new Date();
  const targetDate = new Date(dateString);

  // ミリ秒 → 秒
  const diffSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffSeconds < 60) {
    return `${diffSeconds}秒前`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}時間前`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}日前`;
  }

  // 週を超える場合など、好みに応じて追加実装してもOK
  // 例えば1週間以上経ったら日付形式にするなど。
  return `${diffDays}日前`;
}