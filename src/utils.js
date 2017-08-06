export function filterOutNonNumbers(buttonValues) {
  return buttonValues
  .map(value => {
    if (isNaN(Number(value))) {
      console.warn(`Expected a number, but got "${value}"`);

      return null;
    }
    return value;
  })
  .filter(value => !!value); // filter out empty values
}
