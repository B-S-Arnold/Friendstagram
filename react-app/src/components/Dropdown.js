import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../store/session";

const Dropdown = () => {

    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    const LogoutButton = () => {
        const dispatch = useDispatch()
        const onLogout = async (e) => {
            await dispatch(logout());

        };


        return <div className='dropdownbtn logoutbtn' onClick={onLogout}>Logout</div>;
    };

    const ProfileButton = () => {

        const toProfile = () => {
            navigate(`/${user.username}`);
        }

        return <div className='dropdownbtn profbtn' onClick={toProfile}>Profile</div>



    };

    const RevertButton = () => {
        const handleClick = async () => {
            const response = await fetch('/revert');
            const result = await response.text();
            window.location.reload()
            console.log(result);
        }

        return <div className='dropdownbtn' onClick={handleClick} >Revert Changes</div>
    }

    const SettingsButton = () => {
        const toSettings = () => {
            navigate(`/accounts/edit/`)
        }

        return <div className='dropdownbtn' onClick={toSettings}>Settings</div>
    }










    return (
        <>
            <div className='triangle' />
            <div className="dropdown">


                { }
                <ProfileButton />

                { }
                <div>
                    <SettingsButton />
                </div>
                <div>
                    <RevertButton />
                </div>
                { }
                { }
                { }
                <LogoutButton />
                { }
                { }
            </div>
        </>
    )
}

export default Dropdown;