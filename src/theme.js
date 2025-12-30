import { Platform } from "react-native";


const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    barText: '#FFFFFF',
    error: '#d73a4a',
  },
  backgroundColors: {
    appBarBg: '#24292e',
    mainBg: '#e1e4e8',
    repoItemBg: 'white',
    tagBg: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    bar: 18,
  },
  fonts: {
    fontStyle: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;