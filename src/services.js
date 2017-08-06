import { filterOutNonNumbers } from './utils';

const API_URL = 'https://frontend-exercise.apps.staging.digital.gov.au/bars';

export function getAppDataService() {
  return fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    // sort() alone doesn't sort negatives correctly, hence sort((a, b) => a - b)
    const buttonValues = filterOutNonNumbers(data.buttons).sort((a, b) => a - b);
    const barValues = filterOutNonNumbers(data.bars);

    return { buttonValues, barValues };
  });
}
