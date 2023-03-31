import { useDispatch } from 'react-redux';
import { deleteLike } from '../../store/likes';
import '../Overflow.css'

const UnlikeForm = ({ like }) => {
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteLike(like))
    }

   
    return (
        <>
        <div className='imgcom'>
            <button className='unlikebtn' onClick={handleDelete} />
        </div>      
        <div className='errors' />
        </>
       
    )
}

export default UnlikeForm