import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createImage } from '../../store/images'


const ImageForm = () => {

    const user = useSelector(state => state.session.user);
    
    const [picture, setPicture] = useState('');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory()

    // const userId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newImage = await dispatch(createImage(picture, caption));
        if (newImage?.errors) return setErrors(newImage.errors)
        if (newImage) {
            history.push(`/${user.username}`);
        }
    }

    return (
        <form className='add-image' onSubmit={handleSubmit}>
            <div>Add Image</div>
            <div>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
            </div>
            <div>
                <input
                    type='text'
                    placeholder='url'
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='body'>Caption</label>
                <textarea
                    className='caption'
                    name='body'
                    placeholder='Add a caption to your post...'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                <button disabled={errors.length > 0}>Submit</button>
            </div>
        </form>
    )
}


export default ImageForm;