export const initialState = {
  cart: [],
  promotions : [],
  user : null,
  numOfItems : 0
};

export const getCartTotal = (cart) =>
cart?.reduce((amount, item) => item.price + amount, 0);

export const priceAfterDiscount = (cart, promotions) => {
    let totalReturnedPrice = getCartTotal(cart);
    promotions.forEach(element => {
        switch(element){
        case "5%OFF":
            var reducedPrice = (totalReturnedPrice * 5) / 100;
            totalReturnedPrice -= reducedPrice;
            break;
        case "20EUROFF":
            totalReturnedPrice -= 20;
            break;
        case "20%OFF":
            var reducedPrice = (totalReturnedPrice * 20) / 100;
            totalReturnedPrice -= reducedPrice;
            break;
        }
    });
   return totalReturnedPrice;
}

const reducer = (state, action) => {
    console.log(action);
    console.log(`state ti iznosi ${JSON.stringify(state)}`);
    switch(action.type){
        case 'ADD_TO_CART':
            let specificIndex = state.cart.findIndex((obj) => obj.id === action.item.id);
            let numItems = state.numOfItems + 1;
            console.log(`num of items iznosi ${numItems}`);
            console.log(`specific item iznosi ${specificIndex}`);
            if(state.cart?.length == 0 && state.numOfItems > 0){
                numItems = 1;
            }
            if(specificIndex >= 0){
                return {
                    ...state,
                    numOfItems:numItems,
                    cart: state.cart.map((item, idx) =>
                        idx === specificIndex
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                            price : item.price + action.item.price
                        }
                        :item
                    ),
                };
            }
            return{
                ...state,
                numOfItems: numItems,
                cart : [...state.cart, action.item]
            };
        case 'REMOVE_FROM_CART':
            console.log(`action ID ti iznosi ${action.id}`);
            let newCart = [...state.cart];
            console.log(`kart ti iznose${JSON.stringify(state.cart)}`);
            const index = state.cart.findIndex((cartItem) => cartItem.id === action.id);
            let numItem = state.numOfItems - 1;
            if(index >= 0) {
                newCart.splice(index, 1);
            } 
            else {
                console.warn(
                `Ne mozes obrisati prozvod koji ima (id: ${action.id}) posto se ne nalazi u vasoj kosarici`
                );
            }
            return{
                ...state,
                numOfItems: numItem,
                cart : newCart,
            }
        case 'ADD_PROMOTIONS':
            const allowedPromotions = ["5%OFF", "20EUROFF", "20%OFF"];
            console.log(`promocije ti iznose${JSON.stringify(state.promotions)}`);
            if(allowedPromotions.includes(action.item.naziv)){
                if(action.item.naziv === "20%OFF" && state.promotions.length > 0){
                    console.warn(
                    `Ne mozes dodati ovu promociju zbog double dippa`
                );
                    return state;
                }else if(state.promotions.includes(action.item.naziv) || state.promotions.includes("20%OFF")){
                    console.warn(`Vec ste iskoristili ovu promociju`);
                    return state;
                }else{
                return{
                        ...state,
                        promotions : [...state.promotions, action.item.naziv]
                    }
                }
            }else{
                return state;
            }
        case 'REMOVE_PROMOTION':
            let newPromotion = [...state.promotions]
            console.log(`action item naziv iznosi ${action.item.naziv}`);
            const indexPromotion = state.promotions.indexOf(action.item.naziv);
            console.log(`promocije ti iznose${JSON.stringify(state.promotions)}`);
            console.log(`tip ti iznosi ${typeof(state.promotions)}`);
            if(indexPromotion >= 0) {
                newPromotion.splice(indexPromotion, 1);
            } 
            else {
                console.warn(
                `Ne mozes obrisati promociju koja ima naziv (${action.item.naziv}) posto je on vec specificiran`
                );
            }
            return{
                ...state,
                promotions : newPromotion,
            }
        case 'SET_USER':
            return {
                ...state,
                user : action.user
            }
        case 'EMPTY_CART':
            return{
                ...state,
                cart : [],
                quantity : 0
            }
        default :
            return state;
    }
}

export default reducer;