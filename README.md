# 🔨 **Sistem Prediksi Kelulusan Siswa SMK dalam Mendapatkan Kerja — Naïve Bayes Classifier**

Selamat datang di repositori proyek Analisis Menentukan Pola Kelulusan Siswa SMK dalam Mendapat Kerja menggunakan algoritma Naïve Bayes Classifier! Proyek ini bertujuan untuk membantu dalam menganalisis data siswa untuk menentukan pola kelulusan dan peluang mendapatkan kerja. 🌐

---

# 📊 **Fitur Utama**
- 🧩 Prediksi Otomatis: Menggunakan algoritma Naïve Bayes untuk memprediksi hasil (Ya/Tidak).
- 🔢 Analisis Probabilitas: Menampilkan Likelihood, Posterior, dan Prior dalam format yang mudah dipahami.
- 🔄 UI Interaktif: Formulir input sederhana dan hasil prediksi yang ditampilkan langsung di bawah form.
- 🔒 Transparansi Data: Memvisualisasikan semua probabilitas (Ya/Tidak).

---

# 🛠️ **Teknologi yang Digunakan**
- Backend: Flask (Python) 📝
- Frontend: HTML, CSS, Bootstrap 🌐
- Komunikasi API: JSON 🔐

---

# 🎨 **Tampilan**
- Halaman Input Data

💡 Form input memungkinkan pengguna untuk memasukkan data seperti:
  Ekstrakurikuler
  Jenis Kelamin
  Nilai Akhir
  Pengalaman Organisasi
  Sertifikasi Profesi
  Tempat Kerja dan Magang
- Hasil Prediksi
Hasil prediksi mencakup:
  - ✅ Predicted Class: Menunjukkan apakah hasilnya "Ya" atau "Tidak."
  - ⚛ Posteriors: Probabilitas akhir untuk setiap kelas.
  - 🔢 Likelihoods: Probabilitas atribut untuk setiap kelas.
  - 🔐 Priors: Probabilitas awal dari setiap kelas.
---
# 📒 **Instalasi dan Penggunaan**
- Langkah 1: Clone Repositori
  ```bash
  $ git clone https://github.com/username/sistem-prediksi-smk.git
  $ cd sistem-prediksi-smk
   ```
- Langkah 2: Buat Virtual Environment
  ```bash
  $ python -m venv venv
  $ source venv/bin/activate   # Untuk Linux/Mac
  $ venv\Scripts\activate    # Untuk Windows
  ```
- Langkah 3: Instal Dependensi
  ```bash
  $ pip install -r requirements.txt
  ```
- Langkah 4: Jalankan Aplikasi
  ```bash
  $ flask run
  ```
Buka browser Anda dan akses: http://localhost:5000

---

# 🌐 **Endpoint Backend**
Aplikasi backend mendukung beberapa endpoint penting:
- /upload: Mengunggah data siswa untuk diproses.
- /convert: Mengonversi format data yang diunggah menjadi format yang sesuai.
- /predict: Melakukan prediksi berdasarkan data yang dimasukkan.
- /get_labels: Mendapatkan label data.
- /readdata: Membaca data dari database untuk analisis lebih lanjut.
Setiap endpoint berkomunikasi menggunakan JSON dan memberikan respons yang mudah dipahami oleh pengguna maupun pengembang.

---

# 🎮 Cara Kerja

- Input Data: Pengguna memasukkan atribut siswa.
- Proses Prediksi: Algoritma Naïve Bayes menghitung likelihood, prior, dan posterior untuk menentukan kelas.
- Hasil Ditampilkan: Sistem menampilkan Predicted Class bersama probabilitasnya.

---

# 🎉 **Kontribusi**

Kami terbuka untuk kontribusi! 🚀 Jika Anda ingin menambahkan fitur atau memperbaiki bug, silakan fork repositori ini dan kirimkan pull request.
Cara Kontribusi
- Fork repositori ini.
- Buat branch baru: git checkout -b fitur-baru.
- Commit perubahan Anda: git commit -m 'Menambahkan fitur baru'.
- Push branch: git push origin fitur-baru.
- Buat pull request di GitHub.
  
---

# 🌐 **Lisensi**
Proyek ini dilisensikan di bawah MIT License.
