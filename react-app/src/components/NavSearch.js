import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DropSearch from './DropSearch';


const SearchBar = () => {
    const [params, setParams] = useState('')
    const history = useHistory();
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
            console.log(user.id)
            return (
                <>
                    <div className='spacer'/>
                    <div className='spacer' />
                    <div className='spacer' />
                    <div className='spacer' />
                    <div className='spacer' />
                    <div className='spacer' />

                    <div className='each' key={user.name}>{user.name}</div>
                </>
            )

        })
    }
    



    return (
        <div >
            <input type='text' name='search' value={params} placeholder='Search'  onChange={(e) => setParams(e.target.value)} />
            <DropSearch params={params}/>
        </div>
    )
}


export default SearchBar;