const ADD_IMG = 'images/ADD_IMG'
const LOAD_IMG = 'images/LOAD_IMG'
const REM_IMG = 'images/REM_IMG'

// edit caption of image
const EDIT_CAP = 'images/EDIT_CAP'

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
    type: EDIT_CAP,
    image
})

//create image

export const createImage = (picture, caption) => async dispatch => {
    const response = await fetch(`/api/images/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {picture, caption} )
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



//update image



//image reducer
const initialState = {}

const imgReducer = (state = initialState, action) => {

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
        default:
            return state;
    }

}

export default imgReducer