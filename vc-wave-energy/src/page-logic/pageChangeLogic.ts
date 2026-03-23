import { useState } from "react"
import { useAppContext } from "../AppContext";

const usePageChangeLogic = () => {
    const {learnPageOne, setLearnPageOne} = useAppContext();
    const pageNumbers = {one: "1", two: "2"};
    const [pageNumber, setPageNumber] = useState<string>(pageNumbers.one);
    const changeRight = (): void => {
        if (learnPageOne) {
            setLearnPageOne(prev => !prev);
            setPageNumber(pageNumbers.two);
        }
    }
    const changeLeft = (): void => {
        if (!learnPageOne) {
            setLearnPageOne(prev => !prev);
            setPageNumber(pageNumbers.one);
        }
    }

    return {pageNumber, changeRight, changeLeft}
}

export default usePageChangeLogic;