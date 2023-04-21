import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateImage } from '../../store/images'


const EditImageForm = ({ image, setRenderModal, renderOptionsModal }) => {


    const id = image.id
    // const url = image.url

    // const [url, seturl] = useState(image?.url);
    const [caption, setCaption] = useState(image?.caption);
    const [errors, setErrors] = useState([]);
    const [caperrors, setcaperrors] = useState([]);
    // const [urlerrors, seturlerrors] = useState([]);

    const dispatch = useDispatch();
    // const history = useNavigate()

    // const userId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimCap = caption.trim()
        // if (trimCap === ' ') trimCap = ''
        const formData = new FormData();
        formData.append("caption", trimCap)
        

        let editedImage = await dispatch(updateImage(id, trimCap));
        
        if (editedImage?.errors) return setErrors(editedImage.errors)
        if (editedImage) {
            setRenderModal(false)
            renderOptionsModal(false)
            // window.location.reload()
        }
        
    }

  

    if (caption?.length > 1000 && !caperrors?.includes('Caption has a 1,000 character limit.')) {
        caperrors.push('Caption has a 1,000 character limit.')
        setcaperrors(caperrors)
    }

    if (caption?.length <= 1000 && caperrors?.includes('Caption has a 1,000 character limit.')) {
        setcaperrors(caperrors.splice(1, 0, 'Caption has a 1,000 character limit.'))
    }



    return (
        <form className='image-form' onSubmit={handleSubmit}>
            <div className='instruct'>
                <div>Caption</div>

                {/* <div>The url should render on this page.</div> */}
            </div>
            <div>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
            </div>
            {/* <div>
                <input
                    className='urlInput'
                    type='text'
                    placeholder='Add a url...'
                    name='url'
                    value={url}
                    onChange={(e) => seturl(e.target.value)}
                />
            </div> */}
            {/* {urlerrors.length ? <div className='errors urlerrors'>
                {Object.entries(urlerrors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
            </div> : <></>} */}
            {/* <div>
                <div className='instruct'>Image Preview</div>
                <div>
                        <img
                        
                            className='imgFormImg'
                            src={url}
                            alt="pic"
                            id='pic'
                            onError={e => {
                                e.onerror = null
                                e.target.src = require('../../images/not-found.jpeg').default

                        }}
                        />
                </div>
            </div> */}
            <div>
                <textarea
                    className='caption'
                    name='caption'
                    placeholder='Add a caption to your post...'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                />

            </div>
            {caperrors.length ? <div className='errors caperrors'>{Object.entries(caperrors).map((error) => (
                <div key={error[0]}>{error[1]}</div>
            ))}
            </div> : <></>}
            <div>
                <button className='editformbtn' type='submit' disabled={caperrors.length > 0}>Submit</button> <button className='editformbtn' type='submit' onClick={() => setCaption('')} >Delete</button>
            </div>
        </form>
    )
}

export default EditImageForm;