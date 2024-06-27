import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../api/api";
import { ChangeEvent, useState } from "react";

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
    <div>
      <input type="text" value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
