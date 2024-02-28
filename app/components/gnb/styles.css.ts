import { style } from '@vanilla-extract/css';
import { common } from '~/styles/element.css';

export const root = style({
  marginTop: '1rem',
  marginBottom: '1rem',
});

export const list = style([common.listrow, {
  gap: '1rem',
}]);

export const listItem = style({
  fontSize: '1.2rem',
});
