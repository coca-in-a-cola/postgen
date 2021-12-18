import Generator from './components/Generator';
import "@fontsource/roboto";
import "./App.css"
import {ThemeProvider} from '@mui/material';
import { skbLabMUITheme } from './skbLabMUITheme';
function App() {
  return (
    <ThemeProvider theme={skbLabMUITheme}>
      <Generator/>
    </ThemeProvider>
  );
}

export default App;
