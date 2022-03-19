import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createComment } from '../../store/comments';


const AddCommentForm = ({image}) => {

    const user = useSelector(state => state.session.user);

    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory()

    const imageId = image.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newComment = await dispatch(createComment(imageId, content));

        if (newComment?.errors) return setErrors(newComment.errors)
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>Add Comment</div>
            <div>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
            </div>
            <div>
                <label htmlFor='body'>Content</label>
                <textarea
                    className='content'
                    name='content'
                    placeholder='Add a comment...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type='submit' disabled={errors.length > 0}>Submit</button>
            </div>
        </form>
    )
}


export default AddCommentForm;