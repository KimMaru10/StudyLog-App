import React from "react";
import Image from "next/image";
import Link from "next/link";
import testImg from "../../public/assets/imgs/testImg.png";
import userIcon from "../../public/assets/imgs/userIcon.png";
import { formatRelativeTime } from "../../utils/dateUtils";

interface CardProps {
  data: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    userId: string;
    createdAt: string;
    commentCount: number;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  // createdAt을 Date 객체로 변환
  const createdAtDate = new Date(data.createdAt);

  return (
    <div className="bg-white transition-shadow ease-in-out hover:-translate-y-3 rounded-md shadow-md hover:shadow-2xl transform duration-250">
      <Image src={testImg} alt="임시 이미지" className="w-full" />
      <div className="w-full h-[165px] p-4">
        <div className="h-[115px]">
          <h4 className="text-lg font-semibold">{data.title}</h4>
          <div className="mb-6 text-[#495057] text-sm">
            <p>{data.subtitle}</p>
          </div>
        </div>
        <div className="text-[#495057] text-sm">
          <span>{formatRelativeTime(createdAtDate)}</span>
          <span> · </span>
          <span>{data.commentCount}개의 댓글</span>
        </div>
      </div>
      <div className="w-full h-[45px] p-[10px] border-t">
        <Link href={`/${data.userId}`} className="flex items-center">
          <Image
            src={userIcon}
            alt="user Icon"
            className="w-6 h-6 mr-2 rounded-full"
          />
          <span className="flex items-center text-[#868e96] text-xs">
            by&nbsp;<b className="text-black text-sm">{data.userId}</b>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
