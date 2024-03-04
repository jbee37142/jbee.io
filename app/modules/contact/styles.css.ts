import { style } from '@vanilla-extract/css';
import { common } from '~/styles/element.css';
import { flex, gap } from '~/styles/util.css';

export const rowlist = style([flex('row'), gap(0.5)]);

export const icon = style([common.anchor, {
  display: 'block',
  width: '1.3rem',
  height: '1.3rem',
}]);
