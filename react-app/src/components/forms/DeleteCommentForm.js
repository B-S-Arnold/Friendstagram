import { useDispatch } from 'react-redux';
import { deleteComment } from '../../store/comments';
import '../Overflow.css'

const DeleteCommentForm = ({ setRenderModal, comment }) => {
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
        e.preventDefault();

        dispatch(deleteComment(comment))
    }

    const handleClose = (e) => {
        setRenderModal(false);

    }
    return (
        <div className='delModal'>
            <div className='delBtn' onClick={handleDelete}>Delete</div>
            <div className='cancelBtn' onClick={handleClose}>Cancel</div>
        </div>
    )
}

export default DeleteCommentForm