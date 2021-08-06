import {createTheme} from '@material-ui/core/styles'

export default createTheme({
  palette: {
    primary: {
      main: '#04B9F7',
      dark: '#004967',
    },
    background: {
      light: '#FFFFFF',
      default: '#EFEFEF',
      dark: '#D8D8D8',
      paper: '#EFEFEF',
    },
    common: {
      grey: '#979797',
      greyLight: '#D8D8D8',
      black: '#1F2931',
      red: '#C63404',
      green: '#2FB637',
      orange: '#F39B00',
      yellow: '#F3E000',
    },
    text: {
      inverted: '#FFFFFF',
    },
    action: {
      contrastHover: 'rgba(255,255,255, 0.2)',
    },
  },
  layout: {
    fontFamily: '"neue-haas-unica", sans-serif',
    container: {
      fixedWidth: '62.5rem',
    },
    formControl: {
      fixedWidth: '44rem',
    },
  },
  typography: {
    fontFamily: '"Raleway", sans-serif',
    useNextVariants: true,
    fontWeightBold: 600,
    fontWeightBolder: 900,
    fontWeightMedium: 500,
    body2: {
      fontSize: 12,
    },
    display1: {
      fontSize: 24,
    },
    weight: {
      ultra: '100',
      thinner: '250',
      thin: '300',
      light: '350',
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  effects: {
    shadow: '0 1px 6px rgba(0, 0, 0, .15)',
    shadowUp: '0 -1px 4px rgba(0, 0, 0, .1)',
    iconShadow: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.45))',
  },
  pad: {
    padding: '8px 8px 4px',
  },
  stroke: {
    border: '1px solid rgba(224, 224, 224, 1)',
  },
})
