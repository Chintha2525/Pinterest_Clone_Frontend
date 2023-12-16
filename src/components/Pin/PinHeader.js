import React, { useContext, useState, useEffect } from "react";
import "../../App.css";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { hasValue } from "../../helper/hasValue"
import { Config } from "../../config/config";


const PinHeader = (props) => {

  const [text, setText] = useState({
    text: "Save",
    style: {}
  });

  const { user } = useContext(AuthContext)
  const pid = props.pid
  const url = `${Config.api}/user/${user.ID}`
  const { data } = useFetch(url)
  console.log("props")
  console.log(data)
  console.log(hasValue(data.savedPins, pid))


  useEffect(() => {
    const fetchData = async () => {
      if (data && data.savedPins && hasValue(data.savedPins, pid)) {
        console.log("ssaved");
        setText({
          text: "Saved",
          style: { color: "white", backgroundColor: "black", border: "1px solid black" },
        });
      }
    };
    fetchData();
  }, [data, pid]);

  const handleClick = async (e) => {
    e.stopPropagation()
    if (text.text !== "Saved") {

      try {
        const res = await axios.post(`${Config.api}/savepin/${user.ID}/${pid}`)
        setText({
          text: "Saved",
          style: { color: "white", backgroundColor: "black", border: "1px solid black" }
        })
        setTimeout(() => {

          window.location.reload()
        }, 2000);
      } catch (err) {
        console.error("Error saving pin:", err);
      }
    }

  }
  return (
    <div>
      <Button variant="danger" style={text.style} className="display-over save-button" onClick={handleClick}>
        {text.text}
      </Button>
    </div>
  );
};

export default PinHeader;