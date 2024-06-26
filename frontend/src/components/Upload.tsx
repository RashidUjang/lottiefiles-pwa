import { useState } from "react";
import { createPreSignedUrl } from "../api/api";

const Upload = () => {
  const [file, setFile] = useState<any>("");

  const handleSubmit = async () => {
    const results = await createPreSignedUrl(123)
  };

  return (
    <div>
        <p></p>
      <input type="file"></input>
      <button onClick={handleSubmit}></button>
    </div>
  );
};

export default Upload;
