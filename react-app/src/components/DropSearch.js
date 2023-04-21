import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"


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




        allSearched = searchedUsers.map((user) => {

            const toUser = () => {
                navigate(`/${user.username}`)
            }
            return (


                <div className='each' onClick={toUser} key={user.name}>{user.name}</div>

            )

        })
    }
























    return (
        <>
            { }

            <div >

                {allSearched}

            </div>
        </>
    )
}

export default DropSearch;