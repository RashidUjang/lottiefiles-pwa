import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../api/api";
import File from "../types/File";
import { createDownloadPresignedUrl } from "../api/api";
import { useMutation } from "@tanstack/react-query";

const FileList = () => {
  const {
    status,
    error,
    data: files,
  } = useQuery({
    queryKey: ["files"],
    queryFn: () => getFiles(),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createDownloadPresignedUrl,
  });

  const handleDownload = async (uuid: string, path: string, originalFilename: string) => {
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
              {file.originalFilename}
              <button
              onClick={() => handleDownload(file.uuid, file.filepath, file.originalFilename)}
              >
                Download
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default FileList;
