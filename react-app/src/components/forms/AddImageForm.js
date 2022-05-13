import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
// import { useDispatch} from 'react-redux';
// import { createImage } from '../../store/images'


const AddImageForm = ({ setRenderModal }) => {

    // const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea

        setImageLoading(true);
        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            setRenderModal(false);
        }
        else {
            setImageLoading(false);
            console.log("error")
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* <div className='instruct'>Image Preview</div>
                 <div>

                     <img
                         className='imgFormImg'
                         src={image}
                         alt="pic"
                         id='pic'
                         onError={e => {
                             e.onerror = null
                             e.target.src = require('../../images/not-found.jpeg').default

                         }}


                     />

                </div> */}
            <input
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}

//     // const user = useSelector(state => state.session.user);

//     const [url, seturl] = useState('');
//     const [caption, setCaption] = useState('');
//     const [errors, setErrors] = useState([]);
//     const [caperrors, setcaperrors] = useState([]);
//     const [urlerrors, seturlerrors] = useState([]);

//     const dispatch = useDispatch();


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         let newImage = await dispatch(createImage(url, caption));

//         if (newImage?.errors) return setErrors(newImage.errors)
//         if (newImage) {
//             setRenderModal(false)
//         }
//     }

//     // ERRORS FOR IMAGES

//     // useEffect(() => {

//     const thisUrl = new Image();
//     thisUrl.onload = () => {

//         if (urlerrors?.includes('*Image address not found.')) {
//             seturlerrors(urlerrors.splice(1, 0, '*Image address not found.'))

//         }
//     };
//     thisUrl.onerror = () => {

//         if (!urlerrors?.includes('*Image address not found.')) {
//             urlerrors.push('*Image address not found.')
//             seturlerrors(urlerrors)
//             // seturl('../../images/not-found.jpeg')
//         }
//     };
//     thisUrl.src = url;

//     // }, [url]);


//     // HTTPS:// CHECK

//     if (url?.length > 300 && !urlerrors?.includes('*URL cannot be longer than 300 characters')) {
//         urlerrors.push('*URL cannot be longer than 300 characters')
//         seturlerrors(urlerrors)
//     }

//     if (url?.length <= 300 && urlerrors?.includes('*URL cannot be longer than 300 characters')) {
//         seturlerrors(urlerrors.splice(1, 0, '*URL cannot be longer than 300 characters'))
//     }

//     if (url==='' && !urlerrors?.includes('*URL field is required.')) {
//         urlerrors.push('*URL field is required.')
//         seturlerrors(urlerrors)
//     }

//     if (!url?.match === '' && urlerrors?.includes('*URL field is required.')) {
//         seturlerrors(urlerrors.splice(1, 0, '*URL field is required.'))
//     }

//     if (!url?.match(/^https?:\/\//) && !urlerrors?.includes('*Image must come from valid web address.')){
//         urlerrors.push('*Image must come from valid web address.')
//         seturlerrors(urlerrors)
//     }

//     if (url?.match(/^https?:\/\//) && urlerrors?.includes('*Image must come from valid web address.')){
//         seturlerrors(urlerrors.splice(1, 0, '*Image must come from valid web address.'))
//     }

//     // IMG FILE TYPE CHECK

//     if (!url?.match(/\.(jpe?g|gif|png|bmp)$/) && !urlerrors?.includes('*Image address must end with a valid file extension.')) {
//         urlerrors.push('*Image address must end with a valid file extension.')
//         seturlerrors(urlerrors)
//     }

//     if (url?.match(/\.(jpe?g|gif|png|bmp)$/) && urlerrors?.includes('*Image address must end with a valid file extension.')) {
//         seturlerrors(urlerrors.splice(1, 0, '*Image address must end with a valid file extension.'))
//     }

//     if (caption?.length > 1000 && !caperrors?.includes('*Caption has a 1,000 character limit.')){
//         caperrors.push('*Caption has a 1,000 character limit.')
//         setcaperrors(caperrors)
//     }

//     if (caption?.length <= 1000 && caperrors?.includes('*Caption has a 1,000 character limit.')) {
//         setcaperrors(caperrors.splice(1, 0, '*Caption has a 1,000 character limit.'))
//     }




//     return (
//         <form className='image-form' onSubmit={handleSubmit}>
//             <div className='instruct'>
//                 <div>Add a url from its url image address.</div>
//                 <div>
//                 </div>
//                 <div>This can be done by right clicking an image</div>
//                 <div>and copying the image address.</div>
//                 {/* <div>The url should render on this page.</div> */}
//             </div>
//             <div className='errors'>
//                 {Object.entries(errors).map((error) => (
//                     <div key={error[0]}>{error[1]}</div>
//                 ))}
//             </div>

//             <div>
//                 <input
//                     className='urlInput'
//                     type='text'
//                     placeholder='Add a url...'
//                     name='url'
//                     value={url}
//                     // onerror={"this.onerror=null; this.src='../../images/default.png'"}
//                     alt='not found'
//                     onChange={(e) => {

//                         seturl(e.target.value)
//                     }}
//                 />
//             </div>
//             {urlerrors.length ? <div className='errors urlerrors'>
//                 {Object.entries(urlerrors).map((error) => (
//                     <div key={error[0]}>{error[1]}</div>
//                 ))}
//             </div> : <></>}

//             {/* <div>
//                 <div className='instruct'>Image Preview</div>
//                 <div>

//                     <img
//                         className='imgFormImg'
//                         src={url}
//                         alt="pic"
//                         id='pic'
//                         onError={e => {
//                             e.onerror = null
//                             e.target.src = require('../../images/not-found.jpeg').default

//                         }}


//                     />

//                 </div>
//             </div> */}

//             <div>

//                 <textarea
//                     className='caption'
//                     name='caption'
//                     placeholder='Add a caption to your post...'
//                     value={caption}
//                     onChange={(e) => setCaption(e.target.value)}
//                 />

//             </div>

//             {caperrors.length ? <div className='errors caperrors'>{Object.entries(caperrors).map((error) => (
//                 <div key={error[0]}>{error[1]}</div>
//             ))}
//             </div> : <></>}
//             <button className='btn'type='submit' disabled={caperrors.length > 0 || urlerrors.length > 0}>Submit</button>

//         </form>
//     )
// }


export default AddImageForm;