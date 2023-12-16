import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Config } from "../../config/config";
import Header from "../../components/Header/Header";
import Icon from "react-icons-kit";
import { ic_keyboard_backspace_twotone } from "react-icons-kit/md/ic_keyboard_backspace_twotone";

const Updateuser = () => {
    const { user } = useContext(AuthContext)

    const url1 = `${Config.api}/user/${user.ID}`
    const { data } = useFetch(url1)
    const initialInputValues = {
        fname: data.fname,
        email: data.email,
        dob: "",
    };
    const [inputValue, setInputValue] = useState(initialInputValues);
    useEffect(() => {
        if (data && data.dob) {
            const dob = new Date(data.dob).toISOString().slice(0, 10);
            setInputValue((prev) => ({
                ...prev, fname: data.fname, email: data.email,
                dob: dob,
            }));
        }
    }, [data]);


    const navigate = useNavigate()


    const handleChange = (e) => {
        e.preventDefault()
        setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`${Config.api}/update/user/${user.ID}`, inputValue);
            navigate("/");
        } catch (err) {
            console.error(err);
        }

    }

    const handleReset = () => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        setInputValue(initialInputValues);
    }

    return (
        <>
            <Header />
            <button className="back-button left-top" onClick={() => { window.history.back() }}>
                <Icon icon={ic_keyboard_backspace_twotone} size={30} />
            </button>
            <center className="my-5">

                <h1 className="m-auto d-block">
                    User Update
                </h1>
            </center>
            <div className="col-md-6 col-lg-7 m-auto">

                <Form className="p-3 m-3 form w-100 ">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3 "
                    >
                        <Form.Control type="text" className="rounded-pill ps-4" placeholder="Add Name" name="fname" onChange={handleChange} value={inputValue.fname} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3 "
                    >
                        <Form.Control type="email" className="rounded-pill ps-4" placeholder="Add Email" name="email" onChange={handleChange} value={inputValue.email} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="DOB"
                        className="mb-3 "
                    >
                        <Form.Control type="date" className="rounded-pill ps-4" placeholder="Add Email" name="dob" onChange={handleChange} value={inputValue.dob} />
                    </FloatingLabel>


                    <Button className="mt-3 me-5 rounded-pill" variant="secondary" type="reset" onClick={handleReset}>Reset</Button>
                    <Button className="mt-3 me-5 rounded-pill" variant="danger" type="submit" onClick={handleSubmit}>Update</Button>
                </Form>
            </div>

        </>
    );
};

export default Updateuser;
