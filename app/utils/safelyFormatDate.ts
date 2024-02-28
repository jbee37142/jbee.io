export function safelyFormatDate(date: string | Date, type: 'short' | 'long' = 'short') {
  try {
    return new Intl.DateTimeFormat('ko-KR', { dateStyle: type }).format(new Date(date))

  } catch {
    return 'Unknown'
  }
}
