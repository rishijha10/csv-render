import React, { useState, useRef } from "react";
import Papa from "papaparse";

const App = () => {
  const chooseFile = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [filterWord, setFilterWord] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleFileUpload = () => {
    const file = chooseFile.current.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  React.useEffect(() => {
    if (selectedFile) {
      Papa.parse(selectedFile, {
        complete: function (results) {
          // console.log(results.data); // This is your array of objects
          if (results.data.length > 0) {
            const arrayRemovedHeader = results.data.slice(1);
            // console.log(arrayRemovedHeader);
            const filteredArr = arrayRemovedHeader.filter((item) => {
              // console.log(item);
              if (filterWord === "") {
                return true;
              }
              return item[0].startsWith(filterWord);
            });
            setCsvData(results.data);
            setFilteredArray(filteredArr);
          }
        },
      });
    }
  }, [selectedFile, filterWord]);

  const handeShowModal = () => {
    setShowModal(!showModal);
  };

  // const handleColumnToggle = (columnName) => {
  //   if (selectedColumns.includes(columnName)) {
  //     setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
  //   } else {
  //     setSelectedColumns([...selectedColumns, columnName]);
  //   }
  //   // console.log(selectedColumns);
  //   // setCsvData(csvData[0].filter(item => !selectedColumns.includes(item)));
  //   // console.log(csvData[0]);
  // };
  // console.log(selectedColumns);

  return (
    <div className="p-5 font-inter">
      <button
        onClick={() => {
          chooseFile.current.click();
        }}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Import CSV
      </button>
      <input
        onChange={handleFileUpload}
        className="hidden"
        ref={chooseFile}
        type="file"
      />
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">CSV Data</h2>
        <input
          type="text"
          onChange={(e) => setFilterWord(e.target.value)}
          className=" border outline-none px-2 py-2 my-2 mr-6"
          placeholder="search by pair_addr	"
        />
        <button
          onClick={handeShowModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Select Columns
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-600">
            <thead className="bg-gray-100">
              <tr>
                {csvData.length !== 0 &&
                  csvData[0].map((data, index) => (
                    <th
                      key={index}
                      className="px-3 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {data}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArray.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {Object.values(row).map((value, columnIndex) => (
                    <td
                      key={columnIndex}
                      className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Select Columns to Display
            </h2>
            {csvData.length !== 0 &&
              csvData[0].map((columnName, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`column-${index}`}
                    // checked={selectedColumns.includes(columnName)}
                    // onChange={() => handleColumnToggle(columnName)}
                    className="mr-2"
                  />
                  <label htmlFor={`column-${index}`}>{columnName}</label>
                </div>
              ))}
            <button
              onClick={handeShowModal}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

// import React, { useState, useRef } from 'react';
// import Papa from 'papaparse';

// const App = () => {
//   const chooseFile = useRef();
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [csvData, setCsvData] = useState([]);
//   const [filterWord, setFilterWord] = useState('');
//   const [filteredArray, setFilteredArray] = useState([]);
//   const [showModal, setShowModal] = useState(false);
// const [selectedColumns, setSelectedColumns] = useState([]);

//   const handleFileUpload = () => {
//     const file = chooseFile.current.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   React.useEffect(() => {
//     if (selectedFile) {
//       Papa.parse(selectedFile, {
//         complete: function(results) {
//           if (results.data.length > 0) {
//             const arrayRemovedHeader = results.data.slice(1);
//             const filteredArr = arrayRemovedHeader.filter(item => {
//               if (filterWord === "") {
//                 return true;
//               }
//               return item[0].startsWith(filterWord);
//             });
//             setCsvData(results.data);
//             setFilteredArray(filteredArr);
//           }
//         }
//       });
//     }
//   }, [selectedFile, filterWord]);

//   const handleToggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const handleColumnToggle = (columnName) => {
//     if (selectedColumns.includes(columnName)) {
//       setSelectedColumns(selectedColumns.filter(col => col !== columnName));
//     } else {
//       setSelectedColumns([...selectedColumns, columnName]);
//     }
//   };

//   return (
//     <div className='p-5 font-inter'>
//       <button onClick={() => { chooseFile.current.click() }} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
//         Import CSV
//       </button>
//       <input
//         onChange={handleFileUpload}
//         className='hidden'
//         ref={chooseFile}
//         type="file"
//       />
//       <div className="mt-4">
//         <h2 className="text-xl font-bold mb-2">CSV Data</h2>
//         <div className="flex items-center">
//           <input
//             type='text'
//             onChange={e => setFilterWord(e.target.value)}
//             className='border outline-none px-2 py-2 my-2 flex-1 mr-2'
//             placeholder='Search by pair_addr'
//           />
//           <button
//             onClick={handleToggleModal}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
//           >
//             Select Columns
//           </button>
//         </div>
//         <div className="overflow-x-auto mt-4">
//           <table className="min-w-full divide-y divide-gray-200 border border-gray-600">
//             <thead className="bg-gray-100">
//               <tr>
//                 {csvData.length !== 0 && csvData[0].map((data, index) => (
//                   <th key={index} className="px-3 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                     {data}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredArray.map((row, rowIndex) => (
//                 <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                   {Object.entries(row).map(([key, value], columnIndex) => (
//                     selectedColumns.includes(csvData[0][columnIndex]) && (
//                       <td key={columnIndex} className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
//                         {value}
//                       </td>
//                     )
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-lg font-bold mb-4">Select Columns to Display</h2>
//             {csvData.length !== 0 && csvData[0].map((columnName, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   id={`column-${index}`}
//                   checked={selectedColumns.includes(columnName)}
//                   onChange={() => handleColumnToggle(columnName)}
//                   className="mr-2"
//                 />
//                 <label htmlFor={`column-${index}`}>{columnName}</label>
//               </div>
//             ))}
//             <button
//               onClick={handleToggleModal}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md mt-4"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
