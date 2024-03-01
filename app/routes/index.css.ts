import { style } from '@vanilla-extract/css';
import { common } from '~/styles/element.css';
import { flex, gap } from '~/styles/util.css';

export const root = style([flex('column'), gap(1), {
  marginTop: '2rem',
  marginBottom: '1rem',
}]);

export const h2 = style({
  fontSize: '1.5rem',
  fontWeight: 'semibold',
});

export const list = style([flex('column'), gap(0.5)]);

export const link = style([common.anchor, {}]);

export const h3 = style({
  fontSize: '1.3rem',
  fontWeight: 'semibold',
});
