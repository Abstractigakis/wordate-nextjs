import Button from "@components/common/Button";
import Defn from "@components/app/Wordate/Defn";
import Title from "@components/common/Typography/Title";

const Congrats = ({ solveObj }) => {
  const s = solveObj.createSolves;

  return (
    <div>
      <Title text={"⚡🔥 Congratulations 🔥⚡"} />
      <div className="m-2">
        You won in{" "}
        <span className="text-yellow-300">{s.wordations} wordations</span>, with{" "}
        <span className="text-red-600">{s.errors} errors</span> for a{" "}
        <span className="text-green-600">total score of {s.score}</span>
      </div>
      <div className="grid place-items-center text-lg">Your solve:</div>
      <div className="flex flex-wrap justify-center overflow-y-scroll max-h-60">
        {s.wordationStack.map((w, i) => (
          <>
            {i > 0 && (
              <Button type={"secondary"} disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            )}
            <Defn key={`word_${w}_${i}`} word={w} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Congrats;
