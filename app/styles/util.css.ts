import { style } from '@vanilla-extract/css';

export const flex = (direction: 'row' | 'column') => style({ display: 'flex', flexDirection: direction });
export const gap = (n: number) => style({ gap: `${n}rem` });
