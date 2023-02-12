import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    const navigate = useNavigate()

    const GameButton = () => {
        const toGame = () => {
            navigate(`/game`)
        }

        return <div className='personal' onClick={toGame}>Game</div>
    }

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
                    {/* <GameButton /> */}
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