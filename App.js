
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from './Components/NavBar';
import UserDashboard from './Components/UserDashboard';
import { Provider } from 'react-redux';
import {  applyMiddleware, compose, createStore } from 'redux';
import reducers from "./Reducers";
import thunk from 'redux-thunk';
import  { createLogger } from 'redux-logger';
import Signup from './Components/Signup';
const logger=createLogger()
function App() {
  return (
    <Provider  store={createStore(reducers,compose(applyMiddleware(thunk,logger)))}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={NavBar} />
          <Route path="/" component={UserDashboard} />
          <Route path="/signup" component={Signup} />

        </Switch>


      </BrowserRouter>
    </Provider>
  );
}

export default App;
