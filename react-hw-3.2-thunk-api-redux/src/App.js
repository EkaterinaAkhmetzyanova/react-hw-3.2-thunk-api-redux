/* eslint-disable no-undef */
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import store from './store';
import ServiceAdd from './components/ServiceAdd';
import ServiceList from './components/ServiceList';
//import serviceWorker from './serviceWorker'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/services/' />
        </Route>
        <Route exact path='/services' component={ServiceList} />
        <Route exact path='/services/:id' component={ServiceAdd} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
         <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;

//serviceWorker.unregister();