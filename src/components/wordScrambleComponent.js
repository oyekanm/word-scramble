import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeaderContainer, CardTitle } from "./card";


export default function WordScramble() {
  const [currentWordObj, setCurrentWordObj] = useState(null);
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeaderContainer>
        <CardTitle className="text-center">Word Scramble Game</CardTitle>
      </CardHeaderContainer>
      <CardContent>
        <div className="space-y-4">
          <p>implementations here</p>
        </div>
      </CardContent>
    </Card>
  );
}
