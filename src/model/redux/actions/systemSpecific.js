import {realmDb} from '../../realm/initRealm';
import {TablesName} from '../../realm/question';
import {UserTable} from '../../realm/user';
import {Appearances} from '../state/Appearance';
import {Categories} from '../state/Categories';
import {Languages} from '../state/Language';

const SET_CATEGORY = 'SET_CATEGORY';
const SET_APPEARANCE = 'SET_APPEARANCE';

export const systemState = {
  category: Categories[0].key,
  appearance: Appearances[2].icon,
};

export function systemSpecificReducer(state = systemState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      // realmDb.write(() => {
      //   state.data.category = action.category;
      // });

      return {
        ...state,
        category: action.category,
        // tests: realmDb
        //   .objects(TablesName.QUESTIONS)
        //   .filtered(`categories = "${action.category.toUpperCase()}"`),
      };
    case SET_APPEARANCE:
      // realmDb.write(() => {
      //   state.data.appearance = action.appearance;
      // });
      return {
        ...state,
        appearance: action.appearance,
      };

    default:
      return state;
  }
}

export const set_category = action => ({
  type: SET_CATEGORY,
  category: action,
});

export const set_appearance = action => ({
  type: SET_APPEARANCE,
  appearance: action,
});
