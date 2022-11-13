export const getLSData = <T>(key: string) => {
  const data = localStorage.getItem(key);
  if (!data) {
    return null;
  }
  return <T>JSON.parse(data);
};

export const setLSData = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteLSData = (key: string) => {
  delete localStorage[key];
};
