// src/api/uploadDocumentEntry.ts
import axios from "./api/axiosInstance";

type Tag = { tag_name: string };

interface UploadParams {
  file: {
    uri: string;
    mimeType: string;
    fileName?: string;
  };
  majorHead: string;
  minorHead: string;
  documentDate: Date; // Native JS Date
  documentRemarks: string;
  tags: Tag[];
  userId: string;
}

export const uploadDocumentEntry = async (params: UploadParams) => {
  const {
    file,
    majorHead,
    minorHead,
    documentDate,
    documentRemarks,
    tags,
    userId,
  } = params;

  const formData = new FormData();

  const formattedDate = `${documentDate
    .getDate()
    .toString()
    .padStart(2, "0")}-${(documentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${documentDate.getFullYear()}`;

  formData.append(
    "data",
    JSON.stringify({
      major_head: majorHead,
      minor_head: minorHead,
      document_date: formattedDate,
      document_remarks: documentRemarks,
      tags,
      user_id: userId,
    })
  );

  formData.append("file", {
    uri: file.uri,
    type: file.mimeType,
    name: file.fileName || `upload.${file.mimeType?.split("/")[1] ?? "bin"}`,
  } as any);
  try {
    const res = await axios.post("/saveDocumentEntry", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data; // whatever the backend returns
  } catch (error) {
    console.log(error);
  }
};
