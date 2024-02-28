import { style } from '@vanilla-extract/css';

export const root = style({
  marginTop: '1rem',
  marginBottom: '1rem',
});

export const list = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
});

export const listitem = style({
  listStyle: 'none',
});

export const link = style({
  textDecoration: 'none',
  color: 'inherit',
});
  
