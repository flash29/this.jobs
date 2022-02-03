import React, {useState} from 'react';
import styled from 'styled-components';
import picon from "../../images/camera-outline.svg";
import "./Uploader.css"

const Button = styled.button`
  position: relative;
  flex-wrap: wrap;
  flex-direction: row;
  border-radius: 10%;
  margin-right : 10px;
  width: 6%;
  height: 5%;
  background: transparent;
`;

const PhotoUploader = props => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  
  const getBase64 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    return base64;
  }

  const convertBase64  = (file) => {
    return new Promise((resolve, reject) =>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <>
      <Button onClick={handleClick}>
        <img src = {picon} className = "images" alt = ""/>
      </Button>
      <input
        type="file"
        ref = {hiddenFileInput}
        onChange = { (e) => console.log(getBase64(e))}
        style={{display: 'none'}}
      />
    </>
  );
}

export default PhotoUploader;
