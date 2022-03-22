import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../../store/comments';



const EditCommentForm = ({ comment }) => {

    const id = comment.id
    const imageId = comment.imageId

    const [content, setContent] = useState(comment?.content);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const thisComment = comment
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        let editedComment

        if (content === ''){

            editedComment = await dispatch(deleteComment(thisComment));
            
                
        } else {
            
            editedComment = await dispatch(updateComment(id, imageId, content));
        }
        

        if (editedComment?.errors) return setErrors(editedComment.errors)
        
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
            </div>
            <div>
                
                <textarea
                    className='content'
                    name='content'
                    placeholder='Edit your comment...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type='submit' disabled={errors.length > 0}>Submit</button>
            </div>
        </form>
    )
}


export default EditCommentForm;