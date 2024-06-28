import { useParams } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDownloadPresignedUrl, getOneFile } from "../../api/api";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/AppButton";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const PageFileDetail = () => {
  const navigate = useNavigate();
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
      <Button className="p-3" onClick={() => navigate("/")}>
        <ArrowLeftIcon />
      </Button>
      <h3 className="font-bold text-2xl mb-3 mt-3">{data?.originalFilename}</h3>
      <div className="border-b">
        <Player autoplay loop src={file} className="h-60">
          <Controls
            visible={true}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </div>
    </div>
  );
};

export default PageFileDetail;
