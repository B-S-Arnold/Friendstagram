import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
// import { logout } from "../store/session";

const DropSearch = (params) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);

        }
        fetchData();
    }, []);
    const navigate = useNavigate()

    let allSearched = null
    if (params.length > 0 && params !== " ") {
        const searchedUsers = users.filter(user => user.username.includes(params) || user.email.includes(params) || user.fullName.includes(params))
        // console.log(searchedUsers)
        // console.log(users.filter(params))
        // navigate.push(`/search/${params.trim()}`)
        // setParams('')
        allSearched = searchedUsers.map((user) => {
            // console.log(user.id)
            const toUser = () => {
                navigate(`/${user.username}`)
            }
            return (

                
                    <div className='each' onClick={toUser} key={user.name}>{user.name}</div>
                
            )

        })
    }



    // const ProfileButton = () => {

    //     const toProfile = () => {
    //         navigate.push(`/${user.username}`);
    //     }

    //     return <div className='dropdownbtn profbtn' onClick={toProfile}>Profile</div>
    //     // return <NavLink to={`/${user.username}`} exact={true} activeClassName='active'>
    //     //     Profile
    //     // </NavLink>
    // };

    // const SettingsButton = () => {
    //     const toSettings = () => {
    //         navigate(`/accounts/edit/`)
    //     }

    //     return <div className='dropdownbtn' onClick={toSettings}>Settings</div>
    // }


    return (
        <>
            {/* <div className='searchtriangle' /> */}
            
            <div >
                
                {allSearched}

            </div>
        </>
    )
}

export default DropSearch;