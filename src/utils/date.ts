/**
 * 日時のフォーマット
 * @param date フォーマット対象のデータ
 * @param options 日時表示の書式設定
 * @param locale 表示言語
 * @returns
 */
export function getFormattedDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {},
  locale: Intl.LocalesArgument = 'ja-JP'
) {
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  };
  return new Date(date).toLocaleDateString(locale, formatOptions);
}
