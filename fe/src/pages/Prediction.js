import React, { useState } from 'react';
import 'animate.css';

const PredictionPage = () => {
  const [formData, setFormData] = useState({
    jenisKelamin: '',
    organisasi: '',
    ekstrakurikuler: '',
    sertifikasiProfesi: '',
    nilaiAkhir: '',
    tempatMagang: '',
    tempatKerja: ''
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi: pastikan tidak ada pilihan yang "Silahkan pilih"
    const invalidSelection = Object.values(formData).some(value => value === '');
    if (invalidSelection) {
      setErrorMessage('Silakan pilih semua opsi sebelum submit.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      setPredictionResult({
        predictedClass: data.posteriors["< 3 Bulan"] > data.posteriors["> 3 Bulan"] ? 'Ya' : 'Tidak',
        priors: data.priors,
        likelihoods: data.likelihoods,
        posteriors: data.posteriors
      });
      
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan dalam pengiriman data.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container mx-auto p-6 animate__animated animate__fadeIn">
          <h2 className="text-3xl font-bold mb-6">Prediction</h2>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6 animate__animated animate__fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="jenis_kelamin" className="block text-lg font-semibold text-gray-700">Jenis Kelamin</label>
                <select name="jenisKelamin" id="jenis_kelamin" value={formData.jenisKelamin} onChange={handleChange} className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option value="">Silakan Pilih</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="organisasi" className="block text-lg font-semibold text-gray-700">Organisasi</label>
                <select name="organisasi" id="organisasi" value={formData.organisasi} onChange={handleChange} className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option value="">Silakan Pilih</option>
                  <option value="OSIS">OSIS</option>
                  <option value="PMR">PMR</option>
                  <option value="PRAMUKA">PRAMUKA</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="ekstrakurikuler" className="block text-lg font-semibold text-gray-700">Ekstrakurikuler</label>
                <select name="ekstrakurikuler" id="ekstrakurikuler" value={formData.ekstrakurikuler} onChange={handleChange} className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option value="">Silakan Pilih</option>
                  <option value="Bahasa">Bahasa</option>
                  <option value="Kesenian">Kesenian</option>
                  <option value="Olahraga">Olahraga</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sertifikasi_profesi" className="block text-lg font-semibold text-gray-700">Sertifikasi Profesi</label>
                <select name="sertifikasiProfesi" id="sertifikasi_profesi" value={formData.sertifikasiProfesi} onChange={handleChange} className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option value="">Silakan Pilih</option>
                  <option value="Kompeten">Kompeten</option>
                  <option value="Tidak Kompeten">Tidak Kompeten</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="nilai_akhir" className="block text-lg font-semibold text-gray-700">Nilai Akhir</label>
                <select name="nilaiAkhir" id="nilai_akhir" value={formData.nilaiAkhir} onChange={handleChange} className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option value="">Silakan Pilih</option>
                  <option value="Baik">Baik</option>
                  <option value="Sangat Baik">Sangat Baik</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tempat_magang" className="block text-lg font-semibold text-gray-700">Tempat Magang</label>
                <select name="tempatMagang" id="tempat_magang" value={formData.tempatMagang} onChange={handleChange} className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option value="">Silakan Pilih</option>
                  <option value="Bandara Udara">Bandara Udara</option>
                  <option value="ISP">ISP</option>
                  <option value="Perhotelan">Perhotelan</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tempat_kerja" className="block text-lg font-semibold text-gray-700">Tempat Kerja</label>
                <select name="tempatKerja" id="tempat_kerja" value={formData.tempatKerja} onChange={handleChange} className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option value="">Silakan Pilih</option>
                  <option value="Bandara Udara">Bandara Udara</option>
                  <option value="Ekspor-Impor">Ekspor-Impor</option>
                  <option value="ISP">ISP</option>
                  <option value="Perhotelan">Perhotelan</option>
                </select>
              </div>
            </div>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            <div className="text-center">
              <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transform transition duration-200 hover:scale-105">
                Submit
              </button>
            </div>
          </form>

          {predictionResult && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Prediction Result:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Predicted Class */}
                <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center">
                  <strong className="text-lg text-gray-700 mb-2">Predicted Class:</strong>
                  <span className="text-2xl font-bold text-indigo-600">{predictionResult.predictedClass}</span>
                </div>

                {/* Priors */}
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h4 className="font-semibold text-lg text-gray-700 mb-2">Priors:</h4>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(predictionResult.priors, null, 2)}
                  </pre>
                </div>

                {/* Likelihoods */}
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h4 className="font-semibold text-lg text-gray-700 mb-2">Likelihoods:</h4>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(predictionResult.likelihoods, null, 2)}
                  </pre>
                </div>

                {/* Posteriors */}
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h4 className="font-semibold text-lg text-gray-700 mb-2">Posteriors:</h4>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(predictionResult.posteriors, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
