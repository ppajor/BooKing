export const getUniqueID = () => {
  return Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
};

export const convertToSeconds = (hours, minutes, seconds) => {
  const minutesToSec = minutes * 60;
  const hoursToSec = hours * 60 * 60;
  console.log("minute, hours", minutesToSec, hoursToSec);
  return hoursToSec + minutesToSec + seconds;
};
