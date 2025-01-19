import React from 'react';

const DataTraining = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex-1">

        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-6">Data Training</h2>

          <div className="card bg-white shadow-md p-6">
            <h4 className="text-xl font-semibold">Naive Bayes Classifier</h4>
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

export default DataTraining;
