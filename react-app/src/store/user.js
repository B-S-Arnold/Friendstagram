const EDIT_USER = 'user/EDIT_USER'
const LOAD_USERS = 'user/LOAD_USERS'
const LOAD_ONE = 'user/LOAD_ONE'

const editUser = (user) => ({
  type: EDIT_USER,
  user
})

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

const loadOne = (user) => ({
    type: LOAD_ONE,
    user
})

export const readUsers = () => async (dispatch) => {
    const response = await fetch(`/api/users/`, {
        method: "GET",
    });
    const data = await response.json();
    const { users } = data
    dispatch(loadUsers(users));
    return data;
};

export const readOne = (username) => async (dispatch) => {
    const response = await fetch(`/api/users/${username}`, {
        method: "GET",
    });
    const data = await response.json();
    const { user } = data
    dispatch(loadOne(user));
    return data;
};



export const updateUser = (id, fullName, username, bio, email) => async dispatch => {
  const response = await fetch(`/api/users/edit/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        fullName,
        username,
        bio,
        email
     })
  });
  if (response.ok) {
    const editedUser = await response.json()
    if (editedUser?.errors) return editedUser
    dispatch(editUser(editedUser))
    return editedUser
  }
}

const initialState = {}

const userReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case LOAD_USERS:
            action.users.forEach(user => {
                newState[user.id] = user;
            })
            return newState
        case LOAD_ONE:
            newState[action.user.id] = action.user;
            return newState;
        case EDIT_USER:
            newState[action.user.id] = action.user;
            return newState

        default:
            return state;
    }

}

export default userReducer