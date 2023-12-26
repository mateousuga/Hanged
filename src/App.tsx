import { useEffect, useState } from 'react'
import './App.css'
import { HangImage } from './components/HangImage'
import {letters} from './helpers/letters' 
import { getWords } from './helpers/getWords';

function App() {

  const [ word, setWord ] = useState( getWords() );
  const [ hiddenWord, setHiddenWord ] = useState("_ ".repeat(word.length));
  const [ attemps, setattemps ] = useState(0);
  const [ lose, setLose ] = useState(false);
  const [ win, setWin ] = useState(false);

  // Detectar si el usuario perdio
    useEffect(() => {
    if ( attemps >= 9 ){
      setLose(true);
    }
  }, [attemps])

  // Detectar si el usuario gano
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if ( currentHiddenWord === word ){
      setWin(true);
    }
  }, [hiddenWord])

  const chackLetter = (letter: string) => {

    if ( lose ) return;

    if ( !word.includes(letter) ){
    setattemps(Math.min(attemps + 1, 9)); 
    return;
    }

    const hiddenWordArray = hiddenWord.split(" ");

    for (let i = 0; i < word.length; i++) {
      if ( word[i] === letter ){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(" "));
  }

  const newGame = () => {

    const newWord = getWords();
    setWord(newWord);
    setHiddenWord("_ ".repeat(newWord.length));
    setattemps(0);
    setLose(false);
    setWin(false);
  }

  return (
    <div className="App">

      {/* imagenes */}
      <HangImage imageNumber={ attemps }/>

      {/* palabra oculta */}
      <h3>{hiddenWord}</h3>

      {/* contador de intentos */}
      <h3>intentos: {attemps} </h3>

      {/* mensaje de derrota */}
      { 
        ( lose ) ? 
        <h2>Perdiste, la palabras era: { word } </h2>  
        : "" }

      {/* mensaje de victoria */}
      { 
        ( win ) ? 
        <h2>Ganaste!! </h2>  
        : "" }

      {/* botones de letras */}
      {
        letters.map((letter) => (
        <button
          onClick={ () => chackLetter(letter)}
          key= { letter }>
            { letter }
        </button>
        ))
      }
      <br />
      <button onClick={ newGame } >Jugar de nuevo</button>
    </div>
  )
}

export default App
