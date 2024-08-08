import { supabase } from "../utils/supabase";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("User").select("*");
  if (error) {
    console.log("데이터를 불러오는 도중에 오류가 발생했습니다.", error);
    throw error;
  }
  return data;
};
