import React from 'react';
import QRCode from 'react-qr-code';

import './BookingList.css';

const bookingList = props => (
  <ul className="bookings__list">
    {props.bookings.map(booking => {
      return (
        
        <li key={booking._id} className="bookings__item">
          <div className="bookings__item-data">
            {booking.event.title} -{' '}
            {new Date(booking.createdAt).toLocaleDateString()} {' '}
      <QRCode size={100}value={JSON.stringify(booking)}/>

            


          </div>

          <div className="bookings__item-actions">
            <button className="btn" onClick={props.onDelete.bind(this, booking._id)}>{props.deleteText ?? 'Cancel'}</button>
          </div>
        </li>

      );
    })}
  </ul>
);

export default bookingList;