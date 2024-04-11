import { useEffect, useRef } from "react";
import { Box, Typography } from "@material-ui/core";

import Countdown from "react-countdown";

const Counter = ({ props }) => (
  <span className="Timer-H3-Span">
    {props.seconds === 0 ? 60 : props.seconds}
  </span>
);

const Timer = ({ start, setStart, setSave }) => {
  const timerRef = useRef();

  const handleEnd = ({ start }) => {
    console.log("timer end");
    setStart(false);
    setSave(true);
  };

  useEffect(() => {
    if (start) {
      timerRef.current.start();
    }
  }, [start]);

  return (
    <>
      <Box className="Timer">
        <Typography variant="h3" className="Timer-H3">
          <Countdown
            date={Date.now() + 60000}
            renderer={(props) => <Counter props={props} />}
            onComplete={handleEnd}
            autoStart={false}
            ref={timerRef}
          ></Countdown>
          Sec
        </Typography>
      </Box>
    </>
  );
};

export default Timer;
