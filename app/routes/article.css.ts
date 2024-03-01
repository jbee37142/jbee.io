import { style } from '@vanilla-extract/css';
import { colors } from '~/styles/colors';
import { flex, gap } from '~/styles/util.css';

export const root = style([flex('column'), gap(0.7), {}]);

export const category = style({
  fontSize: '0.8rem',
  color: colors.gray600,
  textTransform: 'uppercase',
  letterSpacing: '0.1px',
  fontWeight: 500,

  width: 'fit-content',
  padding: '0.3rem',
  border: `1px solid ${colors.gray300}`,
  borderRadius: '0.5rem',
});

export const h1 = style({
});

export const description = style([flex('row'), gap(0.5) ,{
  fontSize: '0.9rem',
  color: colors.gray600,
  margin: 0,
}])

export const updatedTime = style({
  color: 'inherit',
});

export const readingTime = style({
  color: 'inherit',
});
