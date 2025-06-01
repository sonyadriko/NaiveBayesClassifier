import React, { useState } from "react";
import 'animate.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


const EvaluationPage = () => {
  const [testSize, setTestSize] = useState("0.1");
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/evaluate/confusion_matrix",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ test_size: parseFloat(testSize) }),
        }
      );

      const data = await response.json();

      if (data.confusion_matrix) {
        setEvaluationResult(data);
      } else {
        setEvaluationResult(null);
      }
    } catch (error) {
      alert("Error in evaluation: " + error);
    }

    setLoading(false);
  };
  const getPerformanceDescription = () => {
    const accuracy = evaluationResult.accuracy;
    const precision = evaluationResult.precision;
    const f1 = evaluationResult.f1_score;
  
    if (accuracy >= 0.9) {
      return (
        <p>
          Model menunjukkan performa yang sangat baik dengan akurasi tinggi ({(accuracy * 100).toFixed(2)}%). 
          Hasil prediksi sangat konsisten dengan data aktual. Presisi dan F1-score juga tinggi, 
          yang menunjukkan kemampuan model dalam mengklasifikasikan kelulusan secara akurat.
        </p>
      );
    } else if (accuracy >= 0.7) {
      return (
        <p>
          Model menunjukkan performa yang cukup baik dengan akurasi {(accuracy * 100).toFixed(2)}%. 
          Meskipun masih terdapat beberapa kesalahan prediksi, model tetap dapat digunakan untuk memberikan gambaran umum kelulusan siswa.
        </p>
      );
    } else {
      return (
        <p>
          Model masih memiliki akurasi yang rendah ({(accuracy * 100).toFixed(2)}%) dan nilai F1-score yang tidak optimal. 
          Hal ini menunjukkan bahwa model perlu dilakukan perbaikan, baik dari sisi kualitas data maupun parameter pelatihan, 
          agar dapat menghasilkan prediksi yang lebih andal.
        </p>
      );
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container mx-auto p-6 animate__animated animate__fadeIn">
          <h2 className="text-3xl font-bold mb-6">Evaluate</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg space-y-6 animate__animated animate__fadeIn"
          >
            <div className="mb-6">
              <label
                htmlFor="test-size"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Pilih Ukuran Test Data
              </label>
              <select
                id="test-size"
                value={testSize}
                onChange={(e) => setTestSize(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="0.1">10% Test - 90% Train</option>
                <option value="0.2">20% Test - 80% Train</option>
                <option value="0.3">30% Test - 70% Train</option>
                <option value="0.4">40% Test - 60% Train</option>
                <option value="0.5">50% Test - 50% Train</option>
                <option value="0.6">60% Test - 40% Train</option>
                <option value="0.7">70% Test - 30% Train</option>
                <option value="0.8">80% Test - 20% Train</option>
                <option value="0.9">90% Test - 10% Train</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transform transition duration-200 hover:scale-105"
                disabled={loading}
              >
                {loading ? "Evaluating..." : "Evaluasi"}
              </button>
            </div>
          </form>

          {evaluationResult && (
            <div className="mt-10 space-y-8">
              {/* Confusion Matrix */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Confusion Matrix
                </h3>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <table className="table-auto w-full text-center">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 border">Actual\Predicted</th>
                        <th className="p-3 border">Predicted Negatif</th>
                        <th className="p-3 border">Predicted Positif</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">Actual Negatif</td>
                        <td className="p-3 border">
                          {evaluationResult.confusion_matrix[0][0]}
                        </td>
                        <td className="p-3 border">
                          {evaluationResult.confusion_matrix[0][1]}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border">Actual Positif</td>
                        <td className="p-3 border">
                          {evaluationResult.confusion_matrix[1][0]}
                        </td>
                        <td className="p-3 border">
                          {evaluationResult.confusion_matrix[1][1]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Evaluation Metrics */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Evaluation Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center gap-1">
                      Akurasi
                      <span
                        className="cursor-help"
                        title="Akurasi menunjukkan seberapa banyak prediksi yang benar dari seluruh data."
                      >
                        ℹ️
                      </span>
                    </span>
                    <span>{evaluationResult.accuracy.toFixed(4)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center gap-1">
                      Presisi
                      <span
                        className="cursor-help"
                        title="Presisi mengukur seberapa banyak dari prediksi positif yang benar-benar positif."
                      >
                        ℹ️
                      </span>
                    </span>
                    <span>{evaluationResult.precision.toFixed(4)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center gap-1">
                      Recall
                      <span
                        className="cursor-help"
                        title="Recall mengukur seberapa banyak data positif yang berhasil teridentifikasi dengan benar dari seluruh data positif yang ada."
                      >
                        ℹ️
                      </span>
                    </span>
                    <span>{evaluationResult.recall.toFixed(4)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 flex items-center gap-1">
                      F1-Score
                      <span
                        className="cursor-help"
                        title="F1-Score adalah rata-rata harmonik dari presisi dan recall. Cocok digunakan saat keseimbangan antara presisi dan recall penting."
                      >
                        ℹ️
                      </span>
                    </span>
                    <span>{evaluationResult.f1_score.toFixed(4)}</span>
                  </div>
                </div>



              </div>
         
{evaluationResult && (
  <div className="bg-white p-8 rounded-lg shadow-lg mt-6">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
      Grafik Evaluasi Model
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={[
          { name: 'Akurasi', value: evaluationResult.accuracy },
          { name: 'Presisi', value: evaluationResult.precision },
          { name: 'Recall', value: evaluationResult.recall },
          { name: 'F1-Score', value: evaluationResult.f1_score },
        ]}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>

    <div className="mt-6 text-gray-700 text-lg leading-relaxed">
  {getPerformanceDescription()}
</div>

  </div>
)}


            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
