import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { logout } from "../store/session";

const Dropdown = () => {

    const user = useSelector(state => state.session.user)
    const history = useHistory()

    const LogoutButton = () => {
        const dispatch = useDispatch()
        const onLogout = async (e) => {
            await dispatch(logout());
        };

        return <div className='dropdownbtn logoutbtn' onClick={onLogout}>Logout</div>;
    };

    const ProfileButton = () => {

        const toProfile = () => {
            history.push(`/${user.username}`);
        }

        return <div className='dropdownbtn profbtn' onClick={toProfile}>Profile</div>
        // return <NavLink to={`/${user.username}`} exact={true} activeClassName='active'>
        //     Profile
        // </NavLink>
    };


    return (
        <>
            <div className="dropdown">
            
            <div>
                <ProfileButton />

                {/* <NavLink className='dropdownbtn' to={`/${user.username}`} exact={true} activeClassName='active'>
                    Profile
                </NavLink> */}
            </div>
            <div>
                <LogoutButton  />
            </div>
        </div>
                </>
    )}

export default Dropdown;