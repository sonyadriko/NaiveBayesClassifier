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
  likelihoods: Record<string, number>;
  posteriors: Record<string, number>;
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

      setPredictionResult({
        predictedClass: data.posteriors['< 3 Bulan'] > data.posteriors['> 3 Bulan'] ? 'Ya' : 'Tidak',
        priors: data.priors,
        likelihoods: data.likelihoods,
        posteriors: data.posteriors,
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
              {/* Fields */}
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

          {predictionResult && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Prediction Result:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center">
                  <strong className="text-lg text-gray-700 mb-2">Predicted Class:</strong>
                  <span className="text-2xl font-bold text-indigo-600">
                    {predictionResult.predictedClass}
                  </span>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h4 className="font-semibold text-lg text-gray-700 mb-2">Details:</h4>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(predictionResult, null, 2)}
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
