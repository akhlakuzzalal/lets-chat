/* eslint-disable quotes */
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NativeRouter, Route, Switch} from 'react-router-native';
import LogIn from './Components/Authentic/LogIn';
import Registration from './Components/Authentic/Registreation';
import Home from './Components/ChatHome/Home';
import ControlContext from './Components/Context/ControlContext';
import Header from './Components/Header/Header';

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
        <NativeRouter>
          <Header />
          <Switch>
            <Route exact path="/login" component={LogIn} />
            <Route path="/" component={Home} />
            <Route path="/register" component={Registration} />
          </Switch>
        </NativeRouter>
      </ControlContext>
    </PaperProvider>
  );
};

export default App;
