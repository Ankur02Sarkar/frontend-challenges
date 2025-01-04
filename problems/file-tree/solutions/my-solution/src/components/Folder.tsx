import React, { useEffect, useState } from "react";
import File from "./File";

interface ItemProps {
  name: string;
  type: string;
  children?: ItemProps[];
}

interface FolderProps {
  data: ItemProps[];
}
const FolderItem = ({ item }: { item: ItemProps }) => {
  useEffect(() => {
    console.log("item : ", item);
  }, [item]);
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <div className="ml-2">
        <span onClick={() => setShowMore(!showMore)}>
          {item.name} {showMore ? "-" : "+"}{" "}
        </span>
        {showMore && item.children && <Folder data={item.children} />}
      </div>
    </div>
  );
};

const Folder = ({ data }: FolderProps) => {
  useEffect(() => {
    console.log("data : ", data);
  }, [data]);

  return (
    <div className="ml-2">
      {data.map((item, idx) => (
        <div key={idx} className="cursor-pointer">
          {item.type === "folder" && <FolderItem item={item} />}
          {item.type === "file" && <File data={item} />}
        </div>
      ))}
    </div>
  );
};

export default Folder;
