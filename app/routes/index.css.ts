import { style } from '@vanilla-extract/css';
import { common } from '~/styles/element.css';
import { flex, gap } from '~/styles/util.css';

export const root = style([flex('column'), gap(1)]);

export const post = style({
  fontSize: '1rem',
  lineHeight: 1.7,
  wordWrap: 'break-word',
  wordBreak: 'keep-all',
  margin: 0,
});

export const rowlist = style([flex('row'), gap(0.5)]);

export const icon = style([common.anchor, {
  display: 'block',
  width: '1.3rem',
  height: '1.3rem',
}]);

export const list = style([flex('column'), gap(0.2), {
  listStyle: 'square',
}]);
