import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateComment } from '../../store/comments';
import { updateImage } from '../../store/images'


const EditCommentForm = ({ comment }) => {

    const user = useSelector(state => state.session.user);

    const id = comment.id
    const imageId = comment.imageId

    // const [picture, setPicture] = useState(image?.picture);
    const [content, setContent] = useState(comment?.content);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory()

    // const userId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        let editedImage = await dispatch(updateComment(id, imageId, content));

        if (editedImage?.errors) return setErrors(editedImage.errors)
        if (editedImage) {
            history.push(`/${user.username}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>

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


export default EditCommentForm;