import React, { Component } from 'react';

import AdminBookingsPage from '../components/Bookings/BookingList/AdminBookingPage';
import './Events.css';

class AdminPage extends Component {
    render() {
        return (
            <React.Fragment>
                <AdminBookingsPage />
            </React.Fragment>
        );
    }
}

export default AdminPage;