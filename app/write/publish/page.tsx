"use client";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { postState } from "../../../recoil/atoms";

const Publish = () => {
  const [post, setPost] = useRecoilState(postState);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [urlValue, setUrlValue] = useState<string>(post.title);

  // 글자 수 카운트를 위한 상수
  const maxLength = 150;

  // 텍스트 변경 핸들러
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  // URL 입력 변경 핸들러
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };

  // 공개 상태 변경 핸들러
  const handlePublicStatusChange = (status: boolean) => {
    setPost(prevPost => ({
      ...prevPost,
      public_status: status
    }));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[768px] flex ">
        <div className="flex-1">
          <h3 className="text-[21px] font-semibold mt-0 mb-2 leading-6">
            포스트 미리보기
          </h3>
          <div className="contents">
            <div className="w-full pt-[55%] relative">
              <div className="w-full h-full absolute left-0 top-0 shadow-[0px_0px_4px_rgba(0,0,0,0.03)]">
                <div className="bg-[#e9ecef] w-full h-full flex justify-center items-center flex-col">
                  <svg width="107" height="85" fill="none" viewBox="0 0 107 85">
                    <path
                      fill="#868E96"
                      d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"
                    ></path>
                    <path
                      fill="#868E96"
                      d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"
                    ></path>
                  </svg>
                  <button className="mt-4 px-8 py-1 bg-white text-base font-bold text-[#20c997] hover:opacity-80 delay-75">
                    썸네일 업로드
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mt-0 mb-2 leading-6">
                {"안녕하세요"}
              </h4>
              <textarea
                placeholder="당신의 포스트를 짧게 소개해보세요"
                value={textareaValue}
                onChange={handleTextareaChange}
                className="resize-none w-full h-32 outline-none shadow-[0px_0px_4px_rgba(0,0,0,0.03)] p-3 text-sm"
              ></textarea>
              <div className="text-right mt-1 text-xs text-[#868e96]">
                {`${textareaValue.length}/${maxLength}`}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1px] min-h-[425px] mx-8 bg-[#e9ecef]"></div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <section>
              <h3 className="text-[21px] font-semibold mt-0 mb-2 leading-6">
                공개설정
              </h3>
              <div className="flex">
                <button
                  className={`flex-1 h-12 inline-flex items-center justify-start pl-4 border text-[14px] font-bold rounded-[4px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] ${
                    post.public_status
                      ? "border-[#20c997] text-[#20c997]"
                      : "border-[#868e96] text-[#868e96]"
                  }`}
                  onClick={() => handlePublicStatusChange(true)}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.243 22.212a10.209 10.209 0 0 1-6.03-2.939A10.218 10.218 0 0 1 1.714 12c0-2.473.868-4.813 2.458-6.673.041.492.142 1.019.116 1.395-.094 1.373-.23 2.232.574 3.39.313.451.39 1.098.542 1.62.149.51.744.779 1.155 1.094.828.635 1.62 1.373 2.5 1.932.579.369.941.552.771 1.26-.136.569-.174.92-.469 1.426-.09.155.34 1.15.482 1.292.433.433.862.83 1.333 1.219.732.604-.07 1.389-.42 2.257zm8.516-2.939a10.213 10.213 0 0 1-5.34 2.832c.285-.705.793-1.331 1.264-1.694.409-.316.922-.924 1.136-1.405.213-.48.496-.898.783-1.34.407-.628-1.005-1.577-1.463-1.776-1.03-.447-1.805-1.05-2.72-1.694-.653-.46-1.977.24-2.713-.082-1.009-.44-1.84-1.206-2.716-1.866-.905-.68-.861-1.475-.861-2.48.708.026 1.716-.196 2.187.373.148.18.659.984 1 .698.28-.233-.207-1.168-.3-1.388-.29-.676.658-.94 1.142-1.398.632-.597 1.989-1.535 1.882-1.964-.108-.428-1.358-1.643-2.092-1.453-.11.028-1.078 1.044-1.266 1.203l.015-.994c.004-.21-.39-.424-.372-.56.046-.34.996-.96 1.232-1.232-.165-.103-.73-.588-.9-.517-.415.173-.882.291-1.296.464 0-.144-.017-.279-.038-.412a10.188 10.188 0 0 1 2.614-.758l.812.326.574.68.573.591.5.162.795-.75-.205-.535v-.481c1.572.228 3.057.814 4.357 1.719-.233.02-.488.055-.777.091-.119-.07-.272-.102-.401-.15.376.81.77 1.608 1.169 2.408.426.853 1.372 1.77 1.539 2.67.195 1.063.06 2.028.166 3.278.104 1.204 1.358 2.572 1.358 2.572s.579.197 1.06.128a10.222 10.222 0 0 1-2.698 4.734z"
                    ></path>
                  </svg>
                  <span className="flex-1 flex justify-center items-center">
                    전체 공개
                  </span>
                </button>
                <button
                  className={`flex-1 h-12 inline-flex items-center justify-start ml-4 pl-4 border text-[14px] font-bold rounded-[4px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] ${
                    !post.public_status
                      ? "border-[#20c997] text-[#20c997]"
                      : "border-[#868e96] text-[#868e96]"
                  }`}
                  onClick={() => handlePublicStatusChange(false)}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M17.625 9H16.5V6.81c0-2.47-1.969-4.522-4.44-4.56a4.514 4.514 0 0 0-4.56 4.5V9H6.375A1.88 1.88 0 0 0 4.5 10.875v9a1.88 1.88 0 0 0 1.875 1.875h11.25a1.88 1.88 0 0 0 1.875-1.875v-9A1.88 1.88 0 0 0 17.625 9zm-4.969 5.85v3.225a.672.672 0 0 1-.623.675.657.657 0 0 1-.69-.656V14.85a1.5 1.5 0 0 1-.838-1.486 1.5 1.5 0 1 1 2.152 1.486zM15.187 9H8.814V6.75c0-.848.332-1.645.937-2.25A3.16 3.16 0 0 1 12 3.562a3.16 3.16 0 0 1 2.25.938 3.16 3.16 0 0 1 .938 2.25V9z"
                    ></path>
                  </svg>
                  <span className="flex-1 flex justify-center items-center">
                    비공개
                  </span>
                </button>
              </div>
            </section>
            <section className="mt-6">
              <h3 className="text-[21px] font-semibold mt-0 mb-2 leading-6">
                URL 설정
              </h3>
              <div className="flex bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)] p-3 leading-6">
                <div className="text-[#868e96]">{`/${"userId"}/`}</div>
                <input
                  type="text"
                  value={urlValue}
                  onChange={handleUrlChange}
                  className="text-base outline-none flex-1 leading-6 text-black"
                />
              </div>
            </section>
          </div>
          <div className="flex justify-end mt-2">
            <button className="inline-flex items-center justify-center font-semibold cursor-pointer outline-none border-none bg-none text-[#12b886] rounded-md px-4 py-1.5 text-xl hover:bg-[#E9ECEF] ">
              취소
            </button>
            <button className="inline-flex items-center justify-center font-semibold cursor-pointer outline-none border-none bg-[#12b886] text-white rounded-md px-4 ml-4 py-1.5 text-xl hover:opacity-80 ">
              출간하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
