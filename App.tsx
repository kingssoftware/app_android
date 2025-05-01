import React from 'react';
import Routes from './src/routes';

import {ContextProvider} from './src/context';

const App = () => {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
};

export default App;
