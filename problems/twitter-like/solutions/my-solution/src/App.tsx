import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { debounce } from "./utils/utils";

function LikeButtonSVG({
  width,
  height,
  isLiked,
  onClick,
}: {
  width: number;
  height: number;
  isLiked: boolean;
  onClick: () => void;
}) {
  return (
    <svg
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isLiked ? "red" : "none"}
      stroke={!isLiked ? "white" : "none"}
      strokeWidth={1}
      width={width}
      height={height}
      focusable="false"
      onClick={onClick}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function App() {
  const [isLiked, setIsLiked] = useState(false);
  const debouncedLike = useRef(
    debounce((liked: boolean) => {
      setIsLiked(liked);
    }, 500)
  );

  const handleLike = () => {
    console.log("handleLike");
    debouncedLike.current(!isLiked);
  };

  useEffect(() => {
    console.log("isLiked : ", isLiked);
  }, [isLiked]);

  return (
    <main className="bg-gray-400 h-full">
      <LikeButtonSVG
        width={50}
        height={50}
        isLiked={isLiked}
        onClick={handleLike}
      />
    </main>
  );
}
