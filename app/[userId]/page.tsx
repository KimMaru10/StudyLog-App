"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/utils/supabaseFunction";
import { useRouter } from "next/navigation";

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
      <h1>{userId}의 프로필 페이지입니다.</h1>
      <p>이메일: {user.email}</p>
      <p>한 줄 소개: {user.comment}</p>
    </div>
  );
};

export default Profile;
