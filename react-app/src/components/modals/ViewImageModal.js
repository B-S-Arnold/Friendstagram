import { Modal } from '../../context/Modal';
import { useState } from 'react';
import DeleteImageModal from './DeleteImageModal';
import { useSelector } from 'react-redux';
import EditImageForm from '../forms/EditImageForm';
import EditCommentForm from '../forms/EditCommentForm';
import DeleteCommentForm from '../forms/DeleteCommentForm';
import './ViewImage.css'
import DeleteCommentModal from './DeleteCommentModal';

const ViewImageModal = ({ image, expand, users }) => {
    const [renderModal, setRenderModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
    // const users = Object.values(useSelector(state => state.users))
    const comments = Object.values(useSelector(state => state.comments))


    const allComments = comments.filter(comment => comment.imageId === image.id)
    let eachComment
    let imgUser
    if (users.length){
        imgUser = users?.filter(user => user.id === image.userId)[0]

        eachComment = allComments.map((comment) => {
            
            const commenter = users?.filter(user => user.id === comment.userId)[0]
            return (
                <div key={comment.id}>

                    {/* DISPLAY COMMENTS */}

                    <div className= 'viewCommentDiv'>
                        <strong>{commenter.username}</strong> {comment.content}

                        {comment.edited === true ?
                            <><div className='editedViewCom'>Edited</div></> :
                            <> <div className='uneditedViewCom'></div></>
                        }

                        {sessionUser.id === comment.userId ? <>
                            <EditCommentForm comment={comment} />
                            <DeleteCommentModal comment={comment} />
                        </> : <></>}
                    </div>
                </div>
            )
        })
    }

    let thisDiv
    if (expand === true){

        thisDiv = <div className='expandComments' onClick={() => setRenderModal(true)}>View all {eachComment?.length} comments</div>

    } else {

        thisDiv = <button className='myImage' onClick={() => setRenderModal(true)} image={image}>
            <div>
                <h1> ID: {image.id} </h1>
                <h3> PIC: {image.picture}</h3>
            </div>



        </button >

    }
    // Make function so EDIT CAPTION BUTTON renders in place of CAPTION
    // Remeber to use pass IMAGE as props

    // const editCaptionBox = ({image}) => {
    //    return <EditImageForm image={image} />
    // }
    
    

    return (
        <div>
            
            {thisDiv}
            
            {renderModal ? (
                <Modal onClose={() => setRenderModal(false)}>
                    <div className='viewModal' onClose={() => setRenderModal(false)}>

                        <div className='picView'> {image.picture}</div>
                        <div className='infoView'>
                            
                            <div className='infoHead'>

                                {imgUser.username}
                                
                                {sessionUser.id === image.userId? <>
                                    {/* OPTIONS */}
                                    <EditImageForm image={image}/>
                                    <DeleteImageModal image={image}/>
                                
                                </>:<></>}
                            </div>
                            <div className='infoComments'>
                                    {image.edited === true ?
                                        <><div>Edited</div> <h3>{image.caption}</h3></> :
                                        <> <h3>{image.caption}</h3></>
                                    }
                                    {eachComment}
                            </div>
                        </div>
                    
                    </div>

                </Modal>
            ) : null
            }
        </div>
    )
};

export default ViewImageModal;