import React from 'react'
import './SpecificArtikl.css'
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { useStateValue } from '../../StateProvider/StateProvider';

const SpecificArtikl = ({id, name, price, quantity}) => {
    const [{cart}, dispatch] = useStateValue();

    function reduceCartItems(){
        console.log(`id ti iznosi ${id}`)
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,
        });
    }


    return (
        <div className="shoeItem">
            <img src="https://chacon.com/10164-large_default/addition-wireless-camera.jpg" alt="shoe"/>
            <div className="shoeItem__right">
                <span className="shoeItem__title">{name}</span>
                <span className="shoeItem__price">Price: <span className="shoeItem_afterPrice">${price}</span></span>
                <span className="shoeItem__price">Kolicina: <span className="shoeItem_afterPrice">{quantity}</span></span>
                <div className="shoeItem__remove" onClick={reduceCartItems}>
                    <span className="shoeItem__click">Ukloni iz kosarice</span>
                    <ShoppingCartRoundedIcon/>
                </div>
            </div>
        </div>
    )
}

export default SpecificArtikl;
