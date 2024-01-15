import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import BookingList from './components/BookingList/BookingList';

export const userContext= createContext();

function App() {
const [userInfo, setUserInfo]= useState({});

  return (
    <userContext.Provider value={[userInfo, setUserInfo]}>
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/book/:bedType"><Book/></PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/bookingList">
              <BookingList></BookingList>
            </Route>
          </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
