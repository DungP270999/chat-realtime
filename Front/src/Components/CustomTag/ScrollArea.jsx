import React, {useRef} from 'react';

import styled from "styled-components";

const StyledScrollArea = styled.div`
  overflow: auto;
  //scrollbar-width: none !important;
  //::-webkit-scrollbar {
  //  width: 0;
  //  height: 0;
  //}
  position: relative;
  .scrollbar {
    position: absolute;
    &.vertical {
      top: 0;
      right: 0;
      width: 10px;
      background-color: grey;
     
      opacity: 0.5;
    }
    &.horizontal {
      bottom: 0;
      left: 0;
    }
  }
`;

const ScrollArea = (props) => {

    const ref = useRef(null);
    // const [scrollTop, setScrollTop] = useState(0);
    // const [clientHeight, setClientHeight] = useState(0);
    //
    // useEffect(() => {
    //     ref.current.addEventListener("scroll", (event) => {
    //         // console.log(event.target.scrollTop + " " + event.target.clientHeight +" " + event.target.scrollHeight);
    //         setScrollTop(event.target.scrollTop);
    //         setClientHeight(event.target.clientHeight)
    //     })
    // }, []);

    return (
        <StyledScrollArea {...props} ref={ref}>
            {/*{props.children}*/}
            {/*<div className="scrollbar vertical" style={{height: clientHeight + "px", marginTop: scrollTop + "px"}}>*/}

            {/*</div>*/}
            {/*<div className="scrollbar horizontal">*/}

            {/*</div>*/}
        </StyledScrollArea>
    );
};

export default ScrollArea;
