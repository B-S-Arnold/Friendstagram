import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../store/comments';



const AddCommentForm = ({image}) => {

    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);
    const [comerrors, setcomerrors] = useState([])


    const dispatch = useDispatch();

    const imageId = image.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimCon = content.trim()

        let newComment = await dispatch(createComment(imageId, trimCon));

        if (newComment?.errors) return setErrors(newComment.errors)
        if(newComment){
            setContent('')
            setErrors([])
        }
        
    }

    //Comment errors
    

    if (content?.length > 1000 && !comerrors?.includes('Comment length cannot excede 1,000 characters.')) {
        comerrors.push('Comment length cannot excede 1,000 characters.')
        setcomerrors(comerrors)
    }
    if (content?.length <= 1000 && comerrors?.includes('Comment length cannot excede 1,000 characters.')) {
        setcomerrors(comerrors.splice(1, 0, 'Comment length cannot excede 1,000 characters.'))
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className='imgcom'>
                <textarea
                    className='content'
                    name='content'
                    placeholder='Add a comment...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className='combtn'type='submit' disabled={content.length === 0 || comerrors.length > 0}>Post</button>
            </div>
        </form>
            <div className='errors'>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
                {Object.entries(comerrors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
            </div>
        </>
    )
}


export default AddCommentForm;