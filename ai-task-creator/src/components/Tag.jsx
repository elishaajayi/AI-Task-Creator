import React from "react";
import "./Tag.css";

const Tag = ({ tagName, selectTag, selected }) => {
  // Define color schemes for each priority level
  const tagColors = {
    high: { backgroundColor: "#d85d56" },
    medium: { backgroundColor: "#ffae0b" },
    low: { backgroundColor: "#74d510" },
    default: { backgroundColor: "#f9f9f9" },
  };

  // Convert tagName to lowercase and get the corresponding color scheme
  const tagColor = tagColors[tagName.toLowerCase()] || tagColors.default;

  return (
    <button
      type="button"
      className="tag"
      style={selected ? { ...tagColor, color: "white" } : tagColor}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  );
};

export default Tag;
