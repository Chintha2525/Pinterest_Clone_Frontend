import React from 'react';
import "./Imagegrid.css"

const ImageGrid = () => {

    return (
        <div className='main'>
            <div className='image-grid-left'>
                <div className='image-grid'>
                    <img src='https://s.pinimg.com/webapp/left-511a9304.png' alt='img-1' className='img-1' ></img>
                    <img src='https://s.pinimg.com/webapp/topRight-d0230035.png' alt='img-2' className='img-2'></img>
                    <img src='https://s.pinimg.com/webapp/right-88044782.png' alt='img-4' className='img-4'></img>
                    <img src='https://s.pinimg.com/webapp/center-77497603.png' alt='img-3' className='img-3'></img>
                </div>
            </div>
            <div className='image-grid-right'>
                <div className="side-text" >
                    <div className='heading' >Your Ideas Await</div><div className='desc' >What do you want to try next? Think of something you’re into – such as 'easy chicken dinner' – and see what you find.</div>
                </div>
            </div>
        </div>
    )
}

export default ImageGrid