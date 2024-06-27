import { MouseEvent, ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPresignedUrl } from "../api/api";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>();

  const { mutate } = useMutation({
    mutationFn: createPresignedUrl,
    onSuccess: async (presignedUrl: any) => {
      try {
        if (file) {
          await uploadFileToS3(file, presignedUrl.createPresignedUrl);
        }

      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
  });

  const uploadFileToS3 = async (file: File, url: string) => {
    const requestBody = {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    };
    console.log(url);

    const response = await fetch(url, requestBody);

    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to upload file to S3");
    }
  };

  const handleUpload = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (file) {
      mutate({originalFilename: file.name});
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target && e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange}></input>
      <button onClick={handleUpload}>Submit</button>
    </div>
  );
};
export default FileUpload;
