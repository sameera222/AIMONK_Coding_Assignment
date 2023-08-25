import React, { useState } from "react";

const TagView = ({ tag, onAddChild, onTagChange}) => {
    
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="mt-2">
      <div
        className={`border border-blue-400 ${
          tag === null ? "bg-blue-400" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-4 bg-blue-400 border border-blue-400 p-2 ">
          {tag && (
            <button
              className="mr-2 text-sm bg-gray-200 border border-gray-200 rounded w-16 p-2"
              onClick={handleCollapse}
            >
              {collapsed ? ">" : "v"}
            </button>
          )}
          {tag && (
            <div
              className={`tag-name ${
                tag === null ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => onTagChange(tag, tag.name, false)}
            >
              {tag.name}
            </div>
          )}

          {tag && (
            <button
              className="ml-auto text-sm bg-gray-200  border border-gray-200 rounded w-24 p-2"
              onClick={() => onAddChild(tag)}
            >
              Add Child
            </button>
          )}
        </div>
        {!collapsed && tag && (
          <div
            className={`mt-2 mr-2 mb-2 ml-2 ${
              tag === null ? "border border-blue-400 p-2" : ""
            }`}
          >
            {tag.data !== undefined && (
              <div className="flex flex-row gap-2 p-2 border border-white">
                <div className="flex flex-row items-start text-sm p-2 text-gray-600">
                  Data
                </div>
                <input
                  className="w-1/2 text-sm border rounded p-1 border-gray-300 flex"
                  type="text"
                  value={tag.data}
                  onChange={(e) => {
                    const newData = e.target.value;
                    onTagChange(tag, newData);
                  }}
                />
              </div>
            )}
            {tag.children &&
              tag.children.map((child) => (
                <TagView
                  key={child.name}
                  tag={child}
                  onAddChild={onAddChild}
                  onTagChange={onTagChange}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagView;
