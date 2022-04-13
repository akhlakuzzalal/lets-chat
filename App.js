/* eslint-disable quotes */
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {NativeRouter, Route, Switch} from 'react-router-native';
import LogIn from './Components/Authentic/LogIn';
import Registration from './Components/Authentic/Registreation';
import Home from './Components/ChatHome/Home';
import SingleChat from './Components/ChatHome/SingleChat';
import ControlContext from './Components/Context/ControlContext';
import Header from './Components/Header/Header';
import {store} from './redux/store';

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#d165db',
      accent: 'yellow',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <ControlContext>
        <Provider store={store}>
          <NativeRouter>
            <Header />
            <Switch>
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Registration} />
              <Route path="/single" component={SingleChat} />
            </Switch>
          </NativeRouter>
        </Provider>
      </ControlContext>
    </PaperProvider>
  );
};

export default App;
