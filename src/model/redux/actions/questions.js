const SET_TEST = 'SET_TEST';

export const questionState = {
  tests: [],
};

export function questionReducer(state = questionState, action) {
  switch (action.type) {
    case SET_TEST:
      return {
        ...state,
        tests: action.tests,
      };

    default:
      return state;
  }
}

export const set_test = action => ({
  type: SET_TEST,
  tests: action,
});

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleArrayObj(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
