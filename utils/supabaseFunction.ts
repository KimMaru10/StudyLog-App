import { supabase } from "../utils/supabase";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("User").select("*");
  if (error) {
    console.log("데이터를 불러오는 도중에 오류가 발생했습니다.", error);
    throw error;
  }
  return data;
};

export const postBoard = async (
  user_id: string,
  title: string,
  content: string,
  tags: string[],
  thumbnail_url: string,
  public_status: boolean,
  custom_url: string,
  short_description: string
) => {
  const { data, error } = await supabase.from("posts").insert([
    {
      user_id,
      title,
      content,
      tags,
      thumbnail_url,
      public_status,
      custom_url,
      short_description,
    },
  ]);

  if (error) {
    console.error("Error saving post:", error.message);
    throw error;
  } else {
    return data;
  }
};
