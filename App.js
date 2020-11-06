import { View } from 'native-base';
import React, {Component} from 'react';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/redux/reducer';
import ReduxThunk from 'redux-thunk';

import RouterComponent from './src/Rooter';






class App extends Component {
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        
        <RouterComponent></RouterComponent>
        
        
      </Provider>
    );
        
  }
}

export default App;
