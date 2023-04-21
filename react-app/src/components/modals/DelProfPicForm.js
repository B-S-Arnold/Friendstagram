import React, { useState, useEffect, useCallback } from 'react';
import { FileDrop } from 'react-file-drop';
import { useNavigate } from "react-router-dom";



const DelProfPicForm = ({ renderOptionsModal, user }) => {





    const handleSubmit = async (e) => {
        e.preventDefault();










        const res = await fetch(`/api/users/del/${user.id}`, {
            method: "PUT",

        });
        if (res.ok) {
            await res.json();

            renderOptionsModal(false);

        }
        else {
            console.log("error")
        }
    }





    const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
    return (
        <>
            <form onSubmit={handleSubmit}>











            </form>

        </>
    )
}



export default DelProfPicForm;