import React from 'react';
import {db, storage} from '../firebase';

const baza = db.ref('products');

class firebaseService {
    getAll = async() => {
        let products = [];
        await db.ref(`products`)
            .once("value")
            .then(function(snapshot) {
                snapshot.forEach(snap => {
                    const data = snap.val();
                    products.push({
                        id : data.id,
                        name : data.name,
                        price : data.price,
                        quantity : data.quantity,
                        pic : data.pic,
                    });                
                })
                
            })
            return products;
    }


    create = (product) => {
        console.log(`you're here and your product is ${JSON.stringify(product)}`);
        return baza.push(product);
    }
}

export default new firebaseService();