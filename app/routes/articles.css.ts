import { style } from '@vanilla-extract/css';
import { colors } from '~/styles/colors';
import { common } from '~/styles/element.css';

export const root = style({
  marginTop: '2rem',
  listStyle: 'none',
  padding: 0,
})

export const item = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const link = style([common.anchor, {
  flex: 1,
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  ':hover': {
    textDecoration: 'underline',
    textDecorationThickness: 'from-font',
    textUnderlinePosition: 'under',
    textDecorationColor: '#495057',
  }
}]);

export const dateText = style({
  fontSize: '0.9rem',
  color: colors.gray600,
  flexShrink: 0,
  fontVariantNumeric: 'tabular-nums',
});
