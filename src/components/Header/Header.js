import React, {useState} from "react";
import {Link} from 'react-router-dom';
import './Header.css';
import { useStateValue } from "../StateProvider/StateProvider";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { auth } from "../../firebase";
import { useHistory } from "react-router";

const Header = () => {
    const [{cart, numOfItems, user}, dispatch] = useStateValue();
    //const history = useHistory();
    const onLogin = () => {
    if(user) {
      auth.signOut();
      //history.push('/');
    }
  }
    return(
        <>
        <div className="header">
        <Link style={{textDecoration: 'none'}} to="/">
          <img className="header__logo" style={{width: '50px', marginLeft: '150px'}}src="https://www.downloadclipart.net/large/website-transparent-images-png.png"  alt="Eccomerce logo" />
        </Link> 
        <div className="header__nav">
          <Link style={{textDecoration: 'none'}} to="/">
            <span className="header__navItems">Home</span>
          </Link>
        </div>
        <div className="header__nav">
          <Link style={{textDecoration: 'none'}} to="/promocode">
            <span className="header__navItems">Promo kod</span>
          </Link>
        </div>
        <div className="header__navRight">
          <Link style={{textDecoration: 'none'}} to={!user && "/login"}>
            <div className="header__user" onClick={onLogin} >
              <span className="header__hello">Hello, <span className="header__mail">{user?.email}</span></span>
              <span className="header__navRightItems">{user ? 'Odjava' : 'Prijava/Registracija'}</span>
            </div>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/checkout">
            <ShoppingCartRoundedIcon className="header__cart" />
          </Link>
          <span className="header__cartItems">{cart?.length == 0 ? 0 : numOfItems}</span>

        </div>
      </div>
        </>
    )
}

export default Header;