import languages from '../constants/languages'

const getLanguages = () => {
  return new Promise(r => r(languages));
};

export { getLanguages };
