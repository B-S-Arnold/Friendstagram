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
        <div className='imgcom'>
            <button className='unfollowbtn' onClick={handleDelete} />
        </div>

    )
}

export default UnfollowForm