import React, { useState, useEffect, useCallback } from 'react';



const ChangeProfPicForm = ({ renderOptionsModal, user }) => {

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
            {(imageLoading) ? <div className='loading'><div className='loadimg' /><div>Loading...</div></div> : <form onSubmit={handleSubmit}>


                <div style={styles}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <button type="submit">Submit</button>
                    {/* {(imageLoading) && <div className='loading'><div className='loadimg' /><div>Loading...</div></div>} */}
                    {/* <FileDrop
                        onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                        onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                        onFrameDrop={(event) => console.log('onFrameDrop', event)}
                        onDragOver={(event) => console.log('onDragOver', event)}
                        onDragLeave={(event) => console.log('onDragLeave', event)}

                        onDrop={(files, event) => {
                            console.log('OnDrop!', files, event)
                            const file = files[0];

                            console.log(file)
                            setImage(file)
                        }}
                    >

                        Drop some files here!
                    </FileDrop> */}
                </div>



                {/* <input
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />
                <button type="submit">Submit</button>
                {(imageLoading) && <p>Loading...</p>} */}

                {/* <div>

                 <textarea
                     className='caption'
                     name='caption'
                     placeholder='Write a caption...'
                     value={caption}
                     onChange={(e) => setCaption(e.target.value)}
                 />

             </div> */}





            </form>}

        </>
    )
}



export default ChangeProfPicForm;