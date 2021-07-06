import React, { useState, useReducer, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/homePage';
import incomReducer from './components/incomeReducer';
import expenseReducer from './components/expenseReducer';
import AppNavbar from './components/navbar';
import AboutPage from './components/about';

const modalContext = createContext(null);
export { modalContext };

const incomeContext = createContext(null);
export { incomeContext };

const expenseContext = createContext(null);
export { expenseContext };

const Routers = () => {

  const [show, setShow] = useState(false);
  const handleOpen = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }

  const income = [];
  const expense = [];

  console.log(income);

  const [state, dispatch] = useReducer(incomReducer, income);
  console.log('state:', state);
  const [expenseState, expenseDispatch] = useReducer(expenseReducer, expense)
  console.log('expenseState:', expenseState);

  return (
    <Router>
      <AppNavbar />
      <expenseContext.Provider value={{ expenseState, expenseDispatch }}>
        <incomeContext.Provider value={{ state, dispatch }}>
          <Switch>
            <modalContext.Provider value={{ show, handleOpen, handleClose }}>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path="/about">
                <AboutPage />
              </Route>
            </modalContext.Provider>
          </Switch>
        </incomeContext.Provider>
      </expenseContext.Provider>
    </Router>
  );
}

ReactDOM.render(<Routers />, document.getElementById('root'));

