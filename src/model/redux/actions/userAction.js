import {realmDb} from '../../realm/initRealm';
import {TablesName} from '../../realm/question';
import {UserTable} from '../../realm/user';
import {Appearances} from '../state/Appearance';
import {Categories} from '../state/Categories';
import {Languages} from '../state/Language';

const SET_LANGUAGE = 'SET_LANGUAGE';
const SET_LIKE = 'SET_LIKE';
const FIND_USER = 'FIND_USER';

export const userState = {
  id: null,
  data: null,

  language: Languages[0].key,
  likes: {},
  correct: [],
  incorrect: [],
};

export function userReducer(state = userState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      // realmDb.write(() => {
      //   state.data.language = action.language;
      // });
      state.language = action.language;
      return {
        ...state,
      };
    case FIND_USER:
      const likesObject = action.user.likes.reduce((accumulator, item) => {
        accumulator[item.id] = true;
        return accumulator;
      }, {});

      const answersCN = action.user.answers.reduce(
        (prev, next) => {
          if (next.answers[next.answers.length - 1]) {
            next.question.categories.includes(state.category.toUpperCase())
              ? prev.correct.push(next)
              : null;
            return prev;
          } else {
            next.question.categories.includes(state.category.toUpperCase())
              ? prev.incorrect.push(next)
              : null;
            return prev;
          }
        },
        {correct: [], incorrect: []},
      );

      if (action.user != undefined) {
        state.appearance = action.user.appearance
          ? action.user.appearance
          : state.appearance;
        state.language = action.user.language
          ? action.user.language
          : state.language;
        state.category = action.user.category
          ? action.user.category
          : state.category;
      }
      return {
        ...state,
        id: action.user.id,
        data: action.user,
        likes: likesObject,
        ...answersCN,
      };

    case SET_LIKE:
      if (state.likes[action.test.id] != undefined) {
        // state.likes.filter(v => {
        //   console.log(v);
        //   return false;
        // });
        delete state.likes[action.test.id];
        // const indexToRemove = state.data.likes.findIndex(
        //   item => item.id == action.test.id,
        // );
        // realmDb.write(() => {
        //   state.data.likes.splice(indexToRemove, 1);
        // });
        // delete state.likes[action.test.id];
      } else {
        // realmDb.write(() => {
        //   state.data.likes.push(action.test);
        // });
        state.likes[action.test.id] = true;
      }
      return {
        ...state,
      };

    default:
      return state;
  }
}

export const find_user = action => ({
  type: FIND_USER,
  user: action,
});

export const set_language = action => ({
  type: SET_LANGUAGE,
  language: action,
});

export const set_like = action => ({
  type: SET_LIKE,
  test: action,
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
