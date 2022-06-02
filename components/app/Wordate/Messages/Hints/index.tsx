const Hints = () => {
  const hintsList = [
    "Consider Common letters",
    "Attention to vowel locations",
    "Don't rush to goal at first",
    "Think of second last words",
  ];
  return (
    <div className="m-1 grid place-items-center">
      <div className="m-2 grid place-items-center text-yellow-300">Hints</div>
      <div className="text-sm max-w-[290px]">
        <div className="m-2 grid place-items-center">No Hints Allowed!</div>
        <div className="p-2 m-2 grid place-items-center">
          <p className="text-yellow-300">General Tips:</p>
          <ol>
            {hintsList.map((h, i) => {
              return (
                <li className="m-2 " key={i}>
                  {i + 1}. {h}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Hints;
