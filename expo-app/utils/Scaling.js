import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 667;

const scale = size => width / baseWidth * size;
const verticalScale = size => height / baseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale, baseWidth, baseHeight};