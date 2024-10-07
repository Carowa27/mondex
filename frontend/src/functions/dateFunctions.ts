export const getToday = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const today = `${year}-${month}-${date}`;
  return today;
};
