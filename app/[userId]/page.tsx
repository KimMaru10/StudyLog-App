"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/utils/supabaseFunction";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import userIcon from "../../public/assets/imgs/userIcon.png";
import Header from "../components/layouts/Header";
const Profile = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getAllUsers();
        const foundUser = users.find((user: any) => user.userId === userId);
        setUser(foundUser);
      } catch (error) {
        console.error(
          "사용자 데이터를 불러오는 도중 에러가 발생했습니다.",
          error
        );
      }
    };

    fetchUser();
  }, [userId]);

  // 사용자가 없는 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (user === undefined) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null; // 데이터를 로드하는 중이거나, 사용자가 없는 경우 로딩 상태를 표시하거나 다른 UI를 렌더링할 수 있습니다.
  }

  return (
    <div>
      <Header name={userId} />
      <div>
        <div className="w-[768Px] py-20 m-auto">
          <div id="user_profile" className="">
            <div className="flex items-center">
              <Link href={`/${userId}`}>
                <Image
                  src={userIcon}
                  alt="유저 아이콘"
                  className="w-[128px] h-[128px] rounded-[50%] bg-[#fffff] shadow-md"
                />
              </Link>
              <div className="flex flex-col justify-center ml-4">
                <div className="text-2xl font-bold">
                  <Link href={`/${userId}`}>{userId}</Link>
                </div>
                <div className="text-lg mt-1">{user.comment}</div>
              </div>
            </div>
            <div className="w-full h-[1px] my-8 bg-[#e9ecef]"></div>
            <div id="user_tab_block">
              <div className="flex-1 flex justify-end">
                <Link href={`/${userId}/followers`}>
                  <span className="text-base font-bold">50</span>
                  <span className="ml-1 text-base font-normal  text-[#495057]">
                    팔로우
                  </span>
                </Link>
                <Link href={`/${userId}/followings`} className="ml-4">
                  <span className="text-base font-bold">40</span>
                  <span className="ml-1 text-base font-normal  text-[#495057]">
                    팔로잉
                  </span>
                </Link>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div></div>
                <div className="text-[#12b886]  w-[96px] h-[32px] text-base">
                  <button className="flex shadow-none items-center justify-center bg-[#fff] cursor-pointer font-bold w-full h-full rounded-2xl border-[#12b886] border-[1px]">
                    <span>팔로우</span>
                  </button>
                </div>
              </div>
              <div className="my-[72px] flex justify-center w-full">
                <div className="flex relative">
                  <Link
                    href={`/posts`}
                    className="flex items-center justify-center text-xl w-[128px] h-[48px] font-semibold"
                  >
                    글
                  </Link>
                  <Link
                    href={`/series`}
                    className="flex items-center justify-center text-xl w-[128px] h-[48px] font-semibold"
                  >
                    시리즈
                  </Link>
                  <Link
                    href={`/about`}
                    className="flex items-center justify-center text-xl w-[128px] h-[48px] font-semibold"
                  >
                    소개
                  </Link>
                  <div className="w-[128px] h-[2px] bg-[#20c997] absolute bottom-[-2px]"></div>
                </div>
              </div>
            </div>
          </div>
          <section>ff</section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
