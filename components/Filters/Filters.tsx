import { FormInput, IconButton } from "@/components";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface FiltersProps {
  setQuery: (query: string) => void;
}

export default function Filters({ setQuery }: FiltersProps) {
  const [query, setLocalQuery] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleSearch = () => {
    setQuery(query);
  };

  const handleClear = () => {
    setLocalQuery("");
    setQuery("");
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <FormInput
        type="text"
        value={query}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Buscar..."
        className="w-1/2"
      />
      <IconButton onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </IconButton>
      <IconButton onClick={handleClear}>
        <FontAwesomeIcon icon={faTimes} />
      </IconButton>
    </div>
  );
}
