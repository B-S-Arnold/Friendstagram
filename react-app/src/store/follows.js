const ADD_FOLLOW = 'follows/ADD_FOLLOW'
const LOAD_FOLLOWS = 'follows/LOAD_FOLLOWS'
const REM_FOLLOW = 'follows/REM_FOLLOW'


const addFollow = (follow) => ({
    type: ADD_FOLLOW,
    follow
})

const loadFollows = (follows) => ({
    type: LOAD_FOLLOWS,
    follows
})

const removeFollow = (follow) => ({
    type: REM_FOLLOW,
    follow
})


export const createFollow = (followedId) => async dispatch => {
    const response = await fetch(`/api/follows/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            followedId
        }),
    });

    const follow = await response.json()
    if (follow?.errors) return follow
    dispatch(addFollow(follow))
    return follow

}



export const readFollows = () => async (dispatch) => {
    const response = await fetch(`/api/follows/`, {
        method: "GET",
    });
    const data = await response.json();
    const { follows } = data
    dispatch(loadFollows(follows));
    return data;
};


export const deleteFollow = (follow) => async dispatch => {
    const response = await fetch(`/api/follows/${follow.id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const deletedFollow = await response.json();
        dispatch(removeFollow(follow))
        return deletedFollow
    }

}




const initialState = {}

const followReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {

        case LOAD_FOLLOWS:
            action.follows.forEach(follow => {
                newState[follow.id] = follow;
            })
            return newState
        case ADD_FOLLOW:
            newState[action.follow.id] = action.follow;
            return newState
        case REM_FOLLOW:
            delete newState[action.follow.id]
            return newState

        default:
            return state;
    }

}

export default followReducer