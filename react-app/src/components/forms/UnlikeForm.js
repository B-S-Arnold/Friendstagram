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
        
            <button className='unlikebtn' onClick={handleDelete} />      
       
    )
}

export default UnlikeForm