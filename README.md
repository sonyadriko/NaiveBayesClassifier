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
- Backend: Flask, Swagger (Python) 📝
- Frontend: React JS 🌐
- Komunikasi API: JSON 🔐

---

# 🎨 **Tampilan**
1. Halaman Input Data
💡 Form input memungkinkan pengguna untuk memasukkan data seperti:
  Ekstrakurikuler
  Jenis Kelamin
  Nilai Akhir
  Pengalaman Organisasi
  Sertifikasi Profesi
  Tempat Kerja dan Magang
2. Hasil Prediksi
Hasil prediksi mencakup:
  - ✅ Predicted Class: Menunjukkan apakah hasilnya "Ya" atau "Tidak."
  - 🔐 Priors: Probabilitas awal dari setiap kelas.
  - 🔢 Likelihoods: Probabilitas atribut untuk setiap kelas.
  - ⚛ Posteriors: Probabilitas akhir untuk setiap kelas.
  
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
![image](https://github.com/user-attachments/assets/20a998f0-6f87-474b-8833-3c52872f25ff)


---

# 🎮 Cara Kerja

1. Input Data: Pengguna memasukkan atribut siswa.
2. Proses Prediksi: Algoritma Naïve Bayes menghitung likelihood, prior, dan posterior untuk menentukan kelas.
3. Hasil Ditampilkan: Sistem menampilkan Predicted Class bersama probabilitasnya.

---

# 🎉 **Kontribusi**

Kami terbuka untuk kontribusi! 🚀 Jika Anda ingin menambahkan fitur atau memperbaiki bug, silakan fork repositori ini dan kirimkan pull request.
Cara Kontribusi
1. Fork repositori ini.
2. Buat branch baru: git checkout -b fitur-baru.
3. Commit perubahan Anda: git commit -m 'Menambahkan fitur baru'.
4. Push branch: git push origin fitur-baru.
5. Buat pull request di GitHub.
  
---

# 🌐 **Lisensi**
Proyek ini dilisensikan di bawah MIT License.
