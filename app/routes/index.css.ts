import { style } from '@vanilla-extract/css';
import { flex, gap } from '~/styles/util.css';

export const root = style([flex('column'), gap(1)]);

export const post = style({
  fontSize: '1rem',
  lineHeight: 1.7,
  wordWrap: 'break-word',
  wordBreak: 'keep-all',
  margin: 0,
});
