const ADD_COM = 'comments/ADD_COM'
const LOAD_COM = 'comments/LOAD_COM'
const REM_COM = 'comments/REM_COM'
const EDIT_COM = 'comments/EDIT_COM'

const addComment = (comment) => ({
    type: ADD_COM,
    comment
})

const loadComments = (comments) => ({
    type: LOAD_COM,
    comments
})

const removeComment = (comment) => ({
    type: REM_COM,
    comment
})

const editComment = (comment) => ({
    type: EDIT_COM,
    comment
})

export const createComment = (imageId, content) => async dispatch => {
    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            imageId,
            content
        }),
    });

    const comment = await response.json()
    if (comment?.errors) return comment
    dispatch(addComment(comment))
    return comment

}



export const readComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments/`, {
        method: "GET",
    });
    const data = await response.json();
    const { comments } = data
    dispatch(loadComments(comments));
    return data;
};


export const deleteComment = (comment) => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const deletedComment = await response.json();
        dispatch(removeComment(comment))
        return deletedComment
    }

}


export const updateComment = (id, imageId, content) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId, content })
    });
    if (response.ok) {
        const editedComment = await response.json()
        if (editedComment?.errors) return editedComment
        dispatch(editComment(editedComment))
        return editedComment
    }
}


const initialState = {}

const commentReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {

        case LOAD_COM:
            action.comments.forEach(comment => {
                newState[comment.id] = comment;
            })
            return newState
        case ADD_COM:
            newState[action.comment.id] = action.comment;
            return newState
        case REM_COM:
            delete newState[action.comment.id]
            return newState
        case EDIT_COM:
            newState[action.comment.id] = action.comment;
            return newState
        default:
            return state;
    }

}

export default commentReducer