import { useState, useMemo } from 'react';

type Country = {
  name: { common: string };
  capital?: string[];
  population: number;
  flags: { png: string };
};

interface DataTableProps {
  data: Country[];
  loading?: boolean;
}

const DataTable = ({ data, loading = false }: DataTableProps) => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'population'; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filter by search
  const filteredData = useMemo(() => {
    return data.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aKey = sortConfig.key === 'name' ? a.name.common.toLowerCase() : a.population;
      const bKey = sortConfig.key === 'name' ? b.name.common.toLowerCase() : b.population;

      if (aKey < bKey) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aKey > bKey) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key: 'name' | 'population') => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  // Toggle single row
  const toggleRow = (name: string) => {
    setSelectedRows((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedRows.length === sortedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedData.map((c) => c.name.common));
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!data.length) return <p className="text-gray-500">No data available</p>;

  return (
    <div>
      {/* Search box */}
      <input
        type="text"
        placeholder="Search by country name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-sm"
      />

      {/* Selected rows count */}
      <p className="mb-2 text-gray-600">
        Selected rows: {selectedRows.length}
      </p>

      {/* Table */}
      <table className="min-w-full border border-gray-300 border-collapse">
        <thead className="bg-gray-200">
          <tr>
            {/* Checkbox column */}
            <th className="border p-2 text-center w-12">
              <input
                type="checkbox"
                checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                onChange={toggleSelectAll}
              />
            </th>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name {sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="border p-2">Capital</th>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => handleSort('population')}
            >
              Population {sortConfig?.key === 'population' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="border p-2">Flag</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No matching countries
              </td>
            </tr>
          ) : (
            sortedData.map((c) => (
              <tr key={c.name.common} className="hover:bg-gray-100">
                <td className="border p-2 text-center w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(c.name.common)}
                    onChange={() => toggleRow(c.name.common)}
                  />
                </td>
                <td className="border p-2">{c.name.common}</td>
                <td className="border p-2">{c.capital ? c.capital[0] : 'N/A'}</td>
                <td className="border p-2">{c.population.toLocaleString()}</td>
                <td className="border p-2">
                  <img src={c.flags.png} alt={c.name.common} className="w-10 h-6 object-cover" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
