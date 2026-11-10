/**
 * Generates a media queries given a set of named breakpoints
 * @param {Object} breakpoints Object of key-value pairs where the key is the name of
 * the breakpoint size and the value is the min-width of that breakpoint
 * @returns {Object} A set of CSS media queries for each breakpoint size
 *
 * @deprecated ⚠️ `makeMq` has been deprecated in v16 and will be removed in a future major version. Please use the breakpoint helpers instead (e.g. `up('m')`, also available as `theme.canvas.breakpoints.up` from `useTheme()`), or `useResponsiveContainerStyles` for container-based responsive styles.
 */
export const makeMq = (breakpoints: {[key: string]: number}) => {
  const mq: {[key: string]: string} = {};

  Object.keys(breakpoints).forEach(key => {
    mq[key] = `@media (min-width: ${breakpoints[key]}px)`;
  });

  return mq;
};
