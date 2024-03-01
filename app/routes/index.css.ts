import { style } from '@vanilla-extract/css';
import { common } from '~/styles/element.css';
import { flex, gap } from '~/styles/util.css';

export const root = style([flex('column'), gap(1), {
  marginTop: '2rem',
  marginBottom: '1rem',
}]);

export const h2 = style({
  fontSize: '1.5rem',
  fontWeight: 800,
});

export const post = style({
  fontSize: '1rem',
  lineHeight: 1.7,
  wordWrap: 'break-word',
  wordBreak: 'keep-all',
});

export const rowlist = style([flex('row'), gap(0.5)]);
export const list = style([flex('column'), gap(0.5)]);

export const icon = style([common.anchor, {
  display: 'block',
  width: '1.3rem',
  height: '1.3rem',
}]);

export const link = style([common.anchor, {
  color: '#4055dc',
}]);

export const h3 = style({
  fontSize: '1.3rem',
  fontWeight: 600,
});
