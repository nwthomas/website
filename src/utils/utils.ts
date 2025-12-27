export function getYearsCoding() {
  const currentDate = new Date();
  const codingStartDate = new Date("2018-01-01");
  const years = currentDate.getFullYear() - codingStartDate.getFullYear();

  return years;
}
