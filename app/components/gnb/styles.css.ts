import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
});

export const list = style({
  display: 'flex',
  flexDirection: 'row',
});

export const listitem = style({
  listStyle: 'none',
  textDecoration: 'none',
  color: 'inherit',
  ':hover': {
    background: '#f5f5f5',
  },
});

export const link = style({
  listStyle: 'none',
  textDecoration: 'none',
  color: 'inherit',
  ':hover': {
    background: '#f5f5f5',
  },
});
  
