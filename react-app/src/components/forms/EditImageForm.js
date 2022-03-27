import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateImage } from '../../store/images'


const EditImageForm = ({image, setRenderModal, renderOptionsModal}) => {

    const user = useSelector(state => state.session.user);

    const id = image.id
    // const picture = image.picture

    const [picture, setPicture] = useState(image?.picture);
    const [caption, setCaption] = useState(image?.caption);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    // const history = useHistory()

    // const userId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        let editedImage = await dispatch(updateImage( id, picture, caption ));

        if (editedImage?.errors) return setErrors(editedImage.errors)
        if (editedImage) {
            setRenderModal(false)
            renderOptionsModal(false)
        }
    }

    //IMG ERRORS

    //CHECK IMAGE ONERROR

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

    // HTTPS:// CHECK

    if (!picture?.match(/^https?:\/\//) && !errors?.includes('Image must come from valid web address.')) {
        errors.push('Image must come from valid web address.')
        setErrors(errors)
    }

    if (picture?.match(/^https?:\/\//) && errors?.includes('Image must come from valid web address.')) {
        setErrors(errors.splice(1, 0, 'Image must come from valid web address.'))
    }

    // IMG FILE TYPE CHECK

    if (!picture?.match(/\.(jpe?g|gif|png|bmp)$/) && !errors?.includes('Image must have a valid file extension.')) {
        errors.push('Image must have a valid file extension.')
        setErrors(errors)
    }

    if (picture?.match(/\.(jpe?g|gif|png|bmp)$/) && errors?.includes('Image must have a valid file extension.')) {
        setErrors(errors.splice(1, 0, 'Image must have a valid file extension.'))
    }



    return (
        <form className='image-form'onSubmit={handleSubmit}>
            <div className='instruct'>
                <div>Change your picture by using another picture's url image address.</div>
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
                    onChange={(e) => setPicture(e.target.value)}
                />
            </div>
            <div>
                <div className='instruct'>Image Preview</div>
                <div>
                        <img
                        
                            className='imgFormImg'
                            src={picture}
                            alt="pic"
                            id='pic'
                            onError={e => {
                                e.onerror = null
                                e.target.src = require('../../images/not-found.jpeg').default

                        }}
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
            <button className='btn' type='submit' disabled={errors.length > 0}>Submit</button>
        </form>
    )
}


export default EditImageForm;