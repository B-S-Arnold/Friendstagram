import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../NavBar.css'
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const DropdownModal = ( ) => {
    const [renderModal, setRenderModal] = useState(false);
    const user = useSelector(state => state.session.user)

    return (
        <div >
            <button className='userbtn navbtn' onClick={() => setRenderModal(true)} />
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <div onClose={() => setRenderModal(false)}>
                        <div>
                            <NavLink to={`/${user.username}`} exact={true} activeClassName='active'>
                                Profile
                            </NavLink>
                        </div>
                        <div>
                            <LogoutButton />
                        </div>

                    </div>
                </Modal>
            ) : null
            }
        </div>
    )
};

export default DropdownModal;