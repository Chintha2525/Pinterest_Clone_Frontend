import React, { useState, useRef, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Container, Row, Col, Button, Dropdown, Tooltip, Overlay } from 'react-bootstrap';
import { ic_keyboard_backspace_twotone } from 'react-icons-kit/md/ic_keyboard_backspace_twotone'
import { ic_keyboard_arrow_down_outline } from 'react-icons-kit/md/ic_keyboard_arrow_down_outline'
import { ic_keyboard_arrow_right_twotone } from 'react-icons-kit/md/ic_keyboard_arrow_right_twotone'
import { ic_file_upload } from 'react-icons-kit/md/ic_file_upload';
import { heartO } from 'react-icons-kit/fa/heartO';
import { heart } from 'react-icons-kit/fa/heart';
import { ic_send } from 'react-icons-kit/md/ic_send'
import { link } from 'react-icons-kit/fa/link'
import Icon from 'react-icons-kit';
import parseUrl from 'url-parse';
import { getTimeSince } from '../../helper/timeDifference';
import EmojiPicker from 'emoji-picker-react';
import { AuthContext } from '../../context/AuthContext';
import { hasValue } from '../../helper/hasValue';
import axios from 'axios'
import ShowLike from '../../components/Single/Showlikes';
import "./Single.css"
import { copyClipboard } from '../../helper/copy';
import { Config } from '../../config/config';
import Header from '../../components/Header/Header';
import { Avatar } from '@mui/material';

const Single = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const pid = location.pathname.split('/')[2]
    const url1 = `${Config.api}/pin/${pid}`
    const { data } = useFetch(url1)
    const { user } = useContext(AuthContext)
    const url2 = `${Config.api}/user/${user.ID}`
    const userData = useFetch(url2).data;
    const url = parseUrl(data.link);
    const hostname = url.hostname;
    const target = useRef(null);
    const [btnv, setbtnv] = useState(false)
    const [ic, setic] = useState(true)
    const [show, setShow] = useState(false);
    const [showLikes, setshowLike] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("1f60a");
    const a = hasValue(data.likes, user.ID)
    const [like, setLike] = useState()
    const [text, setText] = useState({
        text: "Save",
        style: {}
    })
    useEffect(() => {
        if (userData && userData.savedPins && hasValue(userData.savedPins, pid)) {
            console.log("ssaved")
            setText({
                text: "Saved",
                style: { color: "white", backgroundColor: "black", border: "black" }
            })
        }
    }, [userData]);

    useEffect(() => {
        setLike(a)
    });
    const [inputValue, setInputValue] = useState("");

    console.log(data)
    const likeCount = data.likes ? data.likes.length : null
    if (data.extras) {

        var dx = JSON.parse(data.extras)
    }
    const handleInput = () => {
        setbtnv(true)
    }
    const handleClick = () => {
        setic(!ic)
    }
    const onEmoji = (emojiData, event) => {
        setInputValue((inputValue) =>
            inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        );
        setSelectedEmoji(emojiData.unified);
    }
    const handleSubmit = async () => {
        try {

            const credential = {
                username: user && user.Name,
                commentText: inputValue

            }
            const res = await axios.post(`${Config.api}/comment/${pid}`, credential)

            window.location.reload()
        } catch (error) {
            console.log(error)
        }

    }

    const handleSave = async (e) => {
        e.stopPropagation()
        if (text.text !== "Saved") {

            try {
                const res = await axios.post(`${Config.api}/savepin/${user.ID}/${pid}`)
                setText({
                    text: "Saved",
                    style: { color: "white", backgroundColor: "black", border: "black" }
                })
                navigate(window.location.pathname, { replace: true });
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleChange = async () => {
        const credential = {
            userId: user && user.ID,
        }
        if (!like) {
            let res = await axios.post(`${Config.api}/like/${pid}`, credential)
            window.location.reload()
            // setData(res.data)
        }
        else {
            let res = await axios.post(`${Config.api}/like/delete/${pid}`, credential)
            window.location.reload()
            // setData(res.data)
        }
    }
    const showLike = () => {
        setshowLike(!showLikes)
    }

    return (
        <>
            <Header />
            <button className="back-button left-top" onClick={() => { window.history.back() }}>
                <Icon icon={ic_keyboard_backspace_twotone} size={30} />
            </button>
            <Container>
                <Row>
                    <div className='pinCon mt-4 h-50'>
                        <Col className='lg-5 md-5 sm-1'>
                            <img src={data.img_source}></img>
                        </Col>
                        <Col>
                            <div className='right-card'>

                                <div className='top-bar'>
                                    <div className='icons'>
                                        <Dropdown>

                                            <Dropdown.Toggle size='sm' className='sm' variant='none'>
                                                <Icon icon={ic_file_upload} size={30} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <a href={data.img_source} download >Download</a>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <Icon icon={link} size={30} onClick={() => { copyClipboard(window.location.href) }} />
                                    </div>
                                    <Button variant="danger" style={text.style} className="display-over save-button" onClick={handleSave}>
                                        {text.text}
                                    </Button>
                                </div>
                                <div className="content">
                                    <a href={data.img_source} ></a>
                                    <h3>
                                        {data.title}
                                    </h3>
                                    <p>
                                        {data.description}
                                    </p>
                                    {dx && dx.ingredient && <h2> Ingredients</h2>}
                                    {dx && dx.Supplies && <h2>Supplies</h2>}
                                    <div>
                                        <ul>
                                            {dx && dx.ingredient.split('\n• ').map((a) => {
                                                if (a !== "Ingredients") {
                                                    return <li>{a}</li>
                                                }
                                            })}
                                        </ul>
                                        {/* <EmojiPicker/> */}
                                    </div>
                                    <div className='comments'>

                                        <h3 data-bs-toggle="collapse" data-bs-target="#comments" onClick={handleClick}>Comments {data.allow_comment ? <Icon icon={ic ? ic_keyboard_arrow_down_outline : ic_keyboard_arrow_right_twotone} size={30} ></Icon> : ""} </h3>
                                        {!data.allow_comment && <span className='fst-italic' >Comments are turned off for this pin</span>}
                                        <div class="collapse show mt-3" id='comments' >
                                            {data.allow_comment && data.comments?.length == 0 && <h6 className='fw-normal'>No comments yet! Add one to start the conversation.</h6>}
                                            <div class="">

                                                {data.comments?.map(review => (
                                                    <div className='comment'>
                                                        <Avatar />
                                                        <div className='comment-text'>
                                                            <span> <b>{review.username}</b> {review.commentText} </span>
                                                            <span> {getTimeSince(new Date(review.createdAt))} </span>
                                                        </div>
                                                    </div>

                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='sticky-bottom bg pb-3'>

                                    <hr />
                                    {data.allow_comment ?
                                        <div className='footer '>
                                            <div className='like-section'>
                                                <h5 className='text-left w-100'>{data.comments?.length !== 0 ? data.comments.length + " Comments" : "What do you think?"}</h5>
                                                <button className='bg-none back-button ' style={{ width: "6rem" }} onClick={showLike} > <Icon icon={heart} size={20} style={{ color: "red" }} /> <span className='pr-2'>{likeCount}</span>  </button>
                                                <div >
                                                    <button className='back-button' onClick={handleChange} onChange={handleChange} >
                                                        {like ? <Icon icon={heart} size={30} style={{ color: "red" }} /> : <Icon icon={heartO} size={30} />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="custom-input-container">
                                                <div className="custom-input-wrapper">

                                                    <form action='' method='post'>
                                                        <input
                                                            type="text"
                                                            className="custom-input"
                                                            placeholder="Add a comment"
                                                            value={inputValue}
                                                            onChange={(e) => setInputValue(e.target.value)}
                                                        />

                                                        <button
                                                            type="button"  
                                                            ref={target}
                                                            className='emoji-picker'
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setShow(!show);
                                                            }}
                                                        >
                                                            😆
                                                        </button>

                                                        <Overlay target={target.current} show={show} placement="top" style={{ backgroundColor: "transparent" }}>
                                                            {(props) => (
                                                                <Tooltip {...props}>
                                                                    <EmojiPicker
                                                                        onEmojiClick={onEmoji}
                                                                        autoFocusSearch={false}
                                                                    />
                                                                </Tooltip>
                                                            )}
                                                        </Overlay>

                                                        <button className="custom-send-button" type='button' onClick={handleSubmit}>
                                                            <Icon icon={ic_send} size={22} style={{ transform: "translate(2px)" }} />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                        :
                                        <div className='footer '>
                                            <div className='like-section'>
                                                <h5 className='text-left w-100'>What do you think?</h5>
                                                <button className='bg-none back-button ' style={{ width: "6rem" }} onClick={showLike} > <Icon icon={heart} size={20} style={{ color: "red" }} /> <span className='pr-2'>{likeCount}</span>  </button>
                                                <div >
                                                    <button className='back-button' onClick={handleChange} onChange={handleChange} >
                                                        {like ? <Icon icon={heart} size={30} style={{ color: "red" }} /> : <Icon icon={heartO} size={30} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>

                        </Col>
                    </div>
                </Row>
                {showLikes && <ShowLike data={data.likes} show={showLikes ? "show" : ""} hide={() => { setshowLike(!showLikes) }} />}
            </Container>
        </>
    )
}

export default Single