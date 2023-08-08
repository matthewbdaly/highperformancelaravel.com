"use client";

import { ReactElement, useEffect, useMemo, useState } from "react";
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
    <form action="/search" method="GET">
      <input type="search" name="q" placeholder="Search for..." className="p-2 rounded-lg ring-2 ring-gray-500 ring-inset" onChange={handleSearch} />
      <button type="submit" className="bg-caribbean-green-600 hover:bg-caribbean-green-700 active:bg-caribbean-green-800 text-white rounded-lg p-2 ml-2">Search</button>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map(result => (
            <a href={result.item.link} key={result.item.link}><li>{result.item.title}</li></a>
          ))}
        </ul>
      )}
    </form>
  )
}

