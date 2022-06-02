import {
  IFaunaPuzzle,
  IFaunaSolve,
  IFaunaSolveData,
  IFaunaUser,
} from "@lib/faunadb/types";
import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import WORDS_4 from "@data/4/W.json";
import WORDS_5 from "@data/5/W.json";
import WORDS_6 from "@data/6/W.json";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import { KEY_ROWS } from "@lib/utils/constants";
import toast from "react-hot-toast";
import WinningCarousel from "../WinningCarousel";
import { postSolve } from "@lib/axios/api";
import Defn from "../Defn";
import Hints from "../Messages/Hints";
import HowToPlay from "../Messages/HowToPlay";
import KeyboardLetter from "../KeyboardLetter";
import GameStateLetter from "../GameStateLetter";
import GameHud from "../GameHub";
import { shootFireworks } from "@lib/fireworks";

export interface IGameProps {
  faunaPuzzle: IFaunaPuzzle;
  faunaUser: IFaunaUser;
  setView: Function;
}

const Game: FC<IGameProps> = ({ faunaPuzzle, faunaUser, setView }) => {
  const [score, setScore] = useState<number>(0);
  const [wordations, setWordations] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [errorStack, setErrorStack] = useState<string[]>([]);
  const firstWord = faunaPuzzle.wi;
  const finalWord = faunaPuzzle.wj;
  const ALL_WORDS =
    finalWord.length === 5
      ? WORDS_5
      : finalWord.length === 6
      ? WORDS_6
      : WORDS_4;
  const [currWord, setCurrWord] = useState<string>(firstWord);
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(
    null
  );
  const [badWord, setBadWord] = useState<boolean>(false);
  const [wordationStack, setWordationStack] = useState<string[]>([firstWord]);
  const [gameStack, setFullGameStack] = useState<string[]>([firstWord]);
  const [solveObj, setSolveObj] = useState<IFaunaSolve | null>(null);
  const [disableUI, setDisableUI] = useState<boolean>(false);

  const [erroring, setErroring] = useState<boolean>(true);
  const [scoring, setScoring] = useState<boolean>(true);
  const [winning, setWinning] = useState<boolean>(true);
  const [showHints, setShowHints] = useState(true);
  const howToPlayState = useState<boolean>(false);

  const queryClient = useQueryClient();

  const insertSolveMutation = useMutation(postSolve, {
    onSuccess: (data: IFaunaSolve) => {
      setSolveObj(data);
      queryClient.invalidateQueries(["get-puzzle", faunaPuzzle.date]);
      queryClient.invalidateQueries(["get-self", faunaUser.email]);
    },
  });

  const wordateWin = async () => {
    const newSolveData: IFaunaSolveData = {
      gameStack: [...gameStack],
      score,
      errorStack: [...errorStack],
      errors,
      wordationStack: [...wordationStack],
      wordations,
      userId: faunaUser._id,
      puzzleId: faunaPuzzle._id,
    };

    insertSolveMutation.mutate(newSolveData);

    // let newQuestWords4 = gameStack;
    // newQuestWords4 = newQuestWords4.filter((w) => !ALL_WORDS.includes(w));
    // newQuestWords4 = newQuestWords4.filter((w, index) => {
    //   return newQuestWords4.indexOf(w) === index;
    // });
  };

  const restart = () => {
    setDisableUI(false);
    setBadWord(false);
    setSelectedLetterIndex(null);
    setCurrWord(firstWord);
    setWordationStack([firstWord]);
    setFullGameStack([firstWord]);
    setErrorStack([]);
    setSolveObj(null);
    setScoring(true);
    setErroring(true);
    setScore(0);
    setWordations(0);
    setErrors(0);
  };

  useEffect(() => {
    restart();
    setCurrWord(firstWord);
  }, [firstWord]);

  const wordationWinAnim = (newWord: string) => {
    toast.success(`WINNER!`);

    shootFireworks({ duration: 3000 });

    setWinning(false);
    setTimeout(() => {
      setWinning(true);
      setDisableUI(false);
      setSelectedLetterIndex(null);
      wordateWin();
    }, 200);
  };

  const wordationScoreAnim = (newWord: string) => {
    toast.success(`Score! ${newWord}`, {
      duration: 1400,
      position: "bottom-left",
    });

    setScoring(false);
    setScore((p) => p + 1);

    setWordations((p) => p + 1);
    setTimeout(() => {
      setScoring(true);
      setDisableUI(false);
      setSelectedLetterIndex(null);
    }, 400);
  };

  const wordationErrorAnim = (newWord: string) => {
    toast.error(`${newWord} not a word`, {
      duration: 1400,
      position: "bottom-right",
    });

    setErroring(false);
    setErrors((p) => p + 1);
    setScore((p) => p + 1);
    setTimeout(() => {
      setErroring(true);
    }, 400);

    setBadWord(true);
    setErrorStack((wp) => [...wp, newWord]);
    setTimeout(() => {
      setWordationStack((w) => {
        setCurrWord(w[w.length - 2]);
        return w.slice(0, w.length - 1);
      });
      setBadWord(false);
      setDisableUI(false);
      setSelectedLetterIndex(null);
    }, 1200);
  };

  const isWord = (word: string): boolean => {
    return ALL_WORDS.includes(word.toUpperCase());
  };

  const lockInLetter = (letter: string): void => {
    if (selectedLetterIndex == null) {
      // need to selc index
      setSelectedLetterIndex(null);
      toast.error("select the letter of the word you wish to change first");
      return;
    }

    let newWord =
      currWord.substring(0, selectedLetterIndex) +
      letter +
      currWord.substring(selectedLetterIndex + 1, currWord.length);

    setDisableUI(true);
    setSelectedLetterIndex(null);
    setCurrWord(newWord);
    setWordationStack((w) => [...w, newWord]);
    setFullGameStack((w) => [...w, newWord]);

    if (!isWord(newWord)) {
      wordationErrorAnim(newWord);
    } else {
      wordationScoreAnim(newWord);
      if (newWord === finalWord) {
        wordationWinAnim(newWord);
      }
    }
  };

  return (
    <div className="grid place-items-center align-baseline my-4">
      <GameHud
        firstWord={firstWord}
        finalWord={finalWord}
        scoring={scoring}
        erroring={erroring}
        score={score}
        errors={errors}
      />

      {/* Game State */}
      <div>
        <div className="h-52 inline-flex flex-col-reverse overflow-y-auto max-h-80">
          {[...wordationStack].reverse().map((word, index) => {
            if (index == 0) return null;
            return (
              <div key={index} className={`flex justify-center items-center `}>
                {word.split("").map((letter, i) => {
                  return (
                    <GameStateLetter
                      key={"letter_" + i}
                      badWord={false}
                      selected={
                        [...wordationStack].reverse()[index - 1][i] !==
                        [...wordationStack].reverse()[index][i]
                      }
                      correct={finalWord[i] == letter}
                      disabled={true}
                      onClick={() => setSelectedLetterIndex(i)}
                    >
                      {letter}
                    </GameStateLetter>
                  );
                })}
                <Defn word={word} />
              </div>
            );
          })}
        </div>
        <div className="mb-6">
          <div className={`flex justify-items-center items-center `}>
            {currWord.split("").map((letter, i) => (
              <GameStateLetter
                key={"letter_" + i}
                badWord={badWord}
                selected={i == selectedLetterIndex}
                correct={finalWord[i] == letter}
                disabled={disableUI}
                onClick={() => setSelectedLetterIndex(i)}
              >
                {letter}
              </GameStateLetter>
            ))}
            <Defn word={currWord} />
          </div>
        </div>
      </div>

      {/* keyboard */}
      <div className="grid place-items-center">
        {KEY_ROWS.map((keyRow, i) => {
          return (
            <div key={"kb_row_" + i}>
              {keyRow.split("").map((letter, j) => (
                <KeyboardLetter
                  disabled={disableUI}
                  key={"kb_letter_" + j}
                  selected={selectedLetterIndex != null}
                  onClick={() => lockInLetter(letter)}
                >
                  {letter}
                </KeyboardLetter>
              ))}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-1">
        <div className="flex">
          <Button
            disabled={disableUI}
            type="red"
            onClick={() => howToPlayState[1](true)}
            text={"Help"}
            svgEl={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />

          <Modal state={howToPlayState}>
            {showHints ? <Hints /> : <HowToPlay />}
            <div className="m-2 p-2 grid place-items-center">
              <Button
                onClick={() => setShowHints((p) => !p)}
                text={showHints ? "Rules" : "Hints"}
              />
            </div>
          </Modal>

          <Button disabled={disableUI} type="red" onClick={() => restart()}>
            Restart ↺
          </Button>
        </div>
      </div>

      {solveObj && (
        <WinningCarousel
          faunaUser={faunaUser}
          solveObj={solveObj}
          faunaPuzzle={faunaPuzzle}
          restart={restart}
          setView={setView}
        />
      )}
    </div>
  );
};

export default Game;
