import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { $CombinedState } from 'redux';
import { createImage } from '../../store/images'


const AddImageForm = () => {

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
    
    // ERRORS FOR IMAGES

    // useEffect(() => {
        


            const thisUrl = new Image();
            thisUrl.onload = () => {

                if (errors?.includes('Image address not found')) {
                    setErrors(errors.splice(1, 0, 'Image address not found'))

                }
            };
            thisUrl.onerror = () => {

                if (!errors?.includes('Image address not found')) {
                    errors.push('Image address not found')
                    setErrors(errors)
                }
            };
            thisUrl.src = picture;
       
    
    // }, [errors, setErrors, picture, setPicture]);


    return (
        <form className='image-form' onSubmit={handleSubmit}>
            <div className='instruct'>
                <div>Add a picture from its url image address.</div>
                <div>This can be done by right clicking an image</div>
                <div>and copying the image address.</div>
                <div>The picture should render on this page.</div>
            </div>
            <div>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
            </div>
            
            <div>
                <input
                    className='urlInput'
                    type='text'
                    placeholder='Add a picture...'
                    name='picture'
                    value={picture}
                    onChange={(e) => {
                        
                        setPicture(e.target.value)
                    }}
                />
            </div>
            <div>
                <div className='instruct'>Image Preview</div>
                <div>
                    {/* RENDER IMAGE */}
                    <img
                        className='imgFormImg'
                        src={picture}
                        alt="pic"
                        id='pic'
                    />
                    
                </div>
            </div>
            
            <div>
                
                <textarea
                    className='caption'
                    name='caption'
                    placeholder='Add a caption to your post...'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />
                
            </div>
            <button className='btn'type='submit' disabled={errors.length > 0}>Submit</button>
            
        </form>
    )
}


export default AddImageForm;