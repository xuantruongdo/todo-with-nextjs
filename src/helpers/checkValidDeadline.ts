export const checkValidDeadline = (selectDate: Date, currentDate: Date) => {
  if (selectDate < currentDate && selectDate.getDay() !== currentDate.getDay()) {
    return false;
  }

  return true;
};
