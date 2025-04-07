const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getMonthName = (date: Date) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  return monthNames[month];
};
