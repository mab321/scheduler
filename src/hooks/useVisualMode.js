import { useState } from "react";

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // change modes
  const transition = function(newMode, replace = false) {
    if (replace) {
     setHistory((prev) => [newMode, ...prev.slice(1)]);
    } else {
     setHistory((prev) => [newMode, ...prev]);
    }
    setMode(newMode);
    
  }
 // go back to previous mode
  const back = function() {
    setHistory((prev) => {

      if (history.length < 2) {
        return;
      }
      // copy shifted history
      const newHistory = prev.slice(1);
      setMode(newHistory[0]); // set new mode
      return newHistory; // sets the newhistory as the history
    })
  }

  return {mode, transition, back};
}

export default useVisualMode;
