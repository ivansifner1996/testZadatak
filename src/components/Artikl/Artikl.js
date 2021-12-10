import React, {useEffect} from "react";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import './Artikl.css';
import { useStateValue } from '../StateProvider/StateProvider';
import firebaseService from "../../backend/firebaseService";

const Artikl = ({id, name, price, quantity, pic}) => {
    const [{ cart}, dispatch] = useStateValue();

    useEffect(() => {
      console.log(`id ti iznosi ${id}, a ime ${name}`);
    }, [id])
    const product = {
        id : id,
        name: name,
        price : price,
        quantity: 1,
        }

    function IncrementCartItems (){
        console.log(`product koji zelis poslat je ${product.name}`);        
        dispatch({
        type: 'ADD_TO_CART',
        item : product,
        })
        
    }

    const addToCart = () => {
    console.log(`user kod umetanja je `);
    /*
    user ? firebaseService.putItemInCartByUser(product, user)
      .then(IncrementCartItems()) :
    IncrementCartItems();
    */
  };
    return (
        <div className="artiklComponent">
      <img src={pic} alt="Nike Metcon 6" />
      <div className="artiklComponent1">
        <span>{name}</span>
      </div>
      <div className="artiklPrice">
        <span className="cijena">Cijena: <span className="price">${price}</span></span>
        <span className="kolicina">Kolicina: <span className="quantity">{quantity}</span></span>
      </div>
      <div className="dodajArtikl" onClick={IncrementCartItems} >
        <div className="kosarica">
          <span>Dodaj u kosaricu</span>
          <ShoppingCartRoundedIcon />
        </div>
      </div>
    </div>
    )
}

export default Artikl
