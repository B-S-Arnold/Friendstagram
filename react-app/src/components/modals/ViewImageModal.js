import { Modal } from '../../context/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './ViewImage.css'
import DeleteCommentModal from './DeleteCommentModal';
import AddCommentForm from '../forms/AddCommentForm';
import OptionsModal from './OptionsModal';
import EditCommentModal from './EditCommentModal';
import { NavLink } from 'react-router-dom';
import LikeForm from '../forms/LikeForm';
import UnlikeForm from '../forms/UnlikeForm';



const ViewImageModal = ({ image, expand, users }) => {

    const [renderModal, setRenderModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user)

    const comments = Object.values(useSelector(state => state.comments))
    const likes = Object.values(useSelector(state => state.likes))
    const allLikes = likes.filter(like => like.imageId === image.id)
    const liked = allLikes?.filter(like => like.userId === sessionUser.id)
    const allComments = comments.filter(comment => comment.imageId === image.id)
    const optionsCSS = 'optionsVM'
    let eachComment
    let imgUser
    if (users.length) {
        imgUser = users?.filter(user => user.id === image.userId)[0]


        eachComment = allComments.map((comment) => {

            const commenter = users?.filter(user => user.id === comment.userId)[0]
            return (
                <div key={comment.id} >

                    { }

                    <div className='nameAndCapViewVM'>
                        <NavLink className='eachPicPP VMPP' to={`/${commenter?.username}`} >
                            {commenter?.url ? <>

                                <img
                                    className='eachPicPP2'
                                    src={commenter?.url}
                                    alt="new"

                                    onError={e => {
                                        e.onerror = null
                                        e.target.src = require('../../images/not-found.jpeg').default
                                    }}

                                />
                            </> : <></>}
                        </NavLink>
                        <div className='cap-com'>



                            <NavLink className='eachPicUN capcomun' to={`/${commenter?.username}`}>{commenter?.username}</NavLink>

                            {comment.content}

                            {sessionUser.id === comment.userId ? <>

                                <DeleteCommentModal comment={comment} />

                            </> : <></>}

                        </div>

                        { }
                        { }

                    </div>
                </div>
            )
        })
    }

    let thisDiv
    if (expand === true) {

        thisDiv = <div className='expandComments' onClick={() => setRenderModal(true)}>View all {eachComment?.length} comments</div>

    } else {

























        thisDiv = <button className='myImage' onClick={() => setRenderModal(true)} image={image}>
            <div>
                { }

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











    let classy = 'vmodal'

    return (
        <div className='vmodal'>

            {thisDiv}

            {renderModal ? (
                <Modal classy={classy} className='vmodal' onClose={() => setRenderModal(false)}>
                    { }
                    <div className='viewModal' onClose={() => setRenderModal(false)}>

                        <div className='picViewDiv'>
                            { }
                            <img
                                className='picViewPic'


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
                            <div className='innerviewtop'>

                                <div className='imgheadVM'>

                                    <NavLink className='eachPicPP VMPP' to={`/${imgUser?.username}`} >
                                        {imgUser?.url ? <>

                                            <img
                                                className='eachPicPP2'
                                                src={imgUser?.url}
                                                alt="new"

                                                onError={e => {
                                                    e.onerror = null
                                                    e.target.src = require('../../images/not-found.jpeg').default
                                                }}

                                            />
                                        </> : <></>}
                                    </NavLink>
                                    <NavLink className='eachPicUN' to={`/${imgUser?.username}`}>{imgUser?.username}</NavLink>
                                    { }

                                    <OptionsModal image={image} optionsCSS={optionsCSS} />


                                    { }
                                </div>
                                <div className='infoComments'>
                                    <div>{image.caption.length ? <>
                                        <div className='nameAndCapViewVM'>
                                            <NavLink className='eachPicPP VMPP' to={`/${imgUser?.username}`} >
                                                {imgUser?.url ? <>

                                                    <img
                                                        className='eachPicPP2'
                                                        src={imgUser?.url}
                                                        alt="new"

                                                        onError={e => {
                                                            e.onerror = null
                                                            e.target.src = require('../../images/not-found.jpeg').default
                                                        }}

                                                    />
                                                </> : <></>}
                                            </NavLink>
                                            <div>

                                                {image.caption ? <>

                                                    <div className='cap-comVM'>
                                                        <NavLink className='eachPicUN capcomun' to={`/${imgUser?.username}`}>{imgUser?.username}</NavLink>

                                                        {image.caption}</div>
                                                    { }
                                                </>
                                                    : <></>}
                                            </div>



                                        </div>
                                    </> : <></>}
                                        { }
                                    </div>
                                    <div className='viewCommentDiv'>

                                        {!eachComment?.length > 0 ? <>
                                            <div className="commentDiv">
                                            </div>
                                        </> :
                                            <><div className='EVCdiv'>{eachComment}</div> </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='innerview'>
                                <hr className='viewcommentline' />
                                {liked?.length > 0 ? <UnlikeForm like={liked[liked.length - 1]} /> : <LikeForm image={image} />}
                                { }
                                {allLikes?.length > 0 ?
                                    <div className='numlikes'>
                                        {allLikes?.length === 1 ? <>1 like</> : <>{allLikes.length} likes</>}
                                    </div>
                                    : <></>}
                                <hr className='viewcommentline' />
                                <AddCommentForm image={image} />
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