import { style } from '@vanilla-extract/css';
import { common } from '~/styles/element.css';

export const root = style({
  marginTop: '1rem',
  marginBottom: '2rem',
});

export const list = style([common.listrow, {
  gap: '1rem',
  padding: 0,
  listStyle: 'none',
  lineHeight: '1rem',
}]);

export const listItem = style({
  fontSize: '1rem',
});

export const link = style([common.anchor, {
  ':hover': {
    textDecoration: 'underline',
    textDecorationThickness: '0.1em',
    textUnderlinePosition: 'under',

  },
  'selectors': {
    '&.active': {
      textDecoration: 'underline',
      textDecorationThickness: '0.2em',
      textUnderlinePosition: 'under',
    },
  }
}]);
