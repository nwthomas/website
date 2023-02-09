export function getBlogPostFullDate(rawDate: string): string {
  if (!rawDate) {
    return "";
  }

  const yearMonthDayArray = rawDate
    .split("-")
    .map((str: string) => parseInt(str, 10))
    .filter((num: number) => !isNaN(num));

  if (yearMonthDayArray.length !== 3) {
    return "";
  }

  const [year, month, day] = yearMonthDayArray;
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString("default", { month: "long" });

  return `${monthName} ${day}, ${year}`;
}

export function buildDateUpdatedLabel(date: string): string {
  return `Last edited: ${date}`;
}

export function buildDateWrittenLabel(date: string): string {
  return `Written: ${date}`;
}
