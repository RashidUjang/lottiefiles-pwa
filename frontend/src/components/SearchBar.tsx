import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../api/api";
import { ChangeEvent, useState } from "react";
import { Input } from "./ui/AppInput";
import { Button } from "./ui/AppButton";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>();

  const { refetch } = useQuery({
    queryKey: ["files"],
    queryFn: () => getFiles(searchQuery),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    refetch();
  };

  return (
    <div className="flex">
      <Input className="rounded-r-none border-r-white" type="text" value={searchQuery} onChange={handleInputChange} />
      <Button className="rounded-l-none" onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
