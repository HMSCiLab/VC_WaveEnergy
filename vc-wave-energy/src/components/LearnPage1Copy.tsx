import heightChart from "../assets/heightChart.svg";
import periodChart from "../assets/periodChart.svg";

function LearnPage1Copy() {
  return (
    <div className="flex flex-col justify-start gap-8">
      <p className="text-white text-4xl">
        The terms <u>height</u> and <u>period</u> are often used to describe
        ocean waves. The value of each of these properties will determine the
        type of wave created.
      </p>
      <p className="text-white text-4xl">
        <u>Height</u>: Distance from the crest of a wave to its trough.
      </p>
      <img src={heightChart} />
      <p className="text-white text-4xl pt-5">
        <u>Period</u>: Time between the crest or trough of two waves in a set.
      </p>
      <img src={periodChart} />
    </div>
  );
}

export default LearnPage1Copy;
