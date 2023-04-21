import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLike } from '../../store/likes';



const LikeForm = ({ image }) => {


    const [errors, setErrors] = useState([]);


    const dispatch = useDispatch();

    const imageId = image.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newLike = await dispatch(createLike(imageId));

        if (newLike?.errors) return setErrors(newLike.errors)
        if (newLike) {

            setErrors([])
        }

    }

    //Comment errors




    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='imgcom'>
                    <button className='likebtn' type='submit' ></button>
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


export default LikeForm;