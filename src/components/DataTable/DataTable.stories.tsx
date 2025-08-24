import DataTable from './DataTable';

export default {
  title: 'Components/DataTable',
  component: DataTable,
};

// Sample data
const sampleData = [
  { name: { common: 'India' }, capital: ['New Delhi'], population: 1400000000, flags: { png: 'https://flagcdn.com/w320/in.png' } },
  { name: { common: 'USA' }, capital: ['Washington DC'], population: 330000000, flags: { png: 'https://flagcdn.com/w320/us.png' } },
  { name: { common: 'Japan' }, capital: ['Tokyo'], population: 126000000, flags: { png: 'https://flagcdn.com/w320/jp.png' } },
];

export const Default = () => <DataTable data={sampleData} />;

export const LoadingState = () => <DataTable data={[]} loading={true} />;

export const EmptyState = () => <DataTable data={[]} />;
