import { style } from '@vanilla-extract/css';
import { colors } from '~/styles/colors';
import { common } from '~/styles/element.css';

export const articleItem = style([common.listitem, {
}]);

export const link = style([common.anchor, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}])

export const dateText = style({
  fontSize: '0.9rem',
  color: colors.gray600,
});
