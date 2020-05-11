export const ExtractFormUpdatedValues = (values) => {
  const entries = Object.entries(values);
  const updates = {};
  for (const entry of entries) {
    if (entry[1] !== undefined && !['hours', 'minutes'].includes(entry[0])) {
      updates[entry[0]] = entry[1];
    }
  }
  return updates;
};

export const TimeConvert = (number) => {
  const hours = number / 60;
  const realHours = Math.floor(hours);
  const minutes = (hours - realHours) * 60;
  const realMinutes = Math.round(minutes);
  return realHours + ' hour(s) and ' + realMinutes + ' minute(s).';
};
