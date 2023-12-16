import React from "react";
import StackGrid from "react-stack-grid";
import "../../App.css";
import Pin from "../../components/Pin/Pin";
import { useLocation, Link } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { Config } from "../../config/config";
import Header from "../../components/Header/Header";

const Search = () => {
    const location = useLocation()
    const searched = location.pathname.split('/')[2]
    const url1 = `${Config.api}/search/${searched}`
    const { data } = usePost(url1)
    const src_link = []
    data.map((objects, index) => {
        src_link.push([objects.img_source, objects._id])
    })
    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    shuffle(src_link)

    return (
        <>
            <Header />
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
                            key={"Div-" + index}
                            id={"Div-" + index}
                            style={{ row_no: 100 }}
                        />
                    </Link>
                ))}
            </StackGrid>
        </>
    );
};

export default Search;
