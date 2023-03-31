import { useDispatch } from 'react-redux';
import { deleteFollow } from '../../store/follows';
import '../Overflow.css'

const UnfollowForm = ({ follow }) => {
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteFollow(follow))
    }


    return (
        <>
        <div className='button'>
            <button className='btn' onClick={handleDelete}>Unfollow</button>
        </div>
        <div className='errors' />
                
        </>
        

    )
}

export default UnfollowForm