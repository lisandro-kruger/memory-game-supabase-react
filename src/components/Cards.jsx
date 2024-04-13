import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CardMedia
} from "@material-ui/core";
import { getImages } from "../helpers/getImages";

import confetti from "canvas-confetti";

let SIZE = 3;
let CLICKS = 0;
const Cards = ({ start, score }) => {
  const [images, setImages] = useState(getImages(SIZE));
  const [selected, setSelected] = useState([]);
  const [opened, setOpened] = useState([]);

  const handleClick = (item) => {
    if (start) {
      CLICKS = CLICKS + 1;
      if (selected.length < 2) {
        setSelected((selected) => selected.concat(item));
      }
    }
  };

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
        setOpened((opened) => opened.concat(selected));
      }
      setTimeout(() => setSelected([]), 500);
    }
  }, [selected]);

  useEffect(() => {
    if (opened.length === images.length) {
      calculateScore();
      SIZE = SIZE + 2;
      clearArrays();
      setImages(getImages(SIZE));

      confetti({
        particleCount: 200,
        startVelocity: 30,
        spread: 300,
        gravity: 1.5,
        origin: { y: 0 },
      });
    }
  }, [opened]);

  const clearArrays = () => {
    setSelected([]);
    setOpened([]);
  };

  const calculateScore = () => {
    const passLevel = SIZE * 10;
    let total = score.current;
    const cards = SIZE * 2;
    if (CLICKS === cards) {
      total = total + cards * 2 + passLevel;
    } else if (CLICKS > cards && CLICKS < cards + 5) {
      total = total + cards + passLevel;
    } else if (CLICKS > cards + 5 && CLICKS < cards + 10) {
      total = total + cards / 2 + passLevel;
    } else {
      total = total + Math.round(cards / 3) + passLevel;
    }
    CLICKS = 0;
    score.current = total;
  };

  let include = false;
  return (
    <>
      <Box className="Cards">
        <Typography variant="h2" className="Cards-h2">
          Score: {score.current}
        </Typography>
        <ul className="App-Ul">
          {images.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item)}
              className="App-Ul-Li Li-Content"
            >
              <div className="Content">
                {(include = selected.includes(item) || opened.includes(item))}

                <Box className={`Front ${include ? "Flip-Front" : ""}`}>
                  <CardMedia
                    component="img"
                    image="/question.png"
                    alt="icon"
                    className="App-Ul-Li-Img"
                  />
                </Box>
                <Box className={`Back ${include ? "Flip-Back" : ""}`}>
                  {/* <CardMedia component="img" image={include?item.split('|')[1]:'/question.png'} alt="icon" /> */}
                  <CardMedia
                    component="img"
                    image={item.split("|")[1]}
                    alt="icon"
                    className="App-Ul-Li-Img"
                  />
                </Box>
              </div>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default Cards;
