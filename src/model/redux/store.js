import {combineReducers, createStore} from 'redux';
import {colorReducer, set_white, set_dark} from './actions/colorAction';
import {
  userReducer,
  set_language,
  set_test,
  set_like,
  find_user,
  set_user_answer,
} from './actions/userAction';
import {
  testReducer,
  set_user_select,
  set_current,
  clear_test,
  generate_test,
  set_answer,
  set_all_answers,
} from './actions/testAction';
import {
  set_category,
  systemSpecificReducer,
  set_appearance,
} from './actions/systemSpecific';
import {questionReducer} from './actions/questions';

const rootReducer = combineReducers({
  colors: colorReducer,
  user: userReducer,
  test: testReducer,
  system: systemSpecificReducer,
  questions: questionReducer,
});

const store = createStore(rootReducer);
export default store;

export const mapDispatchToProps = {
  set_user_answer,
  set_white,
  set_dark,
  set_appearance,
  set_category,
  set_language,
  set_user_select,
  set_current,
  clear_test,
  set_answer,
  generate_test,
  set_like,
  find_user,
  set_all_answers,
};
