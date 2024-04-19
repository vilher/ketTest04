import {DarkTheme, DefaultTheme} from '@react-navigation/native';

const SET_WHITE = 'SET_WHITE';
const SET_DARK = 'SET_DARK';

export const colorState = {
  text: DefaultTheme.colors.text,
  primary: 'blue',
  background: DefaultTheme.colors.background,
  card: DefaultTheme.colors.card,
  icons: 'rgba(204,209,217,0.8)',
  secondaryRgba: '54,84,134,1',
  borderRgba: '204,209,217',
  dark: true,
};

export function colorReducer(state = colorState, action) {
  switch (action.type) {
    case SET_WHITE:
      return {
        ...state,
        text: DefaultTheme.colors.text,
        background: DefaultTheme.colors.background,
        card: DefaultTheme.colors.card,
        dark: false,
      };
    case SET_DARK:
      return {
        ...state,
        text: DarkTheme.colors.text,
        background: DarkTheme.colors.background,
        card: DarkTheme.colors.card,
        dark: true,
      };

    default:
      return state;
  }
}

export const set_white = action => ({
  type: SET_WHITE,
  color: action,
});

export const set_dark = action => ({
  type: SET_DARK,
  color: action,
});
