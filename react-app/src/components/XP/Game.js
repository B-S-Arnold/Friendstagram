import React, { useEffect, useState } from 'react';
import './Game.css'



function Game() {

    const gamebox = document.getElementsByClassName('gamebox')
    const zero = document.getElementsByClassName('zero')

    const [xVal, setxVal] = useState('500px')
    const [yVal, setyVal] = useState('500px')
    const [oldx, setOldx] = useState('500px')
    const [oldy, setOldy] = useState('500px')
    let pointerX;
    let pointerY;
    let zeroStyle;



    useEffect(() => {

        const changeXY = (e) => {
            setOldx(xVal)
            setOldy(yVal)
            pointerX = e.pageX;
            pointerY = e.pageY;
            setxVal(pointerX)
            setyVal(pointerY)

        }

        document.addEventListener('click', changeXY);

        return () => document.removeEventListener("click", changeXY);
    }, []);



    //Animation only works once! Not on click!!!!

    let dynamicStyles = null

    function addAnimation(body) {
        if (!dynamicStyles) {
            dynamicStyles = document.createElement('style');

            document.head.appendChild(dynamicStyles);
        }

        dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
    }

    addAnimation(`
      @keyframes move { 
         0% {
           left: ${oldx};
           top: ${oldy};
         }

         80% {
            left: ${oldx - xVal};
            top: ${oldy - yVal}
         }

        100% {
          left: ${xVal};
          top: ${yVal};
        }
      }
    `);





    zeroStyle = { top: `${yVal}px`, left: `${xVal}px`, animation: '3s alternate move' }



    return (
        <div className='container'>
            <div className='gametitle'>Zer0</div>
            <div className='gamebox'>
                <div className='zero'
                    style={zeroStyle}>
                    <div className='bodypart'>0</div>
                    <div className='bodypart'>/|\</div>
                    <div className='bodypart'>.//\\.</div>
                    <div className='bodypart'>_/&nbsp;\_</div>
                    { }
                </div>

            </div>
        </div>

    );
}

export default Game;