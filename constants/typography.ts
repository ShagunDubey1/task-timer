import { scaleFont } from "./mixins";

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'regular';
export const FONT_FAMILY_MEDIUM = 'medium';
export const FONT_FAMILY_SEMIBOLD = 'semibold';
export const FONT_FAMILY_BOLD = 'bold';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_MEDIUM = '500';
export const FONT_WEIGHT_SEMIBOLD = '600';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_32 = scaleFont(32);
export const FONT_SIZE_26 = scaleFont(26);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_10 = scaleFont(10);
export const FONT_SIZE_9 = scaleFont(9);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_22 = scaleFont(22);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_18 = scaleFont(18);
export const LINE_HEIGHT_16 = scaleFont(16);
export const LINE_HEIGHT_15 = scaleFont(15);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_MEDIUM = {
  fontFamily: FONT_FAMILY_MEDIUM,
  fontWeight: FONT_WEIGHT_MEDIUM,
};

export const FONT_SEMIBOLD = {
  fontFamily: FONT_FAMILY_SEMIBOLD,
  fontWeight: FONT_WEIGHT_SEMIBOLD,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};
