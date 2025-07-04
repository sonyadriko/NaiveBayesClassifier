import React, { useState } from 'react';
import 'animate.css';

interface FormData {
  jenisKelamin: string;
  organisasi: string;
  ekstrakurikuler: string;
  sertifikasiProfesi: string;
  nilaiAkhir: string;
  tempatMagang: string;
  tempatKerja: string;
}

interface PredictionResult {
  predictedClass: string;
  priors: Record<string, number>;
  likelihoods: Record<string, Record<string, number>>;
  posteriors: Record<string, number>;
  evidence: Record<string, number>;
}

const PredictionPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    jenisKelamin: '',
    organisasi: '',
    ekstrakurikuler: '',
    sertifikasiProfesi: '',
    nilaiAkhir: '',
    tempatMagang: '',
    tempatKerja: '',
  });

  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const invalidSelection = Object.values(formData).some((value) => value === '');
    if (invalidSelection) {
      setErrorMessage('Silakan pilih semua opsi sebelum submit.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      

      if (!response.ok) {
        throw new Error('Failed to fetch prediction.');
      }

      const data = await response.json();
console.log(data); // Tambahkan ini untuk debug


      setPredictionResult({
        predictedClass: data.posteriors['< 3 Bulan'] > data.posteriors['> 3 Bulan'] ? 'Ya' : 'Tidak',
        priors: data.priors,
        likelihoods: data.likelihoods,
        posteriors: data.posteriors,
        evidence: data.evidence,
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
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg space-y-6 animate__animated animate__fadeIn"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'jenisKelamin', label: 'Jenis Kelamin', options: ['Laki-laki', 'Perempuan'] },
                { name: 'organisasi', label: 'Organisasi', options: ['OSIS', 'PMR', 'PRAMUKA'] },
                { name: 'ekstrakurikuler', label: 'Ekstrakurikuler', options: ['Bahasa', 'Kesenian', 'Olahraga'] },
                { name: 'sertifikasiProfesi', label: 'Sertifikasi Profesi', options: ['Kompeten', 'Tidak Kompeten'] },
                { name: 'nilaiAkhir', label: 'Nilai Akhir', options: ['Baik', 'Sangat Baik'] },
                { name: 'tempatMagang', label: 'Tempat Magang', options: ['Bandara Udara', 'ISP', 'Perhotelan'] },
                { name: 'tempatKerja', label: 'Tempat Kerja', options: ['Bandara Udara', 'Ekspor-Impor', 'ISP', 'Perhotelan'] },
              ].map((field) => (
                <div key={field.name} className="form-group">
                  <label
                    htmlFor={field.name}
                    className="block text-lg font-semibold text-gray-700"
                  >
                    {field.label}
                  </label>
                  <select
                    name={field.name}
                    id={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="">Silakan Pilih</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transform transition duration-200 hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>

          {/* --- MULAI KODE BARU --- */}
          {predictionResult && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg animate__animated animate__fadeInUp">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Hasil Perhitungan Naive Bayes</h3>
              
              {/* Hasil Utama: Predicted Class dan Evidence */}
              {/* --- GANTI BLOK DIV INI --- */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
    <strong className="text-lg text-gray-700 mb-2">Prediksi Masa Tunggu</strong>
    <span className="text-2xl font-bold text-indigo-600">
      {predictionResult.posteriors['< 3 Bulan'] > predictionResult.posteriors['> 3 Bulan']
        ? '< 3 Bulan'
        : '> 3 Bulan'}
    </span>
  </div>
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
    <strong className="text-lg text-gray-700 mb-2">Nilai Evidence (P(X))</strong>
    <span className="text-2xl font-bold text-indigo-600">
      {typeof predictionResult.evidence === 'number'
        // Diubah menjadi persen dengan 6 angka desimal
        ? `${(predictionResult.evidence * 100).toFixed(2)}%`
        : '-'}
    </span>
  </div>
</div>

              {/* Container untuk tabel-tabel */}
              <div className="space-y-8">
                
               {/* --- MULAI KODE BARU --- */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Tabel Prior (sudah dalam persen) */}
  <div>
    <h4 className="font-semibold text-lg mb-2 text-gray-700">Tabel Prior</h4>
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Kelas</th>
            <th className="p-3">Nilai Prior</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(predictionResult.priors).map(([key, val]) => (
            <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 font-medium">{key}</td>
              {/* Diubah menjadi persen */}
              <td className="p-3 font-bold">{(val * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  {/* --- GANTI BLOK DIV TABEL POSTERIOR DENGAN INI --- */}
<div>
  <h4 className="font-semibold text-lg mb-2 text-gray-700">Tabel Posterior</h4>
  <div className="overflow-x-auto bg-white rounded-lg shadow">
    <table className="min-w-full text-sm text-left text-gray-800">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3">Kelas</th>
          <th className="p-3">Nilai Posterior</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(predictionResult.posteriors).map(([key, val]) => (
          <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3 font-medium">{key}</td>
            {/* Diubah menjadi persen dengan 6 angka desimal */}
            <td className="p-3 font-bold">{(val * 100).toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
{/* --- AKHIR KODE BARU --- */}

                {/* Tabel Likelihood */}
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-700">Tabel Likelihood</h4>
                  <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full text-sm text-left text-gray-800">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="p-3">Atribut</th>
                          {Object.keys(predictionResult.likelihoods).map(classLabel => (
                            <th key={classLabel} className="p-3">{classLabel}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(predictionResult.likelihoods[Object.keys(predictionResult.likelihoods)[0]]).map(attribute => (
                          <tr key={attribute} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-3 font-medium">{attribute}</td>
                            {Object.keys(predictionResult.likelihoods).map(classLabel => (
                              <td key={`${classLabel}-${attribute}`} className="p-3">
                                {predictionResult.likelihoods[classLabel][attribute].toFixed(4)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* --- AKHIR KODE BARU --- */}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
