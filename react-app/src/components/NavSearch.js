import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const SearchBar = () => {
    const [params, setParams] = useState('')
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [focused, setFocused] = useState(false)
    const onFocus = () =>setFocused(true)

    const onBlur = () => setFocused(false)

        useEffect(() => {
            async function fetchData() {
                const response = await fetch('/api/users/');
                const responseData = await response.json();
                setUsers(responseData.users);
                
            }
            fetchData();
        }, []);


    function waitASec() {
        return new Promise(() => {
            setTimeout(() => {
                setFocused(false)
            }, 200)
        })
    }

    async function defocus() {
        await waitASec()
    }

    
    let allSearched = null
    if (params.length > 0 && params !== " ") {
        const searchedUsers = users.filter(user => user.username.includes(params) || user.email.includes(params) || user.fullName.includes(params))
        
        
        allSearched = searchedUsers.map((user) => {

            const toUser = () => {
                setParams('')
                navigate(`/${user.username}`)
            }

            return (
                <div className='dropname' key={user.id} onClick={toUser}>
                    {user?.url ? <>
                        <div >
                            <img
                                className='listpic'
                                src={user.url}
                                alt="new"

                                onError={e => {
                                    e.onerror = null
                                    e.target.src = require('../images/not-found.jpeg').default
                                }}

                            />
                        </div>
                    </> : <>
                        <div className='listpic' />
                    </>}
                    <div className='userAndFullDiv'><div className='usersearch'>{user.username}</div><div className='fullsearch'>{user.fullName}</div></div>
                </div>
            )

        })
    }
    



    return (
        <div className='searchdiv'>
            <input onFocus={onFocus} onBlur={defocus} autoComplete="off" type='text' className='search' name='search' value={params} placeholder='Search'  onChange={(e) => setParams(e.target.value)} />
            {/* <div className='searchtriangle' /> */}
            
            {allSearched?.length && focused ? <><div className='searchtriangle' /><div className='dropsearch'>{allSearched}</div></> :<></>}
        </div>
    )
}


export default SearchBar;