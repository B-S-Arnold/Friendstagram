import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFollow } from '../../store/follows';



const FollowForm = ({ user, followCSS, followDivCSS }) => {

    // const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);


    const dispatch = useDispatch();

    const followedId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newFollow = await dispatch(createFollow(followedId));

        if (newFollow?.errors) return setErrors(newFollow.errors)
        if (newFollow) {
            // setContent('')
            setErrors([])
        }

    }

    //Comment errors




    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='button'>
                    <button className={followCSS} type='submit' >Follow</button>
                </div>
            </form>
            <div className='errors'>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}

            </div>
        </>
    )
}


export default FollowForm;