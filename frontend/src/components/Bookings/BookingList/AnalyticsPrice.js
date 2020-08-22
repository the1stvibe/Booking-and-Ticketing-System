import React from 'react';

const Analytics = (props) =>{
  const totalPrice = props.bookings.length > 0  ?props.bookings.reduce((prevState, currState)=>{
    return {event:{price: prevState.event.price + currState.event.price}};
  }): {event:{price:0}};
  console.log(totalPrice)
  return(
    <div>
      <ul className='bookings_list'> 
      {
        props.bookings.map((booking) => {
          return(
            
            <li className='bookings_item_item-date'>
                {booking.event.name} - {booking.event.price}

            </li>
            
          );

        }
        )
        
      }
      
      <li>
        
        Total - {totalPrice.event.price }
      </li>

      </ul>
    </div>
  );
}
export default Analytics