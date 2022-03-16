import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

const DemoUser = () => {
    const dispatch = useDispatch()
    const onClick = async (e) => {
        await dispatch(login('demo@aa.io', 'password'));
    };

    return <button onClick={onClick}>Log in as a Demo User</button>;
};

export default DemoUser;