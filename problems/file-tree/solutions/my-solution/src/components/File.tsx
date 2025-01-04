import React from "react";
interface FileProps {
  data: {
    name: string;
    type: string;
  };
}
const File = ({ data }: FileProps) => {
  return <div className="ml-2">{data?.name}</div>;
};

export default File;
