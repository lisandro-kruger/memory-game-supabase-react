import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Item from "./Item";

import { getUsers } from "../helpers/getUsers";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setRanking(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Box className="Content">
        {ranking &&
          ranking.map((item, index) => (
            <Item
              key={index}
              name={item.name}
              score={item.score}
              index={index}
            />
          ))}
      </Box>
    </>
  );
};

export default Ranking;
