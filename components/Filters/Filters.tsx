import { FormInput, IconButton } from "@/components";
import { faSearch, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

interface FiltersProps {
  query: {
    desde: string;
    hasta: string;
    razonSocial: string;
  };
  setQueryObject: (query: {
    desde: string;
    hasta: string;
    razonSocial: string;
  }) => void;
  setQueryString: (query: string) => void;
}

export default function Filters({
  query,
  setQueryObject,
  setQueryString,
}: FiltersProps) {
  const handleSearch = () => {
    if (query.desde || query.hasta || query.razonSocial) {
      let newQuery = "?";
      let params = [];
      if (query.desde) {
        params.push(`desde=${query.desde}`);
      }
      if (query.hasta) {
        params.push(`hasta=${query.hasta}`);
      }
      if (query.razonSocial) {
        params.push(`razonSocial=${query.razonSocial}`);
      }

      newQuery += params.join("&");
      setQueryString(newQuery);
    }
  };

  const handleClear = () => {
    setQueryObject({ desde: "", hasta: "", razonSocial: "" });
    setQueryString("");
  };

  return (
    <header className="flex flex-col">
      <section className="flex justify-around">
        <FormInput
          type="text"
          value={query.razonSocial}
          onChange={(e) =>
            setQueryObject({ ...query, razonSocial: e.target.value })
          }
          placeholder="Nombre cliente"
          className="w-fit"
        />
        <IconButton onClick={handleSearch} label="Buscar">
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>
        <IconButton onClick={handleClear} label="Limpiar">
          <FontAwesomeIcon icon={faBroom} />
        </IconButton>
      </section>
      <section className="flex">
        <FormInput
          label="Fecha desde"
          type="date"
          value={query.desde}
          onChange={(e) => setQueryObject({ ...query, desde: e.target.value })}
        />
        <FormInput
          label="Fecha hasta"
          type="date"
          value={query.hasta}
          onChange={(e) => setQueryObject({ ...query, hasta: e.target.value })}
        />
      </section>
    </header>
  );
}
