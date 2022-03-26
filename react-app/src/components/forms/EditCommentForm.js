import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../../store/comments';
import '../Overflow.css'


const EditCommentForm = ({ comment, setRenderModal }) => {

    const id = comment.id
    const imageId = comment.imageId

    const [content, setContent] = useState(comment?.content);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let editedComment = await dispatch(updateComment(id, imageId, content));

        if (editedComment?.errors) return setErrors(editedComment.errors)
        if(editedComment){
            setRenderModal(false)
            setContent('')
        }
        
    }

    return (
        <form className='comeditform' onSubmit={handleSubmit}>

            <div>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
            </div>
            <div className='inputComDiv'>
                <label>Edit Your Comment:</label>
                <textarea
                    className='content-edit'
                    name='content'
                    placeholder='Edit your comment...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className='subEdCom' type='submit' disabled={errors.length > 0}>Submit</button>
            </div>
        </form>
    )
}


export default EditCommentForm;