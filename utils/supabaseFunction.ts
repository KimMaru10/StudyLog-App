import { supabase } from "../utils/supabase";

// 썸네일을 업로드하고 URL을 반환하는 함수
export const uploadThumbnail = async (file: File): Promise<string> => {
  // 파일 이름 정리
  const sanitizeFileName = (fileName: string): string => {
    return fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  };

  const fileName = `public/${Date.now()}_${sanitizeFileName(file.name)}`;

  // 썸네일 업로드
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("BoardImgBucket")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
  console.log(`업로드할 데이터 : ${uploadData}`);
  if (uploadError) {
    throw new Error(`Thumbnail upload failed: ${uploadError.message}`);
  }

  // 업로드된 파일의 공개 URL 얻기
  const { data: urlData } = supabase.storage
    .from("BoardImgBucket")
    .getPublicUrl(fileName);
  console.log(`업로드된 파일의 URL : ${urlData}`);
  if (!urlData || !urlData.publicUrl) {
    throw new Error("Failed to retrieve public URL");
  }

  return urlData.publicUrl;
};

//게시물을 등록하는 함수
export const postBoard = async (
  user_id: string,
  title: string,
  content: string,
  tag: string[],
  thumbnail_url: string,
  public_status: boolean,
  custom_url: string,
  short_description: string
) => {
  const { data, error } = await supabase.from("Board").insert([
    {
      user_id,
      title,
      content,
      tag,
      thumbnail_url,
      public_status,
      custom_url,
      short_description,
    },
  ]);

  if (error) {
    throw new Error(`Failed to save post: ${error.message}`);
  }

  return data;
};
