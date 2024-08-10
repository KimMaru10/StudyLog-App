"use client";
import React, { useState } from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import Image from "next/image";
import arrowLeft from "../../public/assets/imgs/arrow-left-long.svg";
import { useRouter } from "next/navigation";
const Write = () => {
  const [content, setContent] = useState<string | undefined>(undefined);
  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  const handleAddTag = () => {
    if (tagName) {
      setTags([...tags, tagName]);
      setTagName("");
    }
  };
  const handleCallBack = () => {
    router.push("/");
  };
  return (
    <div className="w-full h-full bg-white ">
      <form className="pt-7">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="outline-none h-[66px] text-[2.75rem]"
        />
        <div className="w-[4rem] h-[6px] bg-[#495057] mt-[1.5rem] mb-[1rem]"></div>
        <div className="mt-[20px]">
          <input
            type="text"
            className="outline-none "
            value={tagName}
            onChange={handleTagNameChange}
            placeholder="태그 이름을 입력하세요"
            style={{ marginRight: "10px" }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="inline-flex items-center h-8 rounded-md bg-[#12b886] text-white p-2"
          >
            태그 추가
          </button>
        </div>
        <div className="mt-[20px] flex">
          {tags.map((tag, index) => {
            const TagComponent = React.createElement(
              tag,
              { key: index },
              `${tag}`
            );
            return (
              <div
                className="inline-flex items-center h-[2rem] rounded-2xl p-4 mr-3 mb-3 bg-[#f8f9fa] text-[#12B886]"
                key={index}
              >
                {TagComponent}
              </div>
            );
          })}
        </div>
        <MarkdownEditor value={content} onChange={setContent} />
        <div className="flex justify-between items-center h-16 ">
          <button
            className="flex items-center px-4 py-2 h-9 rounded-md hover:bg-[#DEE2E6] opacity-50"
            onClick={handleCallBack}
          >
            <Image src={arrowLeft} alt="arrow-left" className="mr-2" />
            <span>나가기</span>
          </button>
          <div className="flex items-center">
            <button className="h-9 px-5 rounded-md hover:bg-[#DEE2E6] opacity-50">
              임시저장
            </button>
            <button className="h-9 px-5 rounded-md ml-3 bg-[#12b866] text-white hover:opacity-50">
              출간하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Write;
