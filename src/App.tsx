// import { useState } from 'react';
// import InputField from './components/inputField/InputField';

// function App() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold text-red-400 mb-6">Input Fields</h1>

//       <div className="w-full max-w-md bg-gray-50 border rounded-md p-6 flex flex-col gap-4">
         
//         <InputField
//           label="Your Name"
//           placeholder="Enter Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           helperText="This will be visible to others"
//           variant="ghost"
//           clearable={true}
//           type="text"
//         />

//         <InputField
//           label="Your Age"
//           placeholder="Enter Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//           helperText="Enter numbers only"
//           variant="filled"
//           clearable={true}
//           type="number"
//         />

//         <InputField
//           label="Password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           helperText="Use at least 8 characters"
//           variant="outlined"
//           isPassword={true}
//           // clearable={true}
//         />

//       </div>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from 'react';
import InputField from './components/inputField/InputField';
import DataTable from './components/DataTable/DataTable';

type Country = {
  name: { common: string }
  capital?: string[]
  population: number
  flags: { png: string }
}

function App() {
  const [activeTab, setActiveTab] = useState<'inputs' | 'table'>('inputs');

  // InputField states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  // DataTable states
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch countries when Data Table tab is active
  useEffect(() => {
    if (activeTab === 'table' && countries.length === 0) {
      setLoading(true);
      fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags')
        .then(res => res.json())
        .then(data => { setCountries(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [activeTab, countries.length]);

  return (
    <div className="min-h-screen bg-blue-500 p-5 flex flex-col items-center">

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('inputs')}
          className={`px-4 py-2 rounded ${activeTab === 'inputs' ? 'bg-red-500 text-white' : 'bg-white border'}`}
        >
          Input Fields
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`px-4 py-2 rounded ${activeTab === 'table' ? 'bg-red-500 text-white' : 'bg-white border'}`}
        >
          Data Table
        </button>
      </div>

      {/* Input Fields Tab */}
      {activeTab === 'inputs' && (
        <div className="w-full max-w-md bg-gray-50 border rounded-md p-6 flex flex-col gap-4">
          <InputField
            label="Your Name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText="This will be visible to others"
            variant="ghost"
            clearable
            type="text"
          />

          <InputField
            label="Your Age"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            helperText="Enter numbers only"
            variant="filled"
            clearable
            type="number"
          />

          <InputField
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Use at least 8 characters"
            variant="outlined"
            isPassword
          />
        </div>
      )}

      {/* Data Table Tab */}
      {activeTab === 'table' && (
        <div className="w-full max-w-4xl bg-white p-6 rounded shadow-md">
          {loading ? (
            <p className="text-gray-500">Loading data...</p>
          ) : (
            <DataTable data={countries} />
          )}
        </div>
      )}

    </div>
  );
}

export default App;
