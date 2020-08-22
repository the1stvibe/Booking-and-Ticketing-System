import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
  <AppBar >
    <Toolbar>
      <AuthContext.Consumer>
        {context => {
          return (
            <header className="main-navigation">
              <div className="main-navigation__logo">

              </div>
              <nav className="main-navigation__items">
                <ul>
                  <li>
                    <p id="eve">Event Ticketing System </p>
                  </li>
                  {
                    !context.token && (
                      <React.Fragment>
                        <li>
                          <NavLink to="/auth">Access</NavLink>
                        </li>
                       
                      </React.Fragment >
                    )}
                  {
                    context.token && context.role === 'admin' &&(
                      <React.Fragment>
                    <li>
                      <NavLink to="/admin-bookings">Bookings</NavLink>
                    </li>
                    <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                  </React.Fragment>
                  )}

                  {context.token && context.role !== 'admin' && (
                    <React.Fragment>
                      <li>
                        <NavLink to="/overview">CatchUp</NavLink>
                      </li>
                      <li>
                        <NavLink to="/events">Events</NavLink>
                      </li>
                      <li>
                        <NavLink to="/bookings">Bookings</NavLink>
                      </li>
                      <li>
                        <NavLink to="/chatbot">SpecialOffers</NavLink>
                      </li>
                     
                      <li>
                        <button onClick={context.logout}>Logout</button>
                      </li>
                    </React.Fragment>
                  )}
                </ul>
              </nav>
            </header>
          );
        }}
      </AuthContext.Consumer>
    </Toolbar>
  </AppBar>
);

export default mainNavigation;
