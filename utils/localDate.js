const localDate = (isoString) => {
  if (typeof isoString === 'object') return isoString;
  const [year, month, day] = isoString.split('-');
  return new Date(year, month - 1, day);
};

export default localDate;
