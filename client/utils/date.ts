const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function convertDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  return [date.getDay(), date.getMonth()];
}
