import React from 'react';
import './Footer.css'

const Footer = () => {

    return (
        <footer className='footerContainer'>
            <div className='linkContainer'>
                    <a className ='personal' href='https://github.com/B-S-Arnold' >
                        GitHub
                    </a>           
                    <a className='personal' href='https://www.linkedin.com/in/bryan-arnold-882378215/' >
                        LinkedIn
                    </a>         
                    <a className='personal' href='https://www.appacademy.io/' >
                        App Academy
                    </a>
            </div>
            <div className='linkContainer'>
                <div className='personal'>
                    bryanscottarnold@gmail.com
                </div>
                <div className='personal'>
                    2022 Friendstagram from Bryan Arnold
                </div>
            </div>
        </footer>
    );
}
//   return <></>
// }

export default Footer;