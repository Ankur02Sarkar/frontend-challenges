/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "./styles.css";
// import WebHearts from "./Web Hearts (2900×100).png";
// import WebHearts from "https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png"; // 2900 x 100

const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: T) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

function LikeButton({
  isLiked,
  setIsLiked,
}: {
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const debouncedLike = useRef(
    debounce((liked: boolean) => {
      setIsLiked(liked);
    }, 500)
  );
  const handleLike = () => {
    debouncedLike.current(!isLiked);
  };
  useEffect(() => {
    console.log("isLiked : ", isLiked);
  }, [isLiked]);
  return (
    <div
      className={`flex flex-row items-center justify-center h-screen gap-2 cursor-pointer heart ${
        isClicked && isLiked ? "likeBurst" : ""
      } ${isLiked ? "heart-filled" : ""}`}
      onClick={() => {
        setIsClicked(true);
        handleLike();
      }}
    ></div>
  );
}

export default function App() {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(7);

  return (
    <main>
      <LikeButton setIsLiked={setIsLiked} isLiked={isLiked} />
      {count + Number(isLiked)}
    </main>
  );
}
