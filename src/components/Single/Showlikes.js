import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { heart } from 'react-icons-kit/fa/heart';

const ShowLike = (props) => {
    const retriveUsernames = (data) => {
        const extractedFnames = []
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                extractedFnames.push(data[key].fname);
            }
        }
        return extractedFnames
    }
    const users = retriveUsernames(props.data)

    return (
        <>
            <Modal {...props} onHide={props.hide} size="lg" centered className='likes' >
                <Modal.Header className='border-0'>
                    <div style={{ position: "absolute", left: "50%" }} ><Icon icon={heart} size={30} style={{ color: "red" }} /></div>
                </Modal.Header>
                <Modal.Body >

                    {users.map((uname) => {
                        return (<Row>
                            <Col xs={11} md={11} lg={11}>
                                <h3>{uname}</h3>
                            </Col>
                            <Col xs={1} md={1} lg={1}>
                                <Icon icon={heart} size={30} style={{ color: "red" }} />
                            </Col>
                        </Row>)
                    })}
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ShowLike