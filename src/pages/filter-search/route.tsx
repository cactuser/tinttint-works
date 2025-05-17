import './styles.css';

import { useMemo, useRef, useState } from 'react';

import data from './fake-data.json';
import { useDebounce } from './useDebounce';

export default function FilterSearchPage() {
  const [searchText, setSearchText] = useState('');

  // 防止輸入太快，導致過多 re-render
  const debouncedSearchText = useDebounce(searchText, 200);

  // 搜尋結果快取
  const cacheRef = useRef<Map<string, typeof data>>(new Map());

  const filteredData = useMemo(() => {
    const keyword = debouncedSearchText.trim().toLowerCase();

    if (cacheRef.current.has(keyword)) {
      return cacheRef.current.get(keyword)!;
    }

    const result = keyword ? data.filter(item => item.name.toLowerCase().includes(keyword)) : data;

    cacheRef.current.set(keyword, result);

    return result;
  }, [debouncedSearchText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="container-filter-search">
      <div className="panel-filter-search">
        <input
          className="input-search"
          type="text"
          placeholder="Type something..."
          value={searchText}
          onChange={handleInputChange}
        />
        {/* TODO 資料數量如果更龐大可以考慮使用 TanStack Virtual */}
        <ul className="filter-box">
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <li key={item.id} className="filter-item">
                {item.name}
              </li>
            ))
          ) : (
            <li className="filter-item no-data">{`No data for "${searchText}"`}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
