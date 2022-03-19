import { useDispatch } from 'react-redux';
import { deleteComment } from '../../store/comments';

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
        <div>
            <p>Are you sure you want to delete this comment?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleClose}>No</button>
        </div>
    )
}

export default DeleteCommentForm