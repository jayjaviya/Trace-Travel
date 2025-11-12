import React from 'react';
// import { ThemeProvider } from './ThemeContext'; // <-- REMOVE THIS IMPORT
import Home from './Home';


function App() {
  return (
    // <ThemeProvider>  <-- REMOVE THIS WRAPPER
      <Home />
    // </ThemeProvider>
  );
}

export default App;