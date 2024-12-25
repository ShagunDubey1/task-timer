export const calculateTriggerTime = (startsIn: {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}) => {
  const now = new Date();

  const triggerTime = new Date(
    now.getTime() +
      startsIn.seconds * 1000 +
      startsIn.minutes * 60 * 1000 +
      startsIn.hours * 60 * 60 * 1000 +
      startsIn.days * 24 * 60 * 60 * 1000
  );

  return triggerTime;
};
