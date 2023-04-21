import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateImage } from '../../store/images'


const EditImageForm = ({ image, setRenderModal, renderOptionsModal }) => {


    const id = image.id



    const [caption, setCaption] = useState(image?.caption);
    const [errors, setErrors] = useState([]);
    const [caperrors, setcaperrors] = useState([]);


    const dispatch = useDispatch();




    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimCap = caption.trim()

        const formData = new FormData();
        formData.append("caption", trimCap)


        let editedImage = await dispatch(updateImage(id, trimCap));

        if (editedImage?.errors) return setErrors(editedImage.errors)
        if (editedImage) {
            setRenderModal(false)
            renderOptionsModal(false)

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

                { }
            </div>
            <div>
                {Object.entries(errors).map((error) => (
                    <div key={error[0]}>{error[1]}</div>
                ))}
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