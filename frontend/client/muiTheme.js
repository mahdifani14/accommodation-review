// Import material-ui
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const red = '#DD0034';
const hopeGreen = '#2ac101';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red,
    green: hopeGreen
  },
});

export default muiTheme;
