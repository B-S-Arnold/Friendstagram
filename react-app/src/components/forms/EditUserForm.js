import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { updateComment } from '../../store/comments';
import { updateUser } from '../../store/user';

import '../Overflow.css'


const EditUserForm = ({ user }) => {

    const id = user.id
    // const imageId = comment.imageId

    const [fullName, setFullName] = useState(user?.fullName);
    const [username, setUsername] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [bio, setBio] = useState(user?.bio);

    const [errors, setErrors] = useState([]);
    
    const [emailerrors, setemailerrors] = useState([])
    const [unerrors, setunerrors] = useState([])



    const dispatch = useDispatch();


    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updateBio = (e) => {
        setBio(e.target.value);
    };

    const updateFullName = (e) => {
        setFullName(e.target.value);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        let editedUser = await dispatch(updateUser(id, fullName, username, bio, email));

        if (editedUser?.errors) return setErrors(editedUser.errors)
        window.location.reload();

    }

    function validEmail() {
        const splitAtEmail = email.split('@')[email.split('@').length - 1]

        if (splitAtEmail) {
            const splitDotEmail = splitAtEmail.split('.')[splitAtEmail.split('.').length - 1]

            if (splitDotEmail) {

                return splitDotEmail.length >= 2;
            }
        }
    }

    if ((!email.includes('@') || !email.includes('.') || !validEmail()) && !emailerrors.includes('Email address must be valid.')) {
        emailerrors.push('Email address must be valid.')
        setemailerrors(emailerrors)
    }

    if (email.includes('@') && email.includes('.') && validEmail() && emailerrors.includes('Email address must be valid.')) {
        setemailerrors(emailerrors.splice(1, 0, 'Email address must be valid.'))
    }

    if ((email.length > 250) && !emailerrors.includes('Email address must be under 250 characters.')) {
        emailerrors.push('Email address must be under 250 characters.')
        setemailerrors(emailerrors)
    }

    if (email.length <= 250 && emailerrors.includes('Email address must be under 250 characters.')) {
        setemailerrors(emailerrors.splice(1, 0, 'Email address must be under 250 characters.'))
    }


    if (username.includes(' ') && !unerrors.includes('Username cannot have a space.')) {
        unerrors.push('Username cannot have a space.')
        setunerrors(unerrors)
    }
    if (!username.includes(' ') && unerrors.includes('Username cannot have a space.')) {
        setunerrors(unerrors.splice(1, 0, 'Username cannot have a space.'))
    }

    if (username.length > 30 && !unerrors.includes('Username cannot be over 30 characters')) {
        unerrors.push('Username cannot be over 30 characters')
        setunerrors(unerrors)
    }
    if (username.length <= 30 && unerrors.includes('Username cannot be over 30 characters')) {
        setunerrors(unerrors.splice(1, 0, 'Username cannot be over 30 characters'))
    }



    return (
        <form className='comeditform' onSubmit={handleSubmit}>
            <div className='settingsField'>
                <div className='inputField'>
                    <div className='errmss' />
                    <input
                        className='realInput'
                        placeholder='Full Name'
                        type='text'
                        name='fullName'
                        onChange={updateFullName}
                        value={fullName}
                    ></input>
                </div>
            </div>
            <div className='settingsField'>
                <div className='inputField'>
                    {unerrors?.length > 0 ? <div className='errmss'>
                        { }
                        <div key={0}>{unerrors[0]}</div>
                        { }
                    </div> : <div className='errmss' />}
                    <input
                        className='realInput'
                        placeholder='Username'
                        type='text'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                    ></input>
                </div>
            </div>
            <div className='settingsField'>
                <label>Bio:</label>
                <div className='inputBio'>
                    
                    <div className='errors'>
                        {Object.entries(errors).map((error) => (
                            <div key={error[0]}>{error[1]}</div>
                        ))}
                        {/* {Object.entries(comerrors).map((error) => (
                            <div key={error[0]}>{error[1]}</div>
                        ))} */}
                    </div>
                    
                    <textarea
                        className='bio-edit'
                        name='content'
                        placeholder='Edit your bio...'
                        value={bio}
                        onChange={updateBio}
                    />
                    
                </div>
            </div>
            <div className='settingsField'>
                <div className='inputField'>
                    {emailerrors?.length > 0 ? <div className='errmss' >
                        { }
                        <div key={0}>{emailerrors[0]}</div>
                        { }
                    </div> : <div className='errmss' />}
                    <input
                        className='realInput'
                        placeholder='Email'
                        type='email'
                        name='email'
                        onChange={updateEmail}
                        value={email}
                    >

                    </input>
                </div>
            </div>
            <button className='btn' disabled={emailerrors.length > 0 || unerrors.length > 0} type='submit'>Submit</button>

        </form>
    )
}


export default EditUserForm;