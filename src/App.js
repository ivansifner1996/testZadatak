import React, {useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useStateValue } from './components/StateProvider/StateProvider';
import './App.css';
import { auth } from './firebase';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Promo from './components/Promo/Promo';
import Login from './components/Login/Login';

function App() {
  const [{user, cart}, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        console.log(`authUser ti iznosi ${authUser}`);
        sessionStorage.setItem("isAuthenticated", JSON.stringify(authUser));
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        sessionStorage.removeItem("isAuthenticated");
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])
  return (
    <Router>
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/checkout">
            <Checkout/>
          </Route>
            
          <Route exact path="/login">
            <Login/>
            </Route>
           
        <Route path="/promocode">
          <Promo/>
          </Route>
          
        <Route path="/">
          <Home/>
          </Route>
          
      </Switch>
    </div>
    </Router>
  );
}

export default App;
