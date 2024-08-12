"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "./Card";
import DummyBoardData from "../../data/bordData.json";
import sortDown from "../../public/assets/imgs/sort-down.svg";
import { useInfiniteScroll } from "@/utils/useInfiniteScroll";

const CardList = () => {
  const [boardData, setBoardData] = useState(DummyBoardData.slice(0, 12));
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    if (boardData.length >= DummyBoardData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      const moreData = DummyBoardData.slice(
        boardData.length,
        boardData.length + 12
      );
      setBoardData((prevData) => [...prevData, ...moreData]);
    }, 1000);
  };

  const bottomRef = useInfiniteScroll({ callback: loadMore, hasMore });

  return (
    <>
      <div className="home-tab w-full h-[72px] py-[12px] flex justify-between">
        <nav className="home-tab-left flex justify-start items-center h-[48px]">
          <div>
            <Link href="/trending" className="font-bold text-lg">
              트렌딩
            </Link>
            <Link href="/recent" className="font-bold text-lg">
              최신
            </Link>
            <Link href="/feed" className="font-bold text-lg">
              피드
            </Link>
            <div className=" h-[2px] "></div>
          </div>
        </nav>
        <div className="home-tab-left w-[100px] h-8 flex items-center justify-between px-2 rounded-[4px] bg-white  text-xs font-semibold text-[#495057] shadow-sm hover:shadow-md">
          <div>이번주</div>
          <Image src={sortDown} alt="sortDown" />
        </div>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-20 lg:grid-cols-3 lg:gap-35 xl:grid-cols- xl:gap-35 2xl:grid-cols-4 2xl:gap-35 my-8">
        {boardData.map((board, key) => (
          <Card data={board} key={key} />
        ))}
        <div ref={bottomRef}></div>
      </div>
    </>
  );
};

export default CardList;
