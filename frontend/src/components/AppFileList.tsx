import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../api/api";
import File from "../types/File";
import { createDownloadPresignedUrl } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "./ui/AppButton";
import { Card } from "./ui/AppCard";
import { MouseEvent } from "react";

const FileList = () => {
  const { data: files } = useQuery({
    queryKey: ["files"],
    queryFn: () => getFiles(),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createDownloadPresignedUrl,
  });

  const handleDownload = async (
    e: MouseEvent<HTMLButtonElement>,
    uuid: string,
    path: string,
    originalFilename: string
  ) => {
    e.preventDefault();

    const presignedUrl = await mutateAsync({ uuid, path });

    const fileResponse = await fetch(presignedUrl.createDownloadPresignedUrl);
    if (!fileResponse.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await fileResponse.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    // TODO: Sanitize input filename
    link.href = url;
    link.download = originalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h3 className="font-bold text-3xl mb-3">File List</h3>
      <div>
        {files &&
          files.map((file: File) => {
            return (
              <Link to={`${file.uuid}`}>
                <Card className="px-4 py-4 mb-4 flex justify-between items-center">
                  <span>{file.originalFilename}</span>
                  <Button
                    onClick={(event) =>
                      handleDownload(
                        event,
                        file.uuid,
                        file.filepath,
                        file.originalFilename
                      )
                    }
                  >
                    Download
                  </Button>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default FileList;
