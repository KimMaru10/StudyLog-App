import { supabase } from "../utils/supabase";

//모든 유저 데이터를 가져오는 함수
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("User").select("*");
  if (error) {
    console.log("데이터를 불러오는 도중에 오류가 발생했습니다.", error);
    throw error;
  }
  return data;
};

//회원가입 함수
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.log("회원가입 중 오류 발생", error);
  }
  return data;
};

//로그인 함수
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log("로그인 시도중 오류 발생", error);
  }
  return { data, error };
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
