export const checkValidDeadline = (selectDate: Date, currentDate: Date) => {
  if (selectDate < currentDate) {
    return false;
  }

  return true;
};
