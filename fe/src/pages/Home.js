import React from 'react';
import 'animate.css';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container mx-auto p-6 animate__animated animate__fadeIn">
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-800">Naive Bayes Classifier</h4>
            <p className="text-gray-600 mt-4">
              Naive Bayes Classifier adalah model pembelajaran mesin probabilistik yang digunakan untuk tugas-tugas klasifikasi. Model ini didasarkan pada Teorema Bayes, yang menggambarkan probabilitas suatu peristiwa berdasarkan pengetahuan sebelumnya tentang kondisi yang mungkin terkait dengan peristiwa tersebut.
            </p>
            <p className="text-gray-600 mt-2">
              Keuntungan utama dari Naive Bayes Classifier meliputi kesederhanaan, efisiensi, dan kemampuannya untuk menangani kumpulan data yang besar. Namun, metode ini bergantung pada asumsi independensi fitur, yang mungkin tidak selalu benar dalam praktiknya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
