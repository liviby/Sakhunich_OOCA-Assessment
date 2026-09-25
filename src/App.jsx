import { useEffect, useState } from "react";
import Curtains from "./components/Curtains.jsx";
import { initializeFlow } from "./flow.js";
import StartScreen from "./screens/StartScreen.jsx";
import CountdownScreen from "./screens/CountdownScreen.jsx";
import BreatheScreen from "./screens/BreatheScreen.jsx";
import MoveScreen from "./screens/MoveScreen.jsx";
import FocusScreen from "./screens/FocusScreen.jsx";
import PreEndScreen from "./screens/PreEndScreen.jsx";
import EndingScreen from "./screens/EndingScreen.jsx";

const markupFiles = ["curtains", "start", "count", "breathe", "move", "focus", "preend", "ending"];

export default function App() {
  const [markup, setMarkup] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.all(
      markupFiles.map(async (name) => {
        const response = await fetch(`${import.meta.env.BASE_URL}screens/${name}.html`);
        if (!response.ok) throw new Error(`Could not load ${name}.html`);
        return [name, await response.text()];
      })
    ).then((entries) => {
      if (mounted) setMarkup(Object.fromEntries(entries));
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!markup) return;
    return initializeFlow();
  }, [markup]);

  if (!markup) return null;

  return (
    <>
      <Curtains content={markup.curtains} />
      <StartScreen content={markup.start} />
      <CountdownScreen content={markup.count} />
      <BreatheScreen content={markup.breathe} />
      <MoveScreen content={markup.move} />
      <FocusScreen content={markup.focus} />
      <PreEndScreen content={markup.preend} />
      <EndingScreen content={markup.ending} />
    </>
  );
}
