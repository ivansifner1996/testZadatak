import React from 'react';
import './OrderConfirmation.css';
import { useStateValue } from '../../StateProvider/StateProvider'
import {priceAfterDiscount} from '../../StateProvider/reducer'

const OrderConfirmation = ({modalShowed, handleModalShowed, naziv, totalPrice}) => {
    const [{cart, promotions, user}, dispatch] = useStateValue();

    return (
        <>
        
    <div id="mojModal" className={modalShowed ? 'modal-dialog' : 'hidden'}>
        <div class="modal-content">
            <div class="modal-body ">
                <div class="px-4 py-5">
                    <h5 class="text-uppercase">{user?.email}</h5>
                    <h4 class="mt-5 theme-color mb-5">Hvala vam na narudžbi</h4> <span class="theme-color">O kupnji</span>
                    <div class="mb-3">
                        <hr class="new1"/>
                    </div>
                    {
                        cart?.map((d, idx) => (
                            <div class="d-flex justify-content-between"> <span class="font-weight-bold">{d.name} <span> X {d.quantity}</span></span> <span class="text-muted">${d.price}</span> </div>
                        ))
                    }
                    <div class="d-flex justify-content-between mt-3"> <span class="font-weight-bold">Total</span> <span class="font-weight-bold theme-color">${priceAfterDiscount(cart, promotions).toFixed(2)}</span> </div>
                    <div class="text-center mt-5"> <button class="btn btn-primary" onClick={handleModalShowed}>Zatvori</button> </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default OrderConfirmation
