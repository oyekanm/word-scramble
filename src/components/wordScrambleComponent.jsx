import React, { useState, useEffect } from "react";
import Card from "./card";
import CardContent from "./cardContent";
import CardTitleContainer from "./cardTitleContainer";
import CardTitle from "./cardTitle";
import {scrambleWord} from "../utils"

const WORDS = [
  { word: "REACT", hint: "A JavaScript library for building user interfaces" },
  { word: "JAVASCRIPT", hint: "A popular programming language" },
  { word: "PYTHON", hint: "A snake-like programming language" },
  { word: "TYPESCRIPT", hint: "JavaScript with types" },
  { word: "COMPUTER", hint: "An electronic device for processing data" },
];

export default function WordScrambleComponent() {
  const [currentWordObj, setCurrentWordObj] = useState(null);
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [gameActive, setGameActive] = useState(true);

  const getNewWord = () => {
    if (WORDS.length === 0) {
      setMessage({ type: "error", text: "No words available!" });
      return;
    }
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const newWordObj = WORDS[randomIndex];
    const scrambled = scrambleWord(newWordObj.word);
    setCurrentWordObj(newWordObj);
    setScrambledWord(scrambled);
    setGuess("");
    setShowHint(false);
    setTimeLeft(30);
    setMessage({ type: "", text: "" });
  };

  console.log(scrambledWord, currentWordObj)

  useEffect(() => {
    getNewWord();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim()) {
      setMessage({ type: "error", text: "Please enter a guess!" });
      return;
    }

    if (guess.toUpperCase() === currentWordObj.word) {
      setScore((prev) => prev + Math.ceil(timeLeft / 3));
      setMessage({ type: "success", text: "Correct! Getting next word..." });
      setTimeout(getNewWord, 1500);
    } else {
      setMessage({ type: "error", text: "Try again!" });
    }
  };
  const handleRestartGame = () => {
    setScore(0);
    setGameActive(true);
    getNewWord();
  };
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);
  return (
    <Card clx="w-full max-w-[600px] mx-auto">
      <CardTitleContainer>
        <CardTitle text={"Word Scramble Game"}/>
      </CardTitleContainer>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">Score: {score}</div>
            <div className="text-lg">Time: {timeLeft}s</div>
          </div>

          <div className="text-center text-2xl font-bold py-4">
            {scrambledWord}
          </div>

          {showHint && (
                <div className="text-sm text-gray-600 text-center">
                  Hint: {currentWordObj.hint}
                </div>
              )}
    
              {message.text && (
                <span className={message.type === 'error' ? 'bg-red-100' : 'bg-green-100'}>
                 {message.text}
                </span>
              )}

          {gameActive ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value.toUpperCase())}
                placeholder="Enter your guess"
                className="text-center"
                data-testid="guess-input"
              />

              <div className="flex gap-2 justify-center">
                <button type="submit" data-testid="submit-guess">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  variant="outline"
                  data-testid="show-hint"
                >
                  Show Hint
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-xl font-bold">Game Over!</div>
              <div>Final Score: {score}</div>
              <button onClick={handleRestartGame} data-testid="restart-game">
                Play Again
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function WordScramble() {
  const [currentWordObj, setCurrentWordObj] = useState(null);
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [gameActive, setGameActive] = useState(true);

  const getNewWord = () => {
    if (WORDS.length === 0) {
      setMessage({ type: "error", text: "No words available!" });
      return;
    }
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const newWordObj = WORDS[randomIndex];
    const scrambled = scrambleWord(newWordObj.word);
    setCurrentWordObj(newWordObj);
    setScrambledWord(scrambled);
    setGuess("");
    setShowHint(false);
    setTimeLeft(30);
    setMessage({ type: "", text: "" });
  };

  useEffect(() => {
    getNewWord();
  }, []);

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guess.trim()) {
      setMessage({ type: "error", text: "Please enter a guess!" });
      return;
    }

    if (guess.toUpperCase() === currentWordObj.word) {
      setScore((prev) => prev + Math.ceil(timeLeft / 3));
      setMessage({ type: "success", text: "Correct! Getting next word..." });
      setTimeout(getNewWord, 1500);
    } else {
      setMessage({ type: "error", text: "Try again!" });
    }
  };

  const handleRestartGame = () => {
    setScore(0);
    setGameActive(true);
    getNewWord();
  };

  if (!currentWordObj) return <div>Loading...</div>;
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardTitleContainer>
        <CardTitle className="text-center">Word Scramble Game</CardTitle>
      </CardTitleContainer>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">Score: {score}</div>
            <div className="text-lg">Time: {timeLeft}s</div>
          </div>

          <div className="text-center text-2xl font-bold py-4">
            {scrambledWord}
          </div>

          {/* {showHint && (
                <div className="text-sm text-gray-600 text-center">
                  Hint: {currentWordObj.hint}
                </div>
              )}
    
              {message.text && (
                <Alert className={message.type === 'error' ? 'bg-red-100' : 'bg-green-100'}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )} */}

          {gameActive ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value.toUpperCase())}
                placeholder="Enter your guess"
                className="text-center"
                data-testid="guess-input"
              />

              <div className="flex gap-2 justify-center">
                <button type="submit" data-testid="submit-guess">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  variant="outline"
                  data-testid="show-hint"
                >
                  Show Hint
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-xl font-bold">Game Over!</div>
              <div>Final Score: {score}</div>
              <button onClick={handleRestartGame} data-testid="restart-game">
                Play Again
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
