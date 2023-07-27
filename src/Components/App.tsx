import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../Libs/Contexts/index';
import UserProfile from '../Libs/Services/UserProfile.service';
import Layout from "./Layout";
import LyInfo from "./Layout/LyInfo";

import Redirect from './Pages/Redirect';
import { Error } from './Pages/Error';
import { Auth } from './Pages/Auth/index';
import { OrderList, OrderDetail } from './Pages/Order';
import { CustomerList, CustomerDetail } from './Pages/Customer';
import { ColorList, ColorDetail } from './Pages/Avatar/Color';
import { AvatarList, AvatarDetail } from './Pages/Avatar/Avatar';
import { CollabList, CollabDetail } from './Pages/Collab';
import { ProductList, ProductDetail } from './Pages/Product';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(UserProfile.isUserLogin());
  }, []);
  //--------------------------------------------------//
  const login = () => {
    setIsLogin(UserProfile.isUserLogin());
  };

  const logout = () => {
    UserProfile.logout();
    setIsLogin(UserProfile.isUserLogin());
  };
  //--------------------------------------------------//Customer
  //--------------------------------------------------//
  return (
    <BrowserRouter basename={"/"}>
      <AuthContext.Provider value={isLogin}>
        <Routes>
          <Route
            path="/login"
            element={<Auth loginCallback={login} logoutCallback={logout} />}
          />
          <Route
            path="/error"
            element={<Error />}
          />
          <Route element={<Layout logoutCallback={logout} />}
          >
            <Route element={<LyInfo />} >
              <Route path="/" element={<Redirect />} />
              <Route path="/order" element={<OrderList />} />
              <Route path="/order/:id" element={<OrderDetail />} />
              <Route path="/customer" element={<CustomerList />} />
              <Route path="/customer/:id" element={<CustomerDetail />} />

              <Route path="/avatar/color" element={<ColorList />} />
              <Route path="/avatar/color/newcolor" element={<ColorDetail />} />
              <Route path="/avatar/color/:id" element={<ColorDetail />} />

              <Route path="/avatar/:body" element={<AvatarList />} />
              <Route path="/avatar/:body/:id" element={<AvatarDetail />} />

              <Route path="/character" element={<CollabList />} />
              <Route path="/character/newcolor" element={<CollabDetail />} />
              <Route path="/character/:id" element={<CollabDetail />} />

              <Route path="/productlist" element={<ProductList />} />
              <Route path="/productlist/:id" element={<ProductDetail />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
