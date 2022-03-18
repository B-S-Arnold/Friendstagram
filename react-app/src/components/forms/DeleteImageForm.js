// import { deleteImage } from '../../store/images';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const DeleteImageForm = ({setRenderModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { username } = useParams();
    // const dev = useSelector((state) => state.developers[id])
    // HOW TO GET IMAGE? THROUGH PROPS... OR USE SELECTOR?
    let image
    const handleDelete = async (e) => {
        e.preventDefault();

        // dispatch(deleteImage(image))
        //     .then(() => {
        //         history.push(`/${username}`)
        //     })
    }

    const handleClose = (e) => {
        setRenderModal(false);
        
    }
    return (
        <div>
            <p>Are you sure you want to delete this post?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleClose}>No</button>
        </div>
    )
}

export default DeleteImageForm