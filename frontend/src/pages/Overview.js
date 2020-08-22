import React, { Component } from 'react';
import './Bookings.css';

import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import Overview from '../components/Bookings/BookingList/Overview';
import EventOverview from './EventOverview';

import Analytics from './Analytics';





class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
    outputType: 'list'
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date
               price
             }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  deleteBookingHandler = bookingId => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation CancelBooking($id: ID!) {
            cancelBooking(bookingId: $id) {
            _id
             title
            }
          }
        `,
      variables: {
        id: bookingId
      }
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

 

  render() {

    
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          
          <div>
           <div className="recentbookings">
               Recent Bookings
           </div>
              <Overview
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              />
           <div>
               <EventOverview/>
           </div>
          
           <div>
                <Analytics
                 bookings={this.state.bookings}/>
           </div>
         
          </div>
          
        </React.Fragment>
      );
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default BookingsPage;