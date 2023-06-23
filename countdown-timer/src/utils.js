// values in miliseconds
const oneHour = 60 * 60 * 1000;
const oneMinute = 60 * 1000;

export const convertTimeToMs = (timer) => {
  let { hours, minutes, seconds } = timer;
  hours = Number(hours);
  minutes = Number(minutes);
  seconds = Number(seconds);

  return hours * oneHour + minutes * oneMinute + seconds * 1000;
};

export const getRemainingTime = (time) => {
  const hours = Math.floor(time / oneHour);
  const minutes = Math.floor((time % oneHour) / oneMinute);
  const seconds = Math.floor((time % oneMinute) / 1000);

  return { hours, minutes, seconds };
};

export const formatTime = (time) => (time < 10 ? `0${time}` : time);
