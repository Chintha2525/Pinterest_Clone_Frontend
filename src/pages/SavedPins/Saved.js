import React, { useContext } from "react";
import StackGrid from "react-stack-grid";
import "../../App.css";
import Pin from "../../components/Pin/Pin";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { Config } from "../../config/config";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Icon from "react-icons-kit";
import { ic_keyboard_backspace_twotone } from "react-icons-kit/md/ic_keyboard_backspace_twotone";

const Saved = () => {

  const { user } = useContext(AuthContext)
  const url = `${Config.api}/user/${user.ID}`

  const { data } = useFetch(url)
  console.log("ds")
  console.log("ds")
  console.log("ds")
  console.log(data)
  console.log(data.savedPins)

  const src_link = []
  if (data && data.savedPins) {
    data.savedPins.map((objects) => {
      src_link.push([objects.img_source, objects._id, objects.link])
    });
  }
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  shuffle(src_link)

  return (
    <>
      <Header />
      <button className="back-button left-top" onClick={() => { window.history.back() }}>
        <Icon icon={ic_keyboard_backspace_twotone} size={30} />
      </button>
      <div className="save-head">
        <h1>Saved Pins</h1>
      </div>
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
      // horizontal={true}
      >

        {src_link.map((link, index) => (
          <Link key={link[1]} to={`pins/${link[1]}`}>
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

export default Saved;
