import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import Chatbot from './pages/Chatbot';
import AuthContext from './context/auth-context';

import './App.css';
import AdminPage from './pages/AdminPage';
import AuthAdminPage from './pages/AuthAdmin';
import Analytics from './pages/Analytics';
import Overview from './pages/Overview'


class App extends Component {
  state = {
    token: null,
    userId: null,
    role: null
  };

  login = (token, userId, tokenExpiration, role) => {
    this.setState({ token: token, userId: userId, role: role });
  };

  logout = () => {
    this.setState({ token: null, userId: null, role: null });
  };


  render() {
    return (
      <div>

        <BrowserRouter>
          <React.Fragment>
            <AuthContext.Provider
              value={{
                token: this.state.token,
                userId: this.state.userId,
                role: this.state.role,
                login: this.login,
                logout: this.logout
              }}
            >
              <MainNavigation />
              <main className="main-content">
                <Switch>


                  {this.state.token && this.state.role !== 'admin' && <Redirect from="/" to="/events" exact />}
                  {this.state.token && this.state.role !== 'admin' && <Redirect from="/auth" to="/events" exact />}

                  {this.state.token && this.state.role === 'admin' && <Redirect from="/" to="/admin-bookings" exact />}
                  {this.state.token && this.state.role === 'admin' && <Redirect from="/auth" to="/admin-bookings" exact />}
                  {this.state.token && this.state.role === 'admin' && <Redirect from="/auth-admin" to="/admin-bookings" exact />}
                  {!this.state.token && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  {!this.state.token && (
                    <Route path="/auth-admin" component={AuthAdminPage} />
                  )}
                  {this.state.token && this.state.role === 'admin' && (
                    <Route path="/admin-bookings" component={AdminPage} />
                  )}
                  {this.state.token && (
                    <Route path="/overview" component={Overview} />
                  )}
                  <Route path="/events" component={EventsPage} />
                  {this.state.token && (
                    <Route path="/bookings" component={BookingsPage} />
                  )}
                  {this.state.token && (
                    <Route path="/chatbot" component={Chatbot} />
                  )}
                   {this.state.token && (
                    <Route path="/analytics" component={Analytics} />
                  )}



                  {!this.state.token && <Redirect to="/auth" exact />}
                </Switch>
              </main>
            </AuthContext.Provider>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
