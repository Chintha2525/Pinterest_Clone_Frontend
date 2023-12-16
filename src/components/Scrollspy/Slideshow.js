import React, { useState, createContext } from "react";
import { Carousel } from "react-bootstrap";
import "./Slideshow.css"
import Logo from "../BounceButton/Arrow";
import Pinboard from "./Pinboard";
import Loading from "../BounceButton/Loading";

const UserContext = createContext();

const SlideShow = () => {
  const subTitles_array = [
    "Travel Destination",
    "Anime Characters",
    "Dream Bike & Cars",
    "Bollywood Stars "
  ];
  const color = [
    "rgb(80, 122, 87)",
    "rgb(0, 118, 211)",
    "rgb(194, 139, 0)",
    "rgb(81, 140, 123)"
  ];

  const [subtitle, setSubtitle] = useState(subTitles_array[0]);
  const [board, setBoard] = useState(0);
  const handleChange = (e) => {
    setSubtitle(subTitles_array[e]);
    setBoard(e);
  };

  return (
    <>
      <div>
        <div className="covertext">
          <h2 className="title">Get your next</h2>
        </div>
        <Carousel
          indicatorLabels={false}
          controls={false}
          onSlide={handleChange}
          slide={false}
          interval={6200}
          className="mt-4"
        >
          {subTitles_array.map((val, index) => (
            <Carousel.Item key={index} style={{ "--custom_color": color[index] }}>
              <span className="bg_white"></span>
              <Carousel.Caption>
                <h3 className="subtitle">{subtitle}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <a href='#search'>
          <Loading logo={<Logo />} />

        </a>
        <UserContext.Provider value={board}>
          <Pinboard />
        </UserContext.Provider>
      </div>
    </>
  );
};

export default SlideShow;
export { UserContext };
