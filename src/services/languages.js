const data = [
  {
    id: "1",
    iso: "en",
    name: "English",
    direction: "ltr"
  },
  {
    id: "2",
    iso: "ar",
    name: "Arabic",
    direction: "rtl"
  }
];

// TODO: update to use /languages
const getLanguages = () => {
  return new Promise(r => r(data));
};

export { getLanguages };
