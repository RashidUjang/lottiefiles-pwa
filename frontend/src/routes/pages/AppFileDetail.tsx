import { useParams } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDownloadPresignedUrl, getOneFile } from "../../api/api";
import { useEffect, useState } from "react";

const AppFileDetail = () => {
  const [file, setFile] = useState<any>();
  const { uuid } = useParams<{ uuid: string }>();

  const { mutateAsync } = useMutation({
    mutationFn: createDownloadPresignedUrl,
  });

  const { data } = useQuery({
    queryKey: ["files", uuid],
    queryFn: () => {
      if (uuid) {
        return getOneFile(uuid);
      }
    },
  });

  useEffect(() => {
    const fetchAndSetFile = async () => {
      if (uuid) {
        const presignedUrl = await mutateAsync({
          uuid,
          path: data?.filepath,
        });

        const fileResponse = await fetch(
          presignedUrl.createDownloadPresignedUrl
        );

        setFile(await fileResponse.json());
      }
    };

    fetchAndSetFile();
  }, [data]);

  return (
    <div>
      This is the file detail {uuid}
      <Player
        autoplay
        loop
        src={file}
        style={{ height: "300px", width: "300px" }}
      >
        <Controls
          visible={true}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
};

export default AppFileDetail;
