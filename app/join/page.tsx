import React from "react";
import Link from "next/link";
const Join = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className=" w-[460px] h-full flex flex-col items-center ">
        <div className="w-full h-hull pt-[100px]">
          <div className="w-full h-[100px] flex justify-center items-center border-b-2 border-[#C8C8C8]">
            <p className="font-hack-bold text-[40px] ">StudyLog</p>
          </div>
          <div className="w-full h-[100px] flex justify-center items-center">
            <p className="text-[30px] font-semibold">회원가입</p>
          </div>
        </div>

        <form className="w-full ">
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              이메일
            </p>
            <input
              type="text"
              placeholder="이메일을 입력하세요."
              className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
            />
          </div>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              비밀번호
            </p>
            <input
              type="text"
              placeholder="비밀번호를 입력하세요."
              className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
            />
          </div>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              비밀번호 확인
            </p>
            <input
              type="text"
              placeholder="비밀번호를 다시 입력하세요."
              className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
            />
          </div>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              사용자ID
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="사용자ID를 입력하세요."
                className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
              />
              <button className="w-[65px] bg-[#12B886] text-white ml-3 rounded-[5px] text-xs">
                중복확인
              </button>
            </div>
          </div>
          <div className="w-full mb-5">
            <p className="text-[#989898] font-semibold text-base mb-2">
              한줄 소개
            </p>
            <input
              type="text"
              placeholder="당신을 한줄로 소개해보세요."
              className="w-full h-[45px] p-2 rounded-[5px] border-[1px] border-[#D7D7D7]"
            />
          </div>
          <div className="flex items-center w-full mb-5">
            <input type="checkbox" />
            <Link href="policy/terms" className="ml-2 text-[#12B886] text-sm">
              이용약관
            </Link>
            <p className="text-sm">과&nbsp;</p>
            <Link href="policy/privacy" className="text-[#12B886] text-sm">
              개인정보취급방침
            </Link>
            <p className="text-sm">에 동의합니다.</p>
          </div>
          <div className="flex justify-between">
            <button className="w-[48%] h-[45px] bg-[#ffffff] text-black rounded-[30px] border-[1px] border-[#D7D7D7]">
              취소하기
            </button>
            <button className="w-[48%] h-[45px] bg-[#12B886] text-white rounded-[30px]">
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
