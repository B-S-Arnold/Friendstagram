import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const ChangeProfPicForm = ({ renderOptionsModal, user }) => {


    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',

    };

    const thumb = {
        display: 'inline-flex',

        width: 'fit-content',

        boxSizing: 'border-box'
    };

    const thumbInner = {
        className: 'dropimgdiv',
        display: 'flex',
        minWidth: 0,


    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };


    function Previews() {

        const [files, setFiles] = useState([]);
        const [imageLoading, setImageLoading] = useState(false);


        const handleSubmit = async (e) => {
            e.preventDefault();

            const formData = new FormData();

            formData.append("image", files[0]);


            setImageLoading(true);
            const res = await fetch(`/api/users/${user.id}`, {
                method: "PUT",
                body: formData
            });
            if (res.ok) {
                await res.json();
                setImageLoading(false);
                renderOptionsModal(false);
                window.location.reload();
            }
            else {
                setImageLoading(false);
                console.log("error")
            }
        }






        const { getRootProps, getInputProps } = useDropzone({
            accept: {
                'image/*': []
            },
            onDrop: acceptedFiles => {

                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));



            }
        });



        const thumbs = files.map(file =>

        (
            <div style={thumb} key={file.name}>
                <div className='dropimgdiv' style={thumbInner}>
                    <img
                        className='dropimg'
                        src={file.preview}
                        style={img}
                        alt="pic"


                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />

                </div>
            </div>
        ));



        useEffect(() => {



            return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        }, [files]);







        return (
            <section >
                {(imageLoading) ? <div className='loading'><div className='spinner' /><div>Loading...</div></div> : <form className="dropcontainer" onSubmit={handleSubmit}>

                    <div className='dropbox'>
                        <div className='droptext'>Add profile photo</div>
                        <button disabled={files.length === 0} className="submit" type="submit">Upload</button>

                    </div>


                    <div {...getRootProps({ className: 'dropzone' })}>
                        <div className='dropinstr'>
                            <div>Drag and drop image here</div>
                            <div>or click to select from computer</div>
                        </div>
                        <input className='dropinput' {...getInputProps()} />

                    </div>

                    <aside style={thumbsContainer}>
                        {thumbs}

                    </aside>


                </form>}

            </section>
        );
    }


    const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (
        <>

            <Previews />


        </>
    )
}


export default ChangeProfPicForm;