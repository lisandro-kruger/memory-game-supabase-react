import { Box, Typography } from "@material-ui/core";

const Item = ({ index, name, score }) => {
  return (
    <>
      <Box className="Ranking-Item">
        <Typography component="span" className="Ranking-Span">
          {++index}:
        </Typography>
        <Typography component="span" className="Ranking-Span">
          {name}
        </Typography>
        <Typography component="span" className="Ranking-Span">
          {score} Pts
        </Typography>
      </Box>
    </>
  );
};

export default Item;
