import { useEffect, useRef, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  Card,
  CardMedia,
} from "@material-ui/core";
import { getImages } from "../helpers/getImages";

import confetti from "canvas-confetti";

let size = 3;
let clicks = 0;
const Cards = ({ start, score }) => {
  const [images, setImages] = useState(getImages(size));
  const [selected, setSelected] = useState([]);
  const [opened, setOpened] = useState([]);

  const handleClick = (item) => {
    if (start) {
      clicks = clicks + 1;
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
      size = size + 2;
      clearArrays();
      setImages(getImages(size));

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
    const passLevel = size * 10;
    let total = score.current;
    const cards = size * 2;
    if (clicks === cards) {
      total = total + cards * 2 + passLevel;
    } else if (clicks > cards && clicks < cards + 5) {
      total = total + cards + passLevel;
    } else if (clicks > cards + 5 && clicks < cards + 10) {
      total = total + cards / 2 + passLevel;
    } else {
      total = total + Math.round(cards / 3) + passLevel;
    }
    clicks = 0;
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
