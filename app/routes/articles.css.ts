import { style } from '@vanilla-extract/css';
import { colors } from '~/styles/colors';
import { common } from '~/styles/element.css';

export const root = style({
  marginTop: '2rem',
})

export const link = style([common.anchor, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '0.7rem',
  paddingBottom: '0.7rem',
}])

export const dateText = style({
  fontSize: '0.9rem',
  color: colors.gray600,
});
