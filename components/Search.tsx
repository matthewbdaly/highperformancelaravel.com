"use client";

import { FormEvent, ReactElement, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

interface SearchItem {
  title: string;
  description: string;
  series: string;
  link: string;
}

export default function Search(): ReactElement {
  const [searchResults, setSearchResults] = useState<Fuse.FuseResult<SearchItem>[]>([]);

  const fuse = useMemo(() => new Fuse([], { keys: ["title", "description", "series"], shouldSort: true }), []);

  useEffect(() => {
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        fuse.setCollection(data);
      });
  }, [fuse]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query === '') {
      setSearchResults([]);
    } else {
      setSearchResults(fuse.search(query));
    }
  };

  return (
    <form autoComplete="off" onSubmit={(e: FormEvent) => e.preventDefault()}>
      <input type="search" name="q" placeholder="Search for..." className="p-2 rounded-lg shadow-lg ring-1 ring-gray-200 ring-inset outline-1 outline-gray-300 w-full md:w-auto text-gray-600" onChange={handleSearch} />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map(result => (
            <a href={result.item.link} key={result.item.link}>
              <li>{result.item.title}</li>
            </a>
          ))}
        </ul>
      )}
    </form>
  )
}
