import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

interface TrafficLightsProps {
  classNme: string;
}

const TrafficLights = ({ classNme }: TrafficLightsProps) => {
  const [selectedColor, setSelectedColor] = useState("green");
  //red --> yellow -> green
  useEffect(() => {
    let timer;
    if (selectedColor === "green") {
      timer = setTimeout(() => {
        setSelectedColor("yellow");
      }, 2000);
    } else if (selectedColor === "yellow") {
      timer = setTimeout(() => {
        setSelectedColor("red");
      }, 2000);
    } else {
      timer = setTimeout(() => {
        setSelectedColor("green");
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [selectedColor]);

  return (
    <div
      className={cn(
        "wrapper flex flex-col gap-4 bg-black p-4 rounded-[2rem] w-fit",
        classNme
      )}
    >
      <div className={`circle ${selectedColor === "red" ? "red" : ""}`}></div>
      <div
        className={`circle ${selectedColor === "yellow" ? "yellow" : ""}`}
      ></div>
      <div
        className={`circle ${selectedColor === "green" ? "green" : ""}`}
      ></div>
    </div>
  );
};

export default TrafficLights;
