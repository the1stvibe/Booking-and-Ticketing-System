import React from 'react';

const Analytics = (props) =>{
  const totalPrice = props.bookings.length > 0  ?props.bookings.reduce((prevState, currState)=>{
    return {event:{price: prevState.event.price + currState.event.price}};
  }): {event:{price:0}};
  console.log(totalPrice)
  return(
      <div>
              <p>
          The total Amount that has been spent by you is:
      </p>
      <li>
        
        {totalPrice.event.price }
      </li>
      </div>
    
    

     
   
  );
}
export default Analytics