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
