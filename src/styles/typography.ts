export type TypeOfTypography = typeof typography;
export type KeyOfTypography = keyof typeof typography;

export const calcRem = (px: number) => `${px / 16}rem`;

export const typography = {
  size_24: {
    fontSize: calcRem(22),
    lineHeight: 1.4,
    fontWeight: 700,
  },
  size_18: {
    fontSize: calcRem(18),
    lineHeight: 1.5,
    fontWeight: 500,
  },
  size_16: {
    fontSize: calcRem(16),
    lineHeight: 1.5,
    fontWeight: 500,
  },
  size_14: {
    fontSize: calcRem(14),
    lineHeight: 1.5,
    fontWeight: 300,
  },
  size_10: {
    fontSize: calcRem(10),
    lineHeight: 1.5,
    fontWeight: 300,
  },
};
