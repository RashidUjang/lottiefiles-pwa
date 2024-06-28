import { MouseEvent, ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPresignedUrl } from "../api/api";
import { Input } from "./ui/AppInput";
import { Button } from "./ui/AppButton";
import { Progress } from "./ui/AppProgress";
import { useToast } from "../hooks/UseToast";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>();
  const [progress, setProgress] = useState(15);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPresignedUrl,
    onSuccess: async (presignedUrl: any) => {
      try {
        setProgress(50);

        if (file) {
          await uploadFileToS3(file, presignedUrl.createPresignedUrl);
        }

        queryClient.invalidateQueries({ queryKey: ["files"] });

        setProgress(100);
        toast({
          description: "File uploaded successfully",
        });
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
      mutate({ originalFilename: file.name });
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target && e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="font-bold text-3xl mb-3">Upload</h3>
      <div className="flex mb-2">
        <Input type="file" className="mr-2" onChange={handleFileChange} />
        <Button onClick={handleUpload}>Submit</Button>
      </div>
      {isPending && <Progress value={progress} />}
    </div>
  );
};
export default FileUpload;
