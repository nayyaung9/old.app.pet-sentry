const Base = 4;
export enum FONT_FAMILY {
  REGULAR = "Font-Regular",
  LIGHT = "Font-Light",
  MEDIUM = "Font-Medium",
  BOLD = "Font-Bold",
}

export const StyleConstants = {
  Font: {
    Regular: { fontFamily: FONT_FAMILY.REGULAR },
    Light: { fontFamily: FONT_FAMILY.LIGHT },
    Medium: { fontFamily: FONT_FAMILY.MEDIUM },
    Bold: { fontFamily: FONT_FAMILY.BOLD },
  },
  FontStyle: {
    XS: { fontSize: 10, lineHeight: 14 },
    S: { fontSize: 12, lineHeight: 17 },
    M: { fontSize: 14, lineHeight: 20 },
    L: { fontSize: 16, lineHeight: 23 },
    XL: { fontSize: 18, lineHeight: 18 },
  },

  Spacing: {
    XS: Base,
    S: Base * 2,
    M: Base * 4,
    L: Base * 6,
    XL: Base * 10,
    Global: { PagePadding: Base * 4 },
  },

  Avatar: { XS: 32, S: 40, M: 48, L: 96 },
};