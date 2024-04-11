import { useState, useRef } from "react";
import { Typography, Button } from "@material-ui/core";
import Cards from "./components/Cards";
import Timer from "./components/Timer";
import Ranking from "./components/Ranking";

import { supabase } from "../src/helpers/supabaseClient";

import "./App.css";

function App() {
  const [start, setStart] = useState(false);
  const [save, setSave] = useState(false);
  const [name, setName] = useState("");
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const score = useRef(0);

  const handleSave = async () => {
    if (name !== "") {
      
      const error = await supabase
        .from('ranking')
        .insert({ name: name, score: score.current })

      error.status === 409 ? setError(true) : location.reload()
      console.log(error);
      setWarning(false)
    }else {
      setWarning(true)
    }
  }

  return (
    <>
      <div className="App">
        <Typography variant="h1" className="App-H1 H1">Memory Game</Typography>
        <Timer start={start} setStart={setStart} setSave={setSave} />
        <div className="Buttons">
          {!start && !save ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStart(true)}
              className="Button"
            >
              Start
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => location.reload()}
              className="Button"
            >
              Again
            </Button>
          )}
          {save && (
            <>
            <input type="text" 
              onChange={e=>setName(e.target.value)}
              className={`${warning?'Input Warning': 'Input'}`}  
            />
            <Button variant="contained" color="primary" onClick={handleSave} className="Button" >Save</Button>
          </>
          )}
          { error && <p className='Error'>The name exist.</p> }
        </div>
        <div className="Ranking">
          <Ranking />
        </div>
        <Cards start={start} score={score} />
      </div>
    </>
  );
}

export default App;
