import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import DemoUser from './DemoUser';
import '../LoginSignup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [emailerrors, setemailerrors] = useState([])
  const [passerrors, setpasserrors] = useState([])
  const [newpasserr, setnewpasserr] = useState([])
  const [allerrors, setallerrors] = useState([])
  const [unerrors, setunerrors] = useState([])
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();





  const onSignUp = async (e) => {
    e.preventDefault();

    
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, fullName));
      if (data) {
        setErrors(data)
      }
    }
    
  };

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

  //ERRORS

  //ALL FIELDS REQUIRED
  if ((!email || !username || !password || !fullName || !repeatPassword) && !allerrors.includes('All fields are required')) {
    allerrors.push('All fields are required')
    setallerrors(allerrors)
  }
  if ((email && username && password && fullName && repeatPassword) && allerrors.includes('All fields are required')) {
    setallerrors(allerrors.splice(1,0,'All fields are required'))
  }
  
  // PASSWORD ERRORS

  if (password !== repeatPassword && !newpasserr.includes('Password and Repeat Password must match.')) {
    newpasserr.push('Password and Repeat Password must match.')
    setnewpasserr(newpasserr)
  }
  if ((password.length < 8 || password.length > 25) && !passerrors.includes('Password must be between 8 and 25 characters.')) {
    passerrors.push('Password must be between 8 and 25 characters.')
    setpasserrors(passerrors)
  }
  
  if (password.length >= 8 && password.length <= 25 && passerrors.includes('Password must be between 8 and 25 characters.')) {
    setpasserrors(passerrors.splice(1, 0, 'Password must be between 8 and 25 characters.'))
  }
  
  if (password === repeatPassword && newpasserr.includes('Password and Repeat Password must match.')){
    setnewpasserr(newpasserr.splice(1,0,'Password and Repeat Password must match.'))
  }

  //EMAIL ERRORS
  function validEmail() {
    const splitAtEmail = email.split('@')[email.split('@').length-1]
    // console.log("split at email", splitAtEmail)
    if (splitAtEmail) {
      const splitDotEmail = splitAtEmail.split('.')[splitAtEmail.split('.').length-1]
      // console.log('split DOT EMAIL', splitDotEmail)
      if (splitDotEmail){
        // console.log('BOOLEAN', splitDotEmail.length > 2)
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


  const showPass = () => {
    const password = document.querySelector('#id_password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    const eye = document.querySelector('#id_eye')
    const classy = eye.getAttribute('class') === 'far fa-eye eye' ? 'far fa-eye-slash eye' : 'far fa-eye eye';
    eye.setAttribute('class', classy)
  }

  const showRPass = () => {
    const password = document.querySelector('#id_rpassword');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    const eye = document.querySelector('#id_reye')
    const classy = eye.getAttribute('class') === 'far fa-eye eye' ? 'far fa-eye-slash eye' : 'far fa-eye eye';
    eye.setAttribute('class', classy)
  }
  
  

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <div className='divContainer'>
      <div className='spacer' />
      <div className='contContainer'>

      <div className='phoneImg' />
      <div>
      <div className='signupContainer'>
        <div className='mainTitle'>
          Friendstagram
        </div>
        <div>
          <div className='blurb'>
            Sign up to see photos
          </div>
          <div className='blurb'>
            from your friends.
          </div>
        </div>
        <div>
          <DemoUser />
        </div>
        
        <div className='orLineContainer'>
          <hr className='loginline' />
          <div className='orWord'>
            OR
          </div>
          <hr className='loginline' />
        </div>
        <form className='formContainer' onSubmit={onSignUp}>
          <div className='errors '>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
              {/* <div className='errors'>
                {allerrors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div> */}
          <div className='inputField'>
            {emailerrors?.length > 0 ? <div className='errmss' >
              {/* {emailerrors.map((error, ind) => ( */}
                <div key={0}>{emailerrors[0]}</div>
              {/* ))} */}
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
          
          <div className='inputField'>
            {unerrors?.length > 0 ? <div className='errmss'>
              {/* {unerrors.map((error, ind) => ( */}
                <div key={0}>{unerrors[0]}</div>
              {/* ))} */}
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
          <div className='inputField'>
            {passerrors?.length > 0 ?
                <div className='errmss' >
                {/* {passerrors.map((error, ind) => ( */}
                  <div key={0}>{passerrors[0]}</div>
                {/* ))} */}
            </div> : <div className='errmss' />}
            <input
              id='id_password'
              className='passInput'
              placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
              {/* <div> */}
                  {/* <i class="far fa-eye eye" id="togglePassword"></i> */}
                <i
                  class="far fa-eye eye"
                  id='id_eye'
                  type='checkbox'
                  onClick={showPass}
                />
              {/* </div> */}
            
          </div>
          
              
          <div className='inputField'>
            {newpasserr?.length > 0 ?
              <div className='errmss' >
                {/* {passerrors.map((error, ind) => ( */}
                <div key={0}>{newpasserr[0]}</div>
                {/* ))} */}
              </div> : <div className='errmss' />}
            <input
              id='id_rpassword'
              className='passInput'
              placeholder='Repeat Password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
                <i
                  class="far fa-eye eye"
                  id='id_reye'
                  type='checkbox'
                  onClick={showRPass}
                />
          </div>
              {/* TOOK DISABLED OUT OF SUBMIT BUTTON */}
              {/* disabled={errors.length > 0} */}
          
          <button className='btn' disabled={allerrors.length>0 || newpasserr.length>0 ||passerrors.length>0 || emailerrors.length>0 || unerrors.length>0} type='submit'>Sign up</button>
        </form>
      </div>
      <div className='redirContainer'>
        <div className='switchdiv'>
          
          Have an account? 
          
          <NavLink to='/' exact={'true'} className='link' >
            Log in
          </NavLink>
          
        </div>
        </div>
        <div className='errcont'>
        {/* {passerrors?.length>0?
          <div className='errors passerr'>
            {passerrors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div> : <></>} */}
          
          {/* {unerrors?.length > 0 ? <div className='errors unerr'>
            {unerrors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))}
            </div> : <></>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
