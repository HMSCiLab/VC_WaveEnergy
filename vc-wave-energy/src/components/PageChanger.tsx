import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import usePageChangeLogic from "../page-logic/pageChangeLogic";

function PageChanger() {
  const { pageNumber, changeRight, changeLeft } = usePageChangeLogic();

  return (
    <div className="flex flex-row ml-auto items-center justify-end">
      <button className={`${pageNumber === "2" ? "visible" : "invisible" }`} onClick={changeLeft}>
        <ArrowLeftIcon className="text-white size-20" />
      </button>
      <span className="flex text-white text-5xl mx-8">{pageNumber}/2</span>
      <button className={`${pageNumber === "1" ? "visible" : "invisible" }`} onClick={changeRight}>
        <ArrowRightIcon className="text-white size-20" />
      </button>
    </div>
  );
}

export default PageChanger;
