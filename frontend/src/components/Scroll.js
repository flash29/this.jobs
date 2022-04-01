


function Scroll(props){
    return (
        <div style={{ overflow: 'scroll', height: props.height , width: props.width }}>
          {props.children}
        </div>
      );
}

export default Scroll;