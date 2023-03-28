import { createTheme, ThemeProvider } from '@mui/material/styles';
//components
import Home from './components/Home';
import DataProvider from './context/DataProvider';


const theme = createTheme({
	palette: {
		primary: { main: '#2497FB', light: '#38beff', dark: '#0087ca' },
		secondary: { main: '#878787', light: '#afafaf', dark: '#676767' },
		error: { main: '#FF4848', light: '#ff7878', dark: '#e82d2d' }
	},
	typography: {
		fontFamily: 'Muller',

	}
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <Home />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
