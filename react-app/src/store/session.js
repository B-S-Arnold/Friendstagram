
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// const EDIT_BIO = 'session/EDIT_BIO'
// const EDIT_UN = 'session/EDIT_UN'
// const EDIT_FN = 'session/EDIT_FN'
// const EDIT_EMAIL = 'session/EDIT_EMAIL'
// const EDIT_PW = 'session/EDIT_PW'


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

// const editEmail = (user) => ({
//   type: EDIT_EMAIL,
//   user
// })

// const editFullName = (user) => ({
//   type: EDIT_FN,
//   user
// })

// const editUsername = (user) => ({
//   type: EDIT_UN,
//   user
// })

// const editPassword = (user) => ({
//   type: EDIT_PW,
//   user
// })

// const editBio = (user) => ({
//   type: EDIT_BIO,
//   user
// })

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, fullName) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      fullName
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

// export const updateBio = (id, bio) => async dispatch => {
//   const response = await fetch(`/api/bio/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ bio })
//   });
//   if (response.ok) {
//     const editedUser = await response.json()
//     if (editedUser?.errors) return editedUser
//     dispatch(editBio(editedUser))
//     return editedUser
//   }
// }

export default function reducer(state = initialState, action) {
  // let newState = { ...state }
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    // case EDIT_BIO:
    //   newState[action.user.id] = action.user;
    //   return newState
    default:
      return state;
  }
}

