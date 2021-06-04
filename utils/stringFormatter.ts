const stringFormatter = (str: string, type: string) => {
  if (type === 'name') {
    return str
      .toLowerCase()
      .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
  }
  if (type === 'text') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

export default stringFormatter;
