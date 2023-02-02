import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    // added here for better IDE auto-completion
    onLogout: () => { },
    onLogin: (email, password) => { },
});

export const AuthContexProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoggedInInfo = localStorage.getItem('isLoggedIn');
        if (storedLoggedInInfo === '1') {
          setIsLoggedIn(true);
        }
    
      }, [])

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return (
    <AuthContext.Provider
        value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
        {props.children}
    </AuthContext.Provider>
    )
}

export default AuthContext;