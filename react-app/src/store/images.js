const ADD_IMG = 'images/ADD_IMG'
const LOAD_IMG = 'images/LOAD_IMG'
const REM_IMG = 'images/REM_IMG'
const EDIT_IMG = 'images/EDIT_IMG'

const addImage = (image) => ({
    type: ADD_IMG,
    image
})

const loadImages = (images) => ({
    type: LOAD_IMG,
    images
})

const removeImage = (image) => ({
    type: REM_IMG,
    image
})

const editCaption = (image) => ({
    type: EDIT_IMG,
    image
})

//create image

export const createImage = (picture, caption) => async dispatch => {
    const response = await fetch(`/api/images/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            picture,
            caption
            }),
    });
    
    const image = await response.json() 
    if (image?.errors) return image
    dispatch(addImage(image))
    return image
    

}

//read all images

export const readImages = () => async (dispatch) => {
    const response = await fetch(`/api/images/`, {
        method: "GET",
    });
    const data = await response.json();
    const { images } = data
    dispatch(loadImages(images));
    return data;
};

//destroy image

export const deleteImage = (image) => async dispatch => {
    const response = await fetch(`/api/images/${image.id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const deletedImage = await response.json();
        dispatch(removeImage(image))
        return deletedImage
    }

}

//update image

export const updateImage = (id, picture, caption) => async dispatch => {
    const response = await fetch(`/api/images/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ picture, caption })
    });
    if (response.ok) {
        const editedImage = await response.json()
        if (editedImage?.errors) return editedImage
        dispatch(editCaption(editedImage))
        return editedImage
    }
}



//image reducer
const initialState = {}

const imageReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        
        case LOAD_IMG:
            action.images.forEach(image => {
                newState[image.id] = image;
            })
            return newState
        case ADD_IMG:
            newState[action.image.id] = action.image;
            return newState
        case REM_IMG:
            delete newState[action.image.id]
            return newState
        case EDIT_IMG:
            newState[action.image.id] = action.image;
            return newState
        default:
            return state;
    }

}

export default imageReducer