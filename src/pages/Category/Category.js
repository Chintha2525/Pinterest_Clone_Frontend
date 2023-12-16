import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../App.css"
import useFetch from '../../hooks/useFetch';
import Icon from "react-icons-kit";
import { ic_keyboard_backspace_twotone } from "react-icons-kit/md/ic_keyboard_backspace_twotone";
import Pin from '../../components/Pin/Pin';
import StackGrid from 'react-stack-grid';
import { Config } from '../../config/config';
import Header from '../../components/Header/Header';

const Category = () => {

    const location = useLocation()
    const pid = location.pathname.split('/')[2]
    const url1 = `${Config.api}/pin/${pid}`
    const curr = useFetch(url1).data
    const url2 = `${Config.api}/category/${pid}`
    const { data } = useFetch(url2)
    const src_link = []
    data.map((objects, index) => {
        src_link.push([objects.img_source, objects._id])
    })

    return (
        <>
            <Header />
            <button className="back-button left-top" onClick={() => { window.history.back() }}>
                <Icon icon={ic_keyboard_backspace_twotone} size={30} />
            </button>
            <center className='image category-img-1' >
                <img src={curr.img_source} alt='' style={{ maxHeight: "35vh", minWidth: "40%" }} id={curr._id} ></img>
                <span className="text mx-auto" style={{ bottom: "40%", fontSize: "3rem", width: "40%", left: "30%" }}>{curr.title}</span>
                <button className='share'>Share</button>

            </center>
            <center className='mx-auto pt-3 px-5 w-50'>
                <span >{curr.description}</span>
            </center>
            <div className='mt-5'>

                <StackGrid
                    columnWidth={
                        window.innerWidth > 768
                            ? (window.innerWidth - 40) / 6
                            : (window.innerWidth - 20) / 2
                    }
                    monitorImagesLoaded={true}
                    itemComponent="div"
                    gutterWidth={20}
                    gutterHeight={20}
                    style={{ zIndex: 1 }}
                >
                    {src_link.map((link, index) => (
                        <Link key={link[1]} to={`/pins/${link[1]}`}>
                            <Pin
                                source={link[0]}
                                key={link[1]}
                                id={link[1]}
                                style={{ row_no: 100 }}
                                url={link[2]}
                                pid={link[1]}
                            />
                        </Link>
                    ))}
                </StackGrid>
            </div>
        </>
    )
}

export default Category