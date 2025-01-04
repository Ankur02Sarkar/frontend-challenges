import Folder from "./components/Folder";
import "./styles.css";

export default function App() {
  const fileTreeData = [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "index.ts",
          type: "file",
        },
        {
          name: "app",
          type: "folder",
          children: [
            {
              name: "app.tsx",
              type: "file",
            },
          ],
        },
        {
          name: "styles.css",
          type: "file",
        },
        {
          name: "utils",
          type: "folder",
          children: [
            {
              name: "utils.ts",
              type: "file",
            },
          ],
        },
      ],
    },
    {
      name: "README.md",
      type: "file",
    },
  ];
  return (
    <main className="h-full">
      <Folder data={fileTreeData} />
    </main>
  );
}
