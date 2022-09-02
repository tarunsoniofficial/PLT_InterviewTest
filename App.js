import React from 'react';
import {Provider} from 'react-redux';
import Dashboard from './src/Dashboard';
import {Store} from './src/Redux/store';
const App = () => {
  return (
    <Provider store={Store}>
      <Dashboard />
    </Provider>
  );
};

export default App;
