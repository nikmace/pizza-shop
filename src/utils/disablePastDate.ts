// eslint-disable-next-line import/prefer-default-export
export const disablePastDate = () => {
  return new Date().toISOString().slice(0, 16);
};
