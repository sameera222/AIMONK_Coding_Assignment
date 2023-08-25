import "./App.css";
import { useState } from "react";
import TagView from "./TagView";

const App = () => {
  const [tree, setTree] = useState({
    name: "root",
    children: [
      {
        name: "child1",
        children: [
          { name: "child1-child1", data: "c1-c1 Hello" },
          { name: "child1-child2", data: "c1-c2 JS" },
        ],
      },
      { name: "child2", data: "c2 World" },
    ],
  });
  const [exportedData, setExportedData] = useState("");

  const handleAddChild = (parent) => {
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push({ name: "New Child", data: "Data" });
    setTree({ ...tree });
  };

  const handleTagChange = (tag, value, save = true) => {
    if (tag.data !== undefined) {
      tag.data = value;
    } else {
      tag.name = value;
    }

    if (save) {
      setTree({ ...tree });
    }
  };

  const handleExport = () => {
    const exportedTree = JSON.stringify(tree, ["name", "children", "data"], 2);
    setExportedData(exportedTree);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-0 m-4 w-1/2">
        <TagView
          tag={tree}
          onAddChild={handleAddChild}
          onTagChange={handleTagChange}
        />
      </div>
      <button
        className="export-button bg-gray-200 border border-gray-200 p-2 w-20"
        onClick={handleExport}
      >
        Export
      </button>
      <div className="mt-4  p-2">
        <pre>{exportedData}</pre>
      </div>
    </div>
  );
};

export default App;
