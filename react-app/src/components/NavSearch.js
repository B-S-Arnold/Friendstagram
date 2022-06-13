import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const SearchBar = () => {
    const [params, setParams] = useState('')
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

        useEffect(() => {
            async function fetchData() {
                const response = await fetch('/api/users/');
                const responseData = await response.json();
                setUsers(responseData.users);
                
            }
            fetchData();
        }, []);


    // const handleChange = (e) => {
    //     // e.preventDefault();
    //     setParams(e)
        
    //     if (params.length > 0) {
    //         const searchedUsers = users.filter(user => user.username.includes(params))
    //         console.log(searchedUsers)
    //         // console.log(users.filter(params))
    //         // history.push(`/search/${params.trim()}`)
    //         // setParams('')
    //     }
    // }
    let allSearched = null
    if (params.length > 0 && params !== " ") {
        const searchedUsers = users.filter(user => user.username.includes(params) || user.email.includes(params) || user.fullName.includes(params))
        console.log(searchedUsers)
        // console.log(users.filter(params))
        // history.push(`/search/${params.trim()}`)
        // setParams('')
        
        allSearched = searchedUsers.map((user) => {

            const toUser = () => {
                navigate(`/${user.username}`)
            }

            return (
                <div className='dropname' key={user.id} onClick={toUser}>{user.username}</div>
            )

        })
    }
    



    return (
        <div className='searchdiv'>
            <input type='text' name='search' value={params} placeholder='Search'  onChange={(e) => setParams(e.target.value)} />
            
            <div className='dropsearch'>{allSearched}</div>
        </div>
    )
}


export default SearchBar;