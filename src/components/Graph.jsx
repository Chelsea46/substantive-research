import { useContext } from "react";
import { GraphContext } from "../context/GraphContext";

export default function Graph(){

  const {interactionsData} = useContext(GraphContext);

  console.log(interactionsData);



  return(
    <>
    </>
  )
}
