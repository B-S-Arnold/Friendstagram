import React from 'react';
import { NavLink } from 'react-router-dom';
import UsersList from './UsersList';
import DemoUser from './auth/DemoUser';
import LoginForm from './auth/LoginForm';

const SplashPage = ({user}) => {
    
    if (user) {
        return <UsersList />;
    }


    return (
    <div>
        <div>
            <LoginForm />
        </div>
        <div>
            OR
        </div>
        <div>
        <DemoUser />
        </div>
        <div>
            Don't have an account?
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
            </NavLink>
        </div>
    </div>
    
    )
    
};

export default SplashPage;