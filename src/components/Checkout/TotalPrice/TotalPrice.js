import React, {useEffect} from 'react'
import './TotalPrice.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../StateProvider/StateProvider'
import {getCartTotal, priceAfterDiscount} from '../../StateProvider/reducer'
//import StripeCheckout from 'react-stripe-checkout';

const TotalPrice = ({handleCartPayment}) => {
    const [{cart, promotions, numOfItems}, dispatch] = useStateValue();

    useEffect(() => {
        console.log(`cart ti iznosi ${typeof(cart.price)}`);
    }, [])
    const handleToken = (token, addresses) => {
        console.log({token, addresses});
        alert("Greska u prepoznavanju tokena.")
    }

    return (
        <div className="totalPrice">
            <CurrencyFormat

                renderText={(value) => (
                    <>
                        <span className="totalPrice__items">Broj artikala u kosarici: <strong>{numOfItems}</strong></span>
                        <span className="totalPrice__total">Ukupna cijena artikala: <strong>{`${value}`}</strong></span>
                    </>
                )}

                decimalScale={2}
                value = {priceAfterDiscount(cart, promotions)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                />
                <div className="totalPrice__button">
                    <button onClick={handleCartPayment} style={{borderRadius: '20px', backgroundColor: 'green'}}>
                        Kupi artikle
                    </button>

                </div>
        </div>
    )
}

export default TotalPrice
