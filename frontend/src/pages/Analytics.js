import React, { Component } from 'react';

import Spinner from '../components/Spinner/Spinner';
import AuthContext from '../context/auth-context';
import AnalyticsList from '../components/Bookings/BookingList/AnalyticsList';
import AnalyticsPrice from '../components/Bookings/BookingList/AnalyticsPrice';
import './Events.css';


class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: [],
   
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


 

  render() {

    
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <div>
            <p className="recentbookings">Overall amount Spent</p>
          </div>
          <div className="analyticscs">
                <p >This is the Number of events  booked by you</p>
                <div className="special">
                <AnalyticsList 
                bookings={this.state.bookings}
               
              />
                </div>
              
             
          </div>

          <div className="analyticscr">
          <p>This is the Total Cost Accumulated</p>
          <AnalyticsPrice
                bookings={this.state.bookings}
               
              />
          </div>
        </React.Fragment>
      );
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default BookingsPage;