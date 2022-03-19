import React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import AddImageModal from './modals/AddImageModal';
import LogoutButton from './auth/LogoutButton';
import './Footer.css'

const Footer = () => {

    return (
        <footer className='footerContainer'>
            <div className='linkContainer'>
                <div className='personal'>
                    <a href='https://github.com/B-S-Arnold' >
                        GitHub
                    </a>
                </div>
                <div className='personal'>
                    <a href='https://www.linkedin.com/in/bryan-arnold-882378215/' >
                        LinkedIn
                    </a>
                </div>
            </div>
            <div className='linkContainer'>
                <div className='personal'>
                    Friendstagram by Bryan Arnold
                </div>
                <div className='personal'>
                    bryanscottarnold@gmail.com
                </div>
            </div>
        </footer>
    );
}
//   return <></>
// }

export default Footer;