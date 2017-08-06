import { getAppDataService } from "./services";
import { filterOutNonNumbers } from './utils';

const responseMock = {
  bars: [1, 2, 3],
  buttons: [10, 20, 30],
};

window.fetch = jest.fn(() => Promise.resolve({
  json: () => responseMock,
}));

jest.mock('./utils', () => ({
  filterOutNonNumbers: jest.fn((arg) => arg),
}));

// note: this is an async test
it('should fetch the app data', () => (
  getAppDataService().then((data) => {
    expect(data).toEqual({
      buttonValues: responseMock.buttons,
      barValues: responseMock.bars,
    });
  })
));

it('should attempt to filter out non numbers', () => {
  filterOutNonNumbers.mockClear();

  // note: this is an async test
  return getAppDataService().then(() => {
    expect(filterOutNonNumbers).toHaveBeenCalledTimes(2);
  });
});

it('should sort the returned button values', () => {
  window.fetch.mockImplementation(() => Promise.resolve({
    json: () => ({
      bars: [3, 2, 1], // will not be sorted
      buttons: [20, 10, 0, -50, -45], // will be sorted
    }),
  }));

  // note: this is an async test
  return getAppDataService().then((data) => {
    expect(data).toEqual({
      buttonValues: [-50, -45, 0, 10, 20],
      barValues: [3, 2, 1],
    });
  });
});
