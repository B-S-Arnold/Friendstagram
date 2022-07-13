const ADD_LIKE = 'likes/ADD_LIKE'
const LOAD_LIKES = 'likes/LOAD_LIKE'
const REM_LIKE = 'likes/REM_LIKE'


const addLike = (like) => ({
    type: ADD_LIKE,
    like
})

const loadLikes = (likes) => ({
    type: LOAD_LIKES,
    likes
})

const removeLike = (like) => ({
    type: REM_LIKE,
    like
})


//create like

export const createLike = (imageId) => async dispatch => {
    const response = await fetch(`/api/likes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageId
        }),
    });

    const like = await response.json()
    if (like?.errors) return like
    dispatch(addLike(like))
    return like

}

//read all likes

export const readLikes = () => async (dispatch) => {
    const response = await fetch(`/api/likes/`, {
        method: "GET",
    });
    const data = await response.json();
    const { likes } = data
    dispatch(loadLikes(likes));
    return data;
};

//destroy like

export const deleteLike = (like) => async dispatch => {
    const response = await fetch(`/api/likes/${like.id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const deletedLike = await response.json();
        dispatch(removeLike(like))
        return deletedLike
    }

}




//like reducer
const initialState = {}

const likeReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {

        case LOAD_LIKES:
            action.likes.forEach(like => {
                newState[like.id] = like;
            })
            return newState
        case ADD_LIKE:
            newState[action.like.id] = action.like;
            return newState
        case REM_LIKE:
            delete newState[action.like.id]
            return newState
        
        default:
            return state;
    }

}

export default likeReducer