import { style } from '@vanilla-extract/css';
import { colors } from './colors';

const anchor = style({
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
  'selectors': {
    '&.active': {
      textDecoration: 'underline',
    },
  },
});

const link = style([anchor, {
  flex: 1,
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  color: colors.blue500,
  ':hover': {
    textDecoration: 'underline',
    textDecorationThickness: 'from-font',
    textUnderlinePosition: 'under',
    textDecorationColor: colors.blue500,
  }
}]);

const listrow = style({
  display: 'flex',
  flexDirection: 'row',
});

export const common = {
  anchor,
  link,
  listrow,
};
