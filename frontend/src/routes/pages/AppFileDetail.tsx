import { useParams } from "react-router-dom";

const AppFileDetail = () => {
  const { uuid } = useParams<{ uuid: string }>();

  return <div>This is the file detail {uuid}</div>;
};

export default AppFileDetail;
