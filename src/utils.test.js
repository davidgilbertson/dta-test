import { filterOutNonNumbers } from "./utils"

it('filterOutNonNumbers should filter out non numbers', () => {
  const input = [
    -50,
    Infinity,
    12,
    'dinosaur',
    0,
    null
  ];

  const output = filterOutNonNumbers(input);

  expect(output).toEqual([
    -50,
    Infinity,
    12,
    0,
  ]);
});
