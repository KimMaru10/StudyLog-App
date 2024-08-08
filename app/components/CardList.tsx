"use client";
import React, { useState } from "react";
import Link from "next/link";
import Card from "./Card";
import DummyBoardData from "../../data/bordData.json";
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
      <div className="home-tab w-full h-[72px] py-[12px]">
        <div className="home-tab-item w-[20%] h-full  flex justify-between">
          <Link href="/trending" className="font-bold text-lg">
            트렌딩
          </Link>
          <Link href="/recent">최신</Link>
          <Link href="/feed">피드</Link>
          <div className="w-[32%] h-[2px] "></div>
        </div>
      </div>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-20 lg:grid-cols-3 lg:gap-35 xl:grid-cols- xl:gap-35 2xl:grid-cols-4 2xl:gap-35">
        {boardData.map((board, key) => (
          <Card data={board} key={key} />
        ))}
        <div ref={bottomRef}></div>
      </div>
    </>
  );
};

export default CardList;
