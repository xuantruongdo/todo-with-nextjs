export const checkValidDeadline = (selectedDate: Date, currentDate: Date) => {
  if (selectedDate < currentDate && selectedDate.getDay() !== currentDate.getDay()) {
    return false;
  }

  return true;
};
