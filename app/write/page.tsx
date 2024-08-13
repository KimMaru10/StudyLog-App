"use client";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { postState } from "../../recoil/atoms";
import MarkdownEditor from "../components/MarkdownEditor";
import Image from "next/image";
import arrowLeft from "../../public/assets/imgs/arrow-left-long.svg";
import { useRouter } from "next/navigation";

const Write = () => {
  const [post, setPost] = useRecoilState(postState);
  const [tagName, setTagName] = useState("");
  const router = useRouter();

  const handleTagNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  const handleAddTag = () => {
    if (tagName) {
      setPost((prev) => ({ ...prev, tags: [...prev.tags, tagName] }));
      setTagName("");
    }
  };

  const handlePublish = () => {
    router.push("/write/publish");
  };

  return (
    <div className="w-full h-full bg-white">
      <form className="pt-7" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="outline-none h-[66px] text-[2.75rem]"
          value={post.title}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <div className="w-[4rem] h-[6px] bg-[#495057] mt-[1.5rem] mb-[1rem]"></div>
        <div className="mt-[20px]">
          <input
            type="text"
            className="outline-none w-[200px]"
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
          {post.tags.map((tag, index) => (
            <div
              className="inline-flex items-center h-[2rem] rounded-2xl p-4 mr-3 mb-3 bg-[#f8f9fa] text-[#12B886]"
              key={index}
            >
              {tag}
            </div>
          ))}
        </div>
        <MarkdownEditor
          value={post.content}
          onChange={(value) =>
            setPost((prev) => ({ ...prev, content: value || "" }))
          }
        />
        <div className="flex justify-between items-center h-16 ">
          <button
            className="flex items-center px-4 py-2 h-9 rounded-md hover:bg-[#DEE2E6] opacity-50"
            onClick={() => router.push("/")}
          >
            <Image src={arrowLeft} alt="arrow-left" className="mr-2" />
            <span>나가기</span>
          </button>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handlePublish}
              className="h-9 px-5 rounded-md ml-3 bg-[#12b866] text-white hover:opacity-50"
            >
              출간하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Write;
