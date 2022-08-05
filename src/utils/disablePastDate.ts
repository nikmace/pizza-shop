/* eslint-disable import/prefer-default-export */
/**
 * @description Calculate current date in the following format: yyyy-MM-ddThh:mm,
 * where minutes are increased by 30 min at least to account for
 * processing the order and delivery.
 * @params None
 * @returns Current date
 */
export const disablePastDate = (): string => {
  return new Date(new Date().getTime() + 225 * 60000)
    .toISOString()
    .slice(0, 16);
};
