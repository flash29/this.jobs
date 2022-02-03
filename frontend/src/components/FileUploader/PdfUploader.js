import React from 'react';
import styled from 'styled-components';
import ficon from "../../images/document-attach-outline.svg";
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

const PdfUploader = props => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  
//   const handleChange = event => {
//     const fileUploaded = event.target.files[0];
//     props.handleFile(fileUploaded);
//   };

  return (
    <>
      <Button onClick={handleClick}>
        <img src = {ficon} className = "images" alt = ""/>
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={ props => console.log(props.base64)}
        style={{display: 'none'}}
      />
    </>
  );
}

export default PdfUploader;
