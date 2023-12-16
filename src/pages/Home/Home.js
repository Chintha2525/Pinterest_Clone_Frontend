import React, { useState, useEffect } from "react";
import StackGrid from "react-stack-grid";
import "../../App.css";
import Pin from "../../components/Pin/Pin";
import Header from "../../components/Header/Header";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { Config } from "../../config/config";

const Home = () => {
  const { data, error } = useFetch(`${Config.api}/pin`);
  const [columnWidth, setColumnWidth] = useState(getColumnWidth);

  function getColumnWidth() {
    return window.innerWidth > 768
      ? (window.innerWidth - 40) / 6
      : (window.innerWidth - 20) / 2;
  }

  useEffect(() => {
    function handleResize() {
      setColumnWidth(getColumnWidth());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const src_link = Array.isArray(data)
    ? data.map((objects) => [objects.img_source, objects._id, objects.link])
    : [];
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffledSrcLink = shuffle(src_link);

  return (
    <>
      <Header />
      <StackGrid
        columnWidth={columnWidth}
        monitorImagesLoaded={true}
        itemComponent="div"
        gutterWidth={20}
        gutterHeight={20}
        style={{ zIndex: 1 }}
      >
        {shuffledSrcLink.map((link) => (
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
    </>
  );
};

export default Home;
