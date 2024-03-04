import { style } from '@vanilla-extract/css';
import { flex, gap } from '~/styles/util.css';

export const list = style([flex('column'), gap(0.2), {
  listStyle: 'square',
}]);
  
