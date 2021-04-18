const stringFormatter = (str: string, type: string) => {
  if (type === 'name') {
    return str
      .toLowerCase()
      .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
  }
};

export default stringFormatter;
