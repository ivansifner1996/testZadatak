import { CardTravel } from '@material-ui/icons'
import React, {useEffect, useState} from 'react'
import { useStateValue } from '../StateProvider/StateProvider'
import './Checkout.css'
import TotalPrice from './TotalPrice/TotalPrice'
import SpecificArtikl from './SpecificArtikl/SpecificArtikl'
import CreditCard from './CreditCard/CreditCard'
import OrderConfirmation from './OrderConfirmation/OrderConfirmation'

const Checkout = () => {    
    const [{cart}, dispatch] = useStateValue();
    const [promo, setPromo] = useState({naziv : ''});
    const [isChecked, setIsChecked] = useState(false);
    const [modalShowed, setModalShowed] = useState(false);


    const handleCartPayment = () => {
        setIsChecked((isChecked) => !isChecked);
    }

    const handleModalShowed = () => {
        setModalShowed((modalShowed) => !modalShowed);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setPromo({...promo, naziv : value});
  };

  const sleep = (miliseconds) => {
      return new Promise(resolve => setTimeout(resolve, miliseconds));
  }

  const handleCartPaymentCheckout = () => {
      dispatch({type:'EMPTY_CART'});
      /*
      sleep(500).then(() => {
          setIsChecked((isChecked) => !isChecked);
      })
      */
      //setIsChecked((isChecked) => !isChecked);

  }

    const usePromo = (e) => {
        e.preventDefault();
        dispatch({
        type: 'ADD_PROMOTIONS',
        item : promo,
        })
        setPromo({naziv : ''})
    }

    const deletePromo = (e) => {
        e.preventDefault();
        dispatch({
            type : 'REMOVE_PROMOTION',
            item : promo,
        })
        setPromo({naziv : ''})
    }

    return (
        <div className="checkout">
            .
            <CreditCard isChecked={isChecked} handleCartPayment={handleCartPayment} handleCartPaymentCheckout={handleCartPaymentCheckout} handleModalShowed={handleModalShowed}/>
            <OrderConfirmation modalShowed={modalShowed} handleModalShowed={handleModalShowed}/>
            <div className="checkout__top">
                {cart?.length === 0 ?(
                    <div className="checkout__empty">
                        <span className="checkout__empty1">Vasa kosarica je prazna</span>
                        <span className="checkout__empty2">Nemate artikala u kosarici. Da biste kupili kliknit <strong>'Dodaj u kosaricu'</strong> pored artikla.</span>
                    </div>
                ): (
                    <div className="checkout__notEmpty">
                        <form class="form-inline">
                            <label id="icon" for="name">
                                <i className="fa fa-percent"></i>
                            </label>
                            <input type="text" name="name" id="name" placeholder="Unesi promo code ovdje" value={promo.naziv} required="" onChange={handleChange}></input>
                            <button style={{backgroundColor:'green'}} onClick={usePromo}className="buttonItem">Dodaj</button>
                            <button style={{backgroundColor:'red'}} onClick={deletePromo}className="buttonItem">Obriši</button>
                        </form>
                        <span>Vasa kosarica</span>
                        {
                            cart?.map((item) => (
                                <SpecificArtikl
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                    />
                            ))}
                    </div>
                )}
            </div>
            {cart?.length > 0 && (
                <div className="checkout__bottom">
                    <TotalPrice handleCartPayment={handleCartPayment} />
                </div>
            )}
        </div>
    );
}

export default Checkout
