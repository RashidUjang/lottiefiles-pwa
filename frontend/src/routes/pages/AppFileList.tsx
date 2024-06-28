import FileUpload from "../../components/FileUpload";
import FileList from "../../components/FileList";
import SearchBar from "../../components/SearchBar";

function AppFileList() {
  return (
    <>
      <SearchBar />
      <FileUpload />
      <FileList />
    </>
  );
}

export default AppFileList;
