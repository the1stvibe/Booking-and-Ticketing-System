import React from 'react';

export default React.createContext({
    token: null,
    role: null,
    userId: null,
    login: (token, userId, tokenExpiration, role) => {},
    logout: () => {}
});