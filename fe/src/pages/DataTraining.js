import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import 'animate.css'; // Pastikan animate.css diimpor

const DataTraining = () => {
  const [data, setData] = useState([]); // State untuk menyimpan data dari API
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menyimpan error jika ada
  const [file, setFile] = useState(null); // State untuk file yang akan diupload
  const [uploading, setUploading] = useState(false); // Status upload

  // Fungsi untuk mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/read', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data || []); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menangani file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Fungsi untuk mengupload file
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setData(result.data); // Update data setelah upload
        setError(null); // Clear previous errors
        alert('File uploaded successfully!');
      } else {
        setError(result.message || 'File upload failed');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Definisi kolom untuk DataTable
  const columns = [
    {
      name: 'Jenis Kelamin',
      selector: row => row["Jenis Kelamin"],
      sortable: true,
    },
    {
      name: 'Organisasi',
      selector: row => row.Organisasi,
      sortable: true,
    },
    {
      name: 'Ekstrakurikuler',
      selector: row => row.Ekstrakurikuler,
      sortable: true,
    },
    {
      name: 'Sertifikasi Profesi',
      selector: row => row["Sertifikasi Profesi"],
      sortable: true,
    },
    {
      name: 'Nilai Akhir',
      selector: row => row["Nilai Akhir"],
      sortable: true,
    },
    {
      name: 'Tempat Magang',
      selector: row => row["Tempat Magang"],
      sortable: true,
    },
    {
      name: 'Tempat Kerja',
      selector: row => row["Tempat Kerja"],
      sortable: true,
    },
    {
      name: 'Durasi Mendapat Kerja',
      selector: row => row["Durasi Mendapat Kerja"],
      sortable: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container mx-auto p-6 animate__animated animate__fadeIn">
          <h2 className="text-3xl font-bold mb-6">Data Training</h2>
          
          {/* Upload Section */}
          <div className="mb-6">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="mb-4 border rounded p-2"
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-6 py-2 bg-blue-500 text-white rounded-md ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? 'Uploading...' : 'Upload Excel'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-4">
              <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                responsive
                dense
                subHeader
                subHeaderComponent={
                  <div className="text-gray-500">
                    <strong>Total Records: </strong> {data.length}
                  </div>
                }
                customStyles={{
                  rows: {
                    highlightOnHoverStyle: {
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  },
                  headCells: {
                    style: {
                      backgroundColor: '#f3f4f6',
                      fontWeight: 'bold',
                      color: '#333',
                    },
                  },
                  cells: {
                    style: {
                      padding: '10px',
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTraining;
