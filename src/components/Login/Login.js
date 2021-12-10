import React, {useState} from 'react'
import {auth} from '../../firebase'
import {useHistory} from 'react-router-dom';
import { useStateValue } from '../StateProvider/StateProvider';
import './Login.css'

const Login =() => {
    const [{cart}, dispatch] = useStateValue();
    const navigate = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginAccount = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                const user = auth.user.email;
                //addToCartIfExists(user);
                //emptyCart();
                navigate.push('/');
            })
            .catch(e => alert(e.message));
    }

    const createAccount = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                navigate.push('/');
            })
            .catch(e => alert(e.message));
    }
    return (
        <div className="login" style={{marginTop: '20px'}}>
           <div className="login__page">
               <div className="logo">
                    <img className="login__logo" 
                        src="https://www.kindpng.com/picc/m/366-3668689_transparent-shopping-cart-logo-hd-png-download.png"
                        alt="Ecommerce logo"/>
               </div>
               <span className="login__head1">Primajte novosti i ponude od webshop appa</span>
               <form>
                   <span className="login__email">Email adresa:</span>
                   <input 
                    value = {email}
                    className="login__input" 
                    type="email"
                    placeholder="Email" 
                    required
                    onChange={event => setEmail(event.target.value)}
                    />
                    <span className="login__password">Lozinka:</span>
                   <input
                   value = {password} 
                    className="login__input" 
                    type="password"
                    placeholder="Lozinka" 
                    required
                    onChange= {event => setPassword(event.target.value)}
                    />
                    <button 
                        className="login__button" 
                        type="submit"
                        onClick={loginAccount}>
                            Login
                     </button>
                    <span className="login__head2">
                        Prijavite se kako bi dobivali ponude od aplikacije i brandova
                        </span>
                    <button
                        className="login__button"
                        type="submit"
                        onClick={createAccount}
                    >
                        Kreiraj racun
                    </button>
                    <span className="login__head3">
                        Prilikom registracije slazete se da prihvacate
                        <span className="underlineHead3"> Privatnost podataka</span> i
                        <span className="underlineHead3"> uvjete koristenja</span></span>
               </form>
            </div> 
        </div>
    )
}

export default Login
