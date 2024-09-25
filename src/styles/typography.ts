export type TypeOfTypography = typeof typography;
export type KeyOfTypography = keyof typeof typography;

export const calcRem = (px: number) => `${px / 16}rem`;

export const typography = {
  size_24: {
    fontFamily: 'Pretendard',
    fontSize: calcRem(22),
    lineHeight: 1.4,
    fontWeight: 700,
  },
  size_18: {
    fontFamily: 'Pretendard',
    fontSize: calcRem(18),
    lineHeight: 1.5,
    fontWeight: 500,
  },
  size_16: {
    fontFamily: 'Pretendard',
    fontSize: calcRem(16),
    lineHeight: 1.5,
    fontWeight: 500,
  },
  size_14: {
    fontFamily: 'Pretendard',
    fontSize: calcRem(14),
    lineHeight: 1.5,
    fontWeight: 500,
  },
  size_10: {
    fontFamily: 'Pretendard',
    fontSize: calcRem(10),
    lineHeight: 1.5,
    fontWeight: 500,
  },
};
