import React, {useEffect, useState, useRef} from 'react'
import './CreditCard.css'
import Form from "react-validation/build/form"
import Input from "react-validation/build/input";
import validator, {isEmail} from "validator"
import CheckButton from "react-validation/build/button"
import { useStateValue } from '../../StateProvider/StateProvider';

const CreditCard = ({isChecked, handleCartPayment, handleCartPaymentCheckout, handleModalShowed}) => {
   const [{cart}, dispatch] = useStateValue();
    let errorsLength = '';
    var form = useRef(null);
    var checkBtn = useRef(null);
    const [userInfo, setUserInfo] = useState({
      email : "",
      address: "",
      cardNum : "",
      expiry_month:"",
      expiry_year:"",
      CCV:""

    });

    const validateCreditCard = (value) => {
      if(!validator.isCreditCard(value)){
        return(
            <div className="errorDiv" role="alert">
                Broj kartice nije u validnom obliku
            </div>
        )
      }
    }


    const required = value => {
      if(!value){
        return (
          <div className="errorDiv" role="alert">
            Ovo polje je obavezno
          </div>
        );
      }
    }

    const email = value => {
      if(!isEmail(value)){
        return (
          <div className="alert alert-danger" role="alert">
            Email nije u validnom obliku
          </div>
        );
      }
    }

    function handleChange(e){
      const{name,value} = e.target;
      console.log(`name ti iznosi ${name}, a value ${value}`);
      setUserInfo({
        ...userInfo, [name] : value
      })
    }

    function removeSiblingElements(siblingElement){
      var parent = siblingElement.parentElement.parentElement;   
      var divErrors = parent.getElementsByClassName('alert alert-danger');    
      for(var i = divErrors.length-1; i > 0; i--){
        divErrors[i].remove();
      }
      
    }

    function checkExpirationDate(exYear, exMonth){
      try{
      removeSiblingElements(document.getElementsByName('selectionDates')[0]);
      var divElementExists = document.getElementById('kek')  
          if (!!divElementExists){
            divElementExists.parentNode.removeChild(divElementExists)
       }
      }catch(err){
        console.log("imas errror");
      }
      var today = new Date();
      var otherDay = new Date(exYear, exMonth);
      if(otherDay > today){
        console.log("nemas errora");
        return true;
      }
      return false;
    }

    function handleSubmition(e){
        let errors = [];
        e.preventDefault();
        if(!checkExpirationDate(userInfo.expiry_year, userInfo.expiry_month)){
          errors.push("Imas ovdje error")
          errorsLength = errors;
          var divErrors = document.getElementsByName('selectionDates')[0];
          var errorElement = document.createElement('div');
          errorElement.setAttribute("id", "kek");
          errorElement.classList.add('newWidth');
          errorElement.innerText = "Istekla vam je kartica"
          divErrors.appendChild(errorElement);
        }else{
          errorsLength = [];
        }
        console.log(userInfo);
        form.current.validateAll();
        console.log(`check button prije ${checkBtn.current.context._errors}`);
            if(checkBtn.current.context._errors.length === 0 && errorsLength.length === 0){
                console.log("mozet kupiti");
                handleCartPayment();
                handleModalShowed();
                
            }
    }

    useEffect(() => {
        console.log(`credit card isChecked iznosi ${isChecked}`);   
    })
    return (
        <div className={isChecked ? 'mid' : 'hidden'}>

<div class="row-fluid">
      <Form 
        onSubmit={handleSubmition}
        ref = {form}
        id="myForm"
        >
        <fieldset>
          <div id="legend">
            <legend class="">Payment</legend>
          </div>
     
          <div class="control-group">
            <label class="control-label"  for="email">Email</label>
            <div class="controls">
                <Input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className='newWidth'
                    value={userInfo.email}
                    onChange={handleChange}
                    validations = {[required, email]}
                />
            </div>
          </div>

          <div class="control-group">
            <label class="control-label"  for="address">Adresa</label>
            <div class="controls">
                    <Input
                        type="text"
                        name="address"
                        placeholder="Adresa"
                        className="newWidth"
                        onChange={handleChange}
                        value={userInfo.address}
                        validations= {[required]}
                    />            </div>
          </div>
     
          <div class="control-group">
            <label class="control-label" for="email">Card Number</label>
            <div class="controls">
                <Input
                    type="text"
                    placeholder="Card number"
                    className="newWidth"
                    name="cardNum"
                    value={userInfo.cardNum}
                    onChange={handleChange}
                    validations={[required, validateCreditCard]}
                />
            </div>
          </div>
     
          <div class="control-group" name="selectionDates">
            <label class="control-label" for="password">Card Expiry Date</label>
            <div class="controls">
              <select class="span3" onChange={handleChange} name="expiry_month" id="expiry_month">
                <option></option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select class="span2" onChange={handleChange} name="expiry_year">
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
     
          <div class="control-group">
            <label class="control-label"  for="password_confirm">Card CVV</label>
            <div class="controls">
              <input type="password" onChange={handleChange} id="password_confirm" name="CCV" placeholder="" value={userInfo.CCV} class="span2"/>
            </div>
          </div>
            <br/>
          <div class="control-group">
            <div class="controls">
              <input class="button" type="submit" value="Pay now"/>
            </div>
          </div>
            <div className="closeLoginWrapper">
                <i onClick={handleCartPayment} className="fa fa-remove closeForm"></i>
                </div>
        </fieldset>
        
        <CheckButton
             id = "checkbutton"
             style = {{display : 'none'}}
             ref = {checkBtn}
                />
      </Form>
    </div>
</div>
    )
}

export default CreditCard
