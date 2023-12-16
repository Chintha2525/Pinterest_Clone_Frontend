import React, { useContext } from "react";
import StackGrid, { transitions } from "react-stack-grid";
import "../../App.css";
import Pin from "../Pin/Pin";
import { UserContext } from "./Slideshow";
import useFetch from "../../hooks/useFetch";
import { Config } from "../../config/config";


const Pinboard = () => {
  const { fadeUp } = transitions;
  const url1 = `${Config.api}/unauth/slideshow`
  const { data } = useFetch(url1)
  const boardIndex = useContext(UserContext);
  console.log(url1)
  const boardData = data && data[Object.keys(data)[boardIndex]];
  console.log(boardData)
  return (
    <>
      <div style={{ position: "relative", zIndex: 0, marginInlineStart: "2.8rem" }} className="slideshow" id="slideshow" >

        <StackGrid
          columnWidth={window.innerWidth > 768 ? 200 : window.innerWidth / 2}
          monitorImagesLoaded={true}
          itemComponent="div"
          gutterWidth={10}
          gutterHeight={10}
          className="abs"
          appear={fadeUp.appear}
          enter={fadeUp.enter}
          duration={5000}
          easing="backInOut"
          style={{ position: "relative" }}

        >
          {boardData &&
            boardData.map((link, index) => (
              <div className={`column-${index % 8} fade-up`} key={`Div-${index}`} >

                <Pin
                  source={link.img_source}
                  key={`Div-${index}`}
                  id={`Div-${index}`}
                  style={{ margin: index }}
                />
              </div>
            ))}
        </StackGrid>
      </div>
    </>
  );
};

export default Pinboard;
