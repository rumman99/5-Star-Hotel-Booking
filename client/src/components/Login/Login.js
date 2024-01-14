import React, { useContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase_auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const app = initializeApp(firebaseConfig);
const Login = () => {
    const [userInfo, setUserInfo]= useContext(userContext);
    const [logInUser, setLogInUser]= useState({});

    const history= useHistory();
    const location= useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    const handleGoogleAuth=()=>{

        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
        // The signed-in user info.
        const {displayName, email} = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        const userNameEmail= {name:displayName, email};
        setLogInUser(result.user);
        setUserInfo(userNameEmail);
        console.log(result.user);
        history.replace(from);

        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        });
        }

    return (
        <div>
            <h1>This is Login</h1>
            <input onClick={handleGoogleAuth} type="button" value='Login' />
            {logInUser.email && <h1>Welcome {logInUser.displayName} in Our Hotel</h1>}
        </div>
    );
};

export default Login;