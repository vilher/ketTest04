import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {realmDb} from '../../realm/initRealm';
import {TablesName} from '../../realm/question';
import {UserTable} from '../../realm/user';
import {shuffleArray} from './userAction';

const SET_USER_SELECT = 'SET_USER_SELECT';
const SET_CURRENT = 'SET_CURRENT';
const SET_ANSWER = 'SET_ANSWER';
const CLEAR_TEST = 'CLEAR_TEST';
const GENERATE_TEST = 'GENERATE_TEST';
const SET_ALL_ANSWERS = 'SET_ALL_ANSWERS';
const SET_USER_ANSWER = 'SET_USER_ANSWER';

export const testState = {
  userSelects: [],
  testAnswers: [],
  current: 0,
  userAnswers: {},
};

export function testReducer(state = testState, action) {
  switch (action.type) {
    case SET_USER_SELECT:
      state.userSelects[state.current] = action.selection;

      return {
        ...state,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.current,
      };
    case SET_ANSWER:
      state.testAnswers[state.current] =
        state.userSelects[state.current] ==
        action.answer.answers.find(inf => inf.isCorrect).id;
      return {
        ...state,
      };
    case SET_ALL_ANSWERS:
      const answersCN = action.user.answers.reduce((prev, next) => {
        prev[next.question.id] = next.answers;
        return prev;
      }, {});
      return {
        ...state,
        userAnswers: answersCN,
      };
    case SET_USER_ANSWER:
      console.log(action, state);

      // const finded = state.data.answers.find(value => {
      //   return value.question.id == action.answer.test.id;
      // });

      // if (finded) {
      //   realmDb.write(() => {
      //     finded.answers.push(action.answer.correct);
      //   });
      // } else {
      //   realmDb.write(() => {
      //     state.data.answers.push({
      //       question: action.answer.test,
      //       answers: [action.answer.correct],
      //     });
      //   });
      // }

      return {
        ...state,
      };
    case CLEAR_TEST:
      return {
        ...state,
        userSelects: [],
        testAnswers: [],
        current: 0,
      };
    case GENERATE_TEST:
      const user = realmDb
        .objects(UserTable.USER)
        .filtered(`id == ${action.gen.user}`)[0];

      switch (action.gen.action) {
        case 'saved':
          return {
            ...state,
            generatedTest: user.likes
              .filter(({categories}) =>
                categories.includes(user.category.toUpperCase()),
              )
              .reverse(),
          };
        case 'incorrect':
          return {
            ...state,
            generatedTest: user.answers.reduce((prev, value) => {
              if (!value.answers[value.answers.length - 1]) {
                prev.push(value.question);
                return prev;
              }
              return prev;
            }, []),
          };
        case 'correct':
          return {
            ...state,
            generatedTest: user.answers.reduce((prev, value) => {
              if (value.answers[value.answers.length - 1]) {
                prev.push(value.question);
                return prev;
              }
              return prev;
            }, []),
          };
        case 'forYou':
          const answersCN = user.answers.reduce((prev, next) => {
            prev[next.question.id] = next.answers;
            return prev;
          }, {});
          const tests = realmDb
            .objects(TablesName.QUESTIONS)
            .filtered(`categories = "${user.category.toUpperCase()}"`);

          const generatedForYou = generateTest(tests, answersCN);
          return {
            ...state,
            generatedTest: shuffleArray(generatedForYou.slice(0, 32)),
          };

        case 'forYouTest':
          const answersCN1 = user.answers.reduce((prev, next) => {
            prev[next.question.id] = next.answers;
            return prev;
          }, {});
          const tests1 = realmDb
            .objects(TablesName.QUESTIONS)
            .filtered(`categories = "${user.category.toUpperCase()}"`);

          const generatedForTest = generateTest(tests1, answersCN1);

          const {special: spec1, basic: basic1} = groupByType(generatedForTest);
          return {
            ...state,
            generatedTest: Math.floor(Math.random() * 2)
              ? shuffleArray(spec1.slice(0, 32))
              : shuffleArray(basic1.slice(0, 32)),
          };

        case 'test':
          const answersCN2 = user.answers.reduce((prev, next) => {
            prev[next.question.id] = next.answers;
            return prev;
          }, {});
          const tests2 = realmDb
            .objects(TablesName.QUESTIONS)
            .filtered(`categories = "${user.category.toUpperCase()}"`);

          const generated = generateTest(tests2, answersCN2);

          const groupedLevels = groupByTypeAndPoints(generated);
          const {special, basic} = groupedLevels;

          const basicOne = basic[3].slice(0, 10);
          const basicTwo = basic[2].slice(0, 6);
          const basicThree = basic[1].slice(0, 4);
          const specialOne = special[3].slice(0, 6);
          const specialTwo = special[2].slice(0, 4);
          const specialThree = special[1].slice(0, 2);
          return {
            ...state,
            generatedTest: shuffleArray([
              ...basicOne,
              ...basicTwo,
              ...basicThree,
              ...specialOne,
              ...specialTwo,
              ...specialThree,
            ]),
          };
        default:
          const tests3 = realmDb
            .objects(TablesName.QUESTIONS)
            .filtered(`categories = "${user.category.toUpperCase()}"`)
            .filter(state => state.theme.includes(action.gen.action));

          return {
            ...state,
            generatedTest: shuffleArray(tests3),
          };
      }

    default:
      return state;
  }
}

export const set_user_select = action => ({
  type: SET_USER_SELECT,
  selection: action,
});

export const set_current = action => ({
  type: SET_CURRENT,
  current: action,
});

export const clear_test = action => ({
  type: SET_CURRENT,
});

export const generate_test = action => ({
  type: GENERATE_TEST,
  gen: action,
});

export const set_answer = action => ({
  type: SET_ANSWER,
  answer: action,
});
export const set_all_answers = action => ({
  type: SET_ALL_ANSWERS,
  user: action,
});

export const set_user_answer = action => ({
  type: SET_USER_ANSWER,
  answer: action,
});

function generateTest(tests, userAnswersObj) {
  const updatedTests = tests.map(test => {
    const userAnswer = (userAnswersObj[test.id] || []).slice(-15);
    const sum = userAnswer.reduce(
      (acc, ans, index) => (ans ? 2 : 1) * (index + 1) + acc,
      0,
    );
    return {...test, sum};
  });
  updatedTests.sort((a, b) => a.sum - b.sum);
  return updatedTests;
}

function groupByType(test) {
  const levels = {
    basic: [],
    special: [],
  };

  test.forEach(question => {
    const {questionType} = question;
    levels[questionType == 1 ? 'special' : 'basic'].push(question);
  });
  return levels;
}

function groupByTypeAndPoints(test) {
  const levels = {
    basic: {3: [], 2: [], 1: []},
    special: {3: [], 2: [], 1: []},
  };

  test.forEach(question => {
    const {questionType, points} = question;
    const level = points === 3 ? 3 : points === 2 ? 2 : 1;
    levels[questionType == 1 ? 'special' : 'basic'][level].push(question);
  });

  return levels;
}
