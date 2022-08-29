import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


const ChangeProfilePicForm = ({ renderOptionsModal, user }) => {

    const [image, setImage] = useState(null);
    // const [caption, setCaption] = useState('');
    const [imageLoading, setImageLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append("caption", caption)
        formData.append("image", image);


        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea

        setImageLoading(true);
        const res = await fetch(`/api/users/${user.id}`, {
            method: "PUT",
            body: formData
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            renderOptionsModal(false);
            window.location.reload()
        }
        else {
            setImageLoading(false);
            console.log("error")
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        
    }
    const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (
        <>
            {(imageLoading) ? <div className='loading'><div className='spinner' /><div>Loading...</div></div> : <form onSubmit={handleSubmit}>


                <div style={styles}>
                    <label for='files'
                        className='choosefile'
                    >Click</label>
                    <input
                        
                        id='files'
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <button className='upload' type="submit">Submit</button>
                    
                </div>



               





            </form>}

        </>
    )
}





export default ChangeProfilePicForm;