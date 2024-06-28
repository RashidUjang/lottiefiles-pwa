import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../api/api";
import File from "../types/File";
import { createDownloadPresignedUrl } from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const FileList = () => {
  const { data: files } = useQuery({
    queryKey: ["files"],
    queryFn: () => getFiles(),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createDownloadPresignedUrl,
  });

  const handleDownload = async (
    uuid: string,
    path: string,
    originalFilename: string
  ) => {
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
      <h3>File List</h3>
      {files &&
        files.map((file: File) => {
          return (
            <div>
              <Link to={`${file.uuid}`}>
                <p className="text-3xl font-bold text-red-700 underline">
                  {file.originalFilename}
                </p>
                <button
                  onClick={() =>
                    handleDownload(
                      file.uuid,
                      file.filepath,
                      file.originalFilename
                    )
                  }
                >
                  Download
                </button>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default FileList;
