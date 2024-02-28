import { style } from '@vanilla-extract/css';

const anchor = style({
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
  'selectors': {
    '&.active': {
      color: 'black',
    },
  },
});

const listrow = style({
  display: 'flex',
  flexDirection: 'row',
});

export const common = {
  anchor,
  listrow,
};
