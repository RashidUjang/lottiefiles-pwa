import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../api/api";
import File from "../types/File";

const FileList = () => {
  const {
    status,
    error,
    data: files,
  } = useQuery({
    queryKey: ["files"],
    queryFn: getFiles,
  });

  if (status === "pending") return (<p>Pending</p>)

  return (
    <div>
      <h3>File List</h3>
      {files && files.map((file: File) => {
        return <div>{file.originalFilename}</div>;
      })}
    </div>
  );
};

export default FileList;
