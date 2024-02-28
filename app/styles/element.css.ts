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

const listitem = style({
  listStyle: 'none',
  marginTop: '1rem',
  marginBottom: '1rem',
});

export const common = {
  anchor,
  listrow,
  listitem,
};
