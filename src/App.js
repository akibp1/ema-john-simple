import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Orders from './components/Orders/Orders';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import { AuthContextPorvider, PrivateRoute } from './components/Login/useAuth';
import Shipment from './components/shipment/Shipment';


function App() {
  return (
    <div>
      <AuthContextPorvider>
        <Header></Header>

        <Router>
          <Switch>
            <Route path="/shop">

              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>

            </Route>
            <Route path="/orders">
              <Orders></Orders>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path="*">
              <NotFound></NotFound>

            </Route>
          </Switch>

        </Router>
      </AuthContextPorvider>
      <footer>Design By Alamin </footer>
    </div>
  );
}

export default App;
