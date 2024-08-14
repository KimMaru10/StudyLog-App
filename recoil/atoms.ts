import { atom } from "recoil";

// 게시물 상태를 정의
export const postState = atom({
  key: "postState",
  default: {
    user_id: "Kim",
    title: "",
    content: "",
    tags: [] as string[],
    public_status: true,
    custom_url: "",
    short_description: "",
  },
});
