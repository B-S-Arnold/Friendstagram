import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import UsersList from './Home';
import DemoUser from './auth/DemoUser';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import './LoginSignup.css'

const SplashPage = ({user}) => {
    
    if (user) {
        return <UsersList />;
    }


    return (
    <div className='divContainer'>
        <div className='loginContainer'>
            <div className='title'>
                Friendstagram
            </div>
            <div>
                <LoginForm />
            </div>
            <div className='orLineContainer'>
                <hr />
                <div className='orWord'>
                    OR
                </div>
                <hr />
            </div>
            <div>
                <DemoUser />
            </div>
        </div>
        <div className='redirContainer'>
            <div>
                Don't have an account?
                    <NavLink to='/sign-up' exact={true} className='link' activeClassName='active'>
                    Sign up
                </NavLink>
            </div>
        </div>
    </div>
    
    )
    
};

export default SplashPage;