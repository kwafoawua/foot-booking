export const fixtureRegexp = (value) => {
  const regexp = new RegExp(/P[0-9]M[0-9]/);
  return regexp.test(value);
};
