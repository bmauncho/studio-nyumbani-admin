import nearestColor from "nearest-color";
import { colornames } from "color-name-list";

const colorMap = colornames.reduce((acc: Record<string, string>, color) => {
  acc[color.name] = color.hex;
  return acc;
}, {});

const nearest = nearestColor.from(colorMap);

export const getColorName = (hex: string): string => {
  const match = nearest(hex);
  return match ? match.name : "";
};
