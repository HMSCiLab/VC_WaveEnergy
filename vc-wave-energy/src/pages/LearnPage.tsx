import { Link } from "react-router-dom";
import bgImage from "../assets/background-ocean.jpg";
import { XMarkIcon } from "@heroicons/react/16/solid";
import LearnPage1Copy from "../components/LearnPage1Copy";
import LearnPage2Copy from "../components/LearnPage2Copy";
import PageChanger from "../components/PageChanger";
import { useAppContext } from "../AppContext";

function LearnPage() {
  const { learnPageOne } = useAppContext();
  return (
    <div
      className="h-screen overflow-hidden flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-start justify-start gap-5 pt-5 px-5 w-[95vw] h-[95vh] bg-black/50 rounded-2xl">
        <div className="flex flex-row items-center">
          <h1 className="text-white text-6xl">How do waves work?</h1>
          <Link className="ml-75" to="/wave-selector-page">
            <XMarkIcon className="text-white size-20" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {learnPageOne ? <LearnPage1Copy /> : <LearnPage2Copy />}
        </div>
        <div className="flex flex-row ml-auto items-center justify-end"></div>
        <PageChanger />
      </div>
    </div>
  );
}

export default LearnPage;
