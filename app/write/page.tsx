"use client";
import React, { useState } from "react";
import MarkdownEditor from "../components/MarkdownEditor";

const Write = () => {
  const [content, setContent] = useState<string | undefined>(undefined);
  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  const handleAddTag = () => {
    if (tagName) {
      setTags([...tags, tagName]);
      setTagName("");
    }
  };

  return (
    <div>
      <form>
        <input type="text" placeholder="제목을 입력하세요" />
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={tagName}
            onChange={handleTagNameChange}
            placeholder="태그 이름을 입력하세요"
            style={{ marginRight: "10px" }}
          />
          <button type="button" onClick={handleAddTag}>
            태그 추가
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          {tags.map((tag, index) => {
            const TagComponent = React.createElement(
              tag,
              { key: index },
              `[${tag}]`
            );
            return <div key={index}>{TagComponent}</div>;
          })}
        </div>
        <MarkdownEditor value={content} onChange={setContent} />
      </form>
    </div>
  );
};

export default Write;
