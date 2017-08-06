export function filterOutNonNumbers(buttonValues) {
  return buttonValues
  .map(value => {
    if (isNaN(Number(value))) {
      console.warn(`Expected a number, but got "${value}"`);

      return null;
    }

    return value;
  })
  .filter(value => value !== null); // filter out empty values (items that were non-numbers)
}
