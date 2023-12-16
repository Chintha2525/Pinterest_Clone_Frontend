import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadImg = () => {
  const [file, setFile] = useState("");
  const navigate = useNavigate()

  const handleChange = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload_preset");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dsdz7dwu4/image/upload",
        data
      );
      console.log(uploadRes)
      const { version } = uploadRes.data
      const { public_id } = uploadRes.data
      const { url } = uploadRes.data;


      navigate(`/pinForm?v=${version}&pid=${public_id}`)

    } catch (err) {
      alert(err)
    }
  };


  return (
    <div>
      <label htmlFor="upload_img" className="d-block">
        <div className="upload_img_container">
          <div id="dotted_border">
            <div className="pint_mock_icon_container">
              <CloudUploadIcon fontSize='large' />
            </div>
            <div>Click to upload</div>
            <div>We recommend using high-quality .jpg files less than 20MB or .mp4 files less than 100MB.</div>
          </div>
        </div>
      </label>
      <form

        enctype="multipart/form-data"
        name="uploading"
      >
        <input
          type="file"
          name="upload_img"
          id="upload_img"
          onInput={(e) => { setFile(e.target.files[0]) }}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default UploadImg;