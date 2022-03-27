import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { createImage } from '../../store/images'


const AddImageForm = ({setRenderModal}) => {

    // const user = useSelector(state => state.session.user);
    
    const [picture, setPicture] = useState('');
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();


    const handleSubmit = async (e) => {

        e.preventDefault();
        
        let newImage = await dispatch(createImage(picture, caption));
        
        if (newImage?.errors) return setErrors(newImage.errors)
        if (newImage) {
            setRenderModal(false)
        }
    }
    
    // ERRORS FOR IMAGES

    // useEffect(() => {

    const thisUrl = new Image();
    thisUrl.onload = () => {

        if (errors?.includes('Image address not found.')) {
            setErrors(errors.splice(1, 0, 'Image address not found.'))
            
        }
    };
    thisUrl.onerror = () => {

        if (!errors?.includes('Image address not found.')) {
            errors.push('Image address not found.')
            setErrors(errors)
            // setPicture('../../images/not-found.jpeg')
        }
    };
    thisUrl.src = picture;
    
    // }, [picture]);

    // HTTPS:// CHECK

    if (!picture?.match(/^https?:\/\//) && !errors?.includes('Image must come from valid web address.')){
        errors.push('Image must come from valid web address.')
        setErrors(errors)
    }

    if (picture?.match(/^https?:\/\//) && errors?.includes('Image must come from valid web address.')){
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
        <form className='image-form' onSubmit={handleSubmit}>
            <div className='instruct'>
                <div>Add a picture from its url image address.</div>
                <div>
                </div>
                <div>This can be done by right clicking an image</div>
                <div>and copying the image address.</div>
                {/* <div>The picture should render on this page.</div> */}
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
                    // onerror={"this.onerror=null; this.src='../../images/default.png'"}
                    alt='not found'
                    onChange={(e) => {
                        
                        setPicture(e.target.value)
                    }}
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
            <button className='btn'type='submit' disabled={errors.length > 0}>Submit</button>
            
        </form>
    )
}


export default AddImageForm;