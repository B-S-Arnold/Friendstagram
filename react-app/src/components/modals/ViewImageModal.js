import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './ViewImage.css'
import DeleteCommentModal from './DeleteCommentModal';
import AddCommentForm from '../forms/AddCommentForm';
import OptionsModal from './OptionsModal';
import EditCommentModal from './EditCommentModal';
import { NavLink } from 'react-router-dom';


const ViewImageModal = ({ image, expand, users }) => {
    const [renderModal, setRenderModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
    // const users = Object.values(useSelector(state => state.users))
    const comments = Object.values(useSelector(state => state.comments))

    const allComments = comments.filter(comment => comment.imageId === image.id)
    let eachComment
    let imgUser
    if (users.length) {
        imgUser = users?.filter(user => user.id === image.userId)[0]

        eachComment = allComments.map((comment) => {

            const commenter = users?.filter(user => user.id === comment.userId)[0]
            return (
                <div key={comment.id} >

                    {/* DISPLAY COMMENTS */}

                    <div className='nameAndCapView'>
                        <strong>{commenter.username}</strong>
                        <div className='cap-com'>{comment.content}</div>

                        {/* {comment.edited === true ?
                            <><div className='editedViewCom'>Edited</div></> : */}
                        {/* <> <div className='uneditedViewCom'></div></> */}
                        {/* } */}

                        {sessionUser.id === comment.userId ? <>

                            <div className='EDdiv'>
                                <EditCommentModal comment={comment} />
                                <DeleteCommentModal comment={comment} />
                            </div>

                        </> : <></>}
                    </div>
                </div>
            )
        })
    }

    let thisDiv
    if (expand === true) {

        thisDiv = <div className='expandComments' onClick={() => setRenderModal(true)}>View all {eachComment?.length} comments</div>

    } else {

        // TESTING

        // TESTING


        // if(image.url.width )
        // const width = image?.naturalWidth;
        // const height = image.url.clientHeight;

        // const thisImage =
        //                 <img
        //                     height='auto'
        //                     width='auto'
        //                     className='foto'
        //                     src={image.url}
        //                     alt="new"
        //                 />
        // console.log("HEIGHT", thisImage.clientHeight)

        // console.log('WIDTH', width)
        // Create dummy image to get real width and height
        // const default


        thisDiv = <button className='myImage' onClick={() => setRenderModal(true)} image={image}>
            <div>
                {/* RENDER IMAGE */}

                <img
                    className='foto'
                    src={image.url}
                    alt="new"

                    onError={e => {
                        e.onerror = null
                        e.target.src = require('../../images/not-found.jpeg').default
                    }}



                />

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

                        <div className='picViewDiv'>
                            {/* RENDER IMAGE */}
                            <img
                                className='picViewPic'
                                // height="293px"
                                // width="293px"
                                src={image.url}
                                id='thispic'
                                alt="new"
                                height='auto'
                                onError={e => {
                                    e.onerror = null
                                    e.target.src = require('../../images/not-found.jpeg').default
                                }}
                            />


                        </div>
                        <div className='infoView'>

                            <div className='imghead'>

                                <NavLink className='eachPicPP' to={`/${imgUser?.username}`} />
                                <NavLink className='eachPicUN' to={`/${imgUser?.username}`}>{imgUser?.username}</NavLink>
                                {sessionUser.id === image.userId ? <>
                                    {/* OPTIONS */}
                                    <OptionsModal image={image} />
                                    {/* <button className='viewImgOptions'/> */}

                                    {/* <EditImageModal image={image}/>
                                    <DeleteImageModal image={image}/> */}

                                </> : <></>}
                            </div>
                            <div className='infoComments'>
                                <div>
                                    {/* {image.edited === true ?
                                            <>
                                                <div className='homeCapDiv'>
                                                    <strong>{imgUser.username}</strong>
                                                    <div className='cap-com'>{image.caption}</div>
                                                    <div>Edited</div>
                                                <div className='EDdivfake' />
                                                </div>

                                            </> : */}
                                    <div>
                                        <div className='nameAndCapView'>
                                            <strong>{imgUser.username}</strong>
                                            <div className='cap-com'>{image.caption}</div>
                                        </div>
                                    </div>
                                    {/* } */}
                                </div>
                                <div className='viewCommentDiv'>

                                    {!eachComment?.length > 0 ? <>
                                        <div className="commentDiv">
                                            <div>No comments...</div>
                                            <div>Be the first to comment!</div>
                                        </div>
                                    </> :
                                        <><div className='EVCdiv'>{eachComment}</div> </>
                                    }
                                </div>
                            </div>
                            <hr className='commentline' />
                            <AddCommentForm image={image} />
                        </div>

                    </div>

                </Modal>
            ) : null
            }
        </div>
    )
};

export default ViewImageModal;