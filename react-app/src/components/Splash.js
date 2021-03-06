import React from 'react';
import { NavLink } from 'react-router-dom';
import UsersList from './Home';
import DemoUser from './auth/DemoUser';
import LoginForm from './auth/LoginForm';
import './LoginSignup.css'

const SplashPage = ({user}) => {
    
    if (user) {
        return <UsersList />;
    }


    return (
    <div className='divContainer'>
        <div className='spacer'/>
        <div className='contContainer'>
            <div className='phoneImg'/>
            <div>
                <div className='loginContainer'>
                    <div className='mainTitle'>
                        Friendstagram
                    </div>
                    <div>
                        <LoginForm />
                    </div>
                    <div className='orLineContainer'>
                        <hr className='loginline'/>
                        <div className='orWord'>
                            OR
                        </div>
                        <hr className='loginline'/>
                    </div>
                    <div>
                        <DemoUser />
                    </div>
                </div>
                <div className='redirContainer'>
                    <div className = 'switchdiv'>
                        Don't have an account?
                            <NavLink to='/sign-up' exact='true' className='link' >
                            Sign up
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    )
    
};

export default SplashPage;