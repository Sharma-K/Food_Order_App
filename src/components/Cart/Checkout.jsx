import classes from './Checkout.module.css';
import React, {useRef, useState} from 'react';

const isEmpty = value => value.trim()==='';

const isFiveChars = value => value.trim().length === 5;


const Checkout = (props) => {

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const NameRef = useRef('');
    const StreetRef = useRef('');
    const PostalRef = useRef('');
    const CityRef = useRef('');


  const confirmHandler = (event) => {
    event.preventDefault();

    const name = NameRef.current.value;
    const street = StreetRef.current.value;
    const postal = PostalRef.current.value;
    const city = CityRef.current.value;

    console.log(postal);

    const nameValid = !isEmpty(name);
    const streetValid = !isEmpty(street);
    const cityValid = !isEmpty(city);
    const postalValid = isFiveChars(postal);

    

    setFormValidity({
        name: nameValid,
        street: streetValid,
        city: cityValid,
        postalCode: postalValid
    })

    const formValid = nameValid && streetValid && cityValid && postalValid;

    if(!formValid)
    {
       return;
    }

props.onConfirm({
  name:name,
  street:street,
  postal:postal,
  city:city
})
    
  };

  const nameControlClasses = `${classes.control} ${formValidity.name?'' :classes.invalid}`
  const streetControlClasses = `${classes.control} ${formValidity.street?'' :classes.invalid}`
  const postalControlClasses = `${classes.control} ${formValidity.postalCode?'' :classes.invalid}`
  const cityControlClasses = `${classes.control} ${formValidity.city?'' :classes.invalid}`
 
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <div>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={NameRef} />
        {!formValidity.name && <p>Enter a valid name</p> }
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={StreetRef} />
        {!formValidity.name && <p>Enter a valid street</p> }
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={PostalRef} />
        {!formValidity.name && <p>Enter a valid postal code</p> }
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={CityRef} />
        {!formValidity.name && <p>Enter a valid city</p> }
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
      </div>
    </form>
  );
};

export default Checkout;