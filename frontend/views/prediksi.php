<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <title>Prediksi</title>
    <meta content="Admin Dashboard" name="description" />
    <meta content="Mannatthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <link rel="shortcut icon" href="../assets/images/favicon.ico">

    <!-- jvectormap -->
    <link href="../assets/plugins/jvectormap/jquery-jvectormap-2.0.2.css" rel="stylesheet">

    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/icons.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/style.css" rel="stylesheet" type="text/css">
    <style>
    .result-box {
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 4px;
        background-color: #f9f9f9;
        border-radius: 5px;
    }

    .result-box h4 {
        margin-top: 0;
        font-size: 16px;
        color: #333;
    }

    .result-box p {
        font-size: 14px;
        color: #333;
    }

    .result-box pre {
        font-size: 14px;
        background-color: #f4f4f4;
        border-radius: 4px;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .result {
        font-weight: bold;
        color: #2d2d2d;
    }

    .result-box code {
        font-size: 13px;
        color: #555;
        display: block;
        word-wrap: break-word;
        white-space: pre-wrap;
    }
    </style>

</head>


<body class="fixed-left">

    <!-- Loader -->
    <div id="preloader">
        <div id="status">
            <div class="spinner"></div>
        </div>
    </div>

    <!-- Begin page -->
    <div id="wrapper">

        <!-- ========== Left Sidebar Start ========== -->
        <?php include 'partials/sidebar.php'?>
        <!-- Left Sidebar End -->

        <!-- Start right Content here -->

        <div class="content-page">
            <!-- Start content -->
            <div class="content">

                <!-- Top Bar Start -->
                <?php include 'partials/topbar.php' ?>
                <!-- Top Bar End -->

                <div class="page-content-wrapper ">

                    <div class="container-fluid">

                        <div class="row">
                            <div class="col-sm-12">
                                <div class="page-title-box">
                                    <h4 class="page-title">Prediksi</h4>
                                </div>
                            </div>
                        </div>
                        <!-- end page title end breadcrumb -->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mini-stat clearfix bg-white p-4">
                                    <div class="row align-items-center">
                                        <div class="col-md-12">
                                            <form id="prediction-form" class="form-horizontal">
                                                <div class="form-group">
                                                    <label for="jenis_kelamin" class="form-label">Jenis Kelamin</label>
                                                    <select id="jenis_kelamin" class="form-control">
                                                        <option value="0">Laki-laki</option>
                                                        <option value="1">Perempuan</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="organisasi" class="form-label">Organisasi</label>
                                                    <select id="organisasi" class="form-control">
                                                        <option value="0">OSIS</option>
                                                        <option value="1">PMR</option>
                                                        <option value="2">PRAMUKA</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="ekstrakurikuler"
                                                        class="form-label">Ekstrakurikuler</label>
                                                    <select id="ekstrakurikuler" class="form-control">
                                                        <option value="0">Bahasa</option>
                                                        <option value="1">Kesenian</option>
                                                        <option value="2">Olahraga</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="sertifikasi_profesi" class="form-label">Sertifikasi
                                                        Profesi</label>
                                                    <select id="sertifikasi_profesi" class="form-control">
                                                        <option value="0">Kompeten</option>
                                                        <option value="1">Tidak Kompeten</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="nilai_akhir" class="form-label">Nilai Akhir</label>
                                                    <select id="nilai_akhir" class="form-control">
                                                        <option value="0">Baik</option>
                                                        <option value="1">Sangat Baik</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="tempat_magang" class="form-label">Tempat Magang</label>
                                                    <select id="tempat_magang" class="form-control">
                                                        <option value="0">Bandara Udara</option>
                                                        <option value="1">ISP</option>
                                                        <option value="2">Perhotelan</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label for="tempat_kerja" class="form-label">Tempat Kerja</label>
                                                    <select id="tempat_kerja" class="form-control">
                                                        <option value="0">Bandara Udara</option>
                                                        <option value="1">Ekspor-Impor</option>
                                                        <option value="2">ISP</option>
                                                        <option value="3">Perhotelan</option>
                                                    </select>
                                                </div>

                                                <div class="text-center">
                                                    <button type="submit"
                                                        class="btn btn-primary px-4 py-2">Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="row">
                            <div class="col-md-12">
                                <div class="mini-stat clearfix bg-white p-4">
                                    <div class="row align-items-center">
                                        <div class="col-md-12">
                                            <div id="prediction-result" style="margin-top: 20px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!--end row-->

                    </div><!-- container -->

                </div> <!-- Page content Wrapper -->

            </div> <!-- content -->

            <footer class="footer">
                © 2025 Naive Bayes
            </footer>

        </div>
        <!-- End Right content here -->

    </div>
    <!-- END wrapper -->


    <!-- jQuery  -->
    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/js/popper.min.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/modernizr.min.js"></script>
    <script src="../assets/js/detect.js"></script>
    <script src="../assets/js/fastclick.js"></script>
    <script src="../assets/js/jquery.slimscroll.js"></script>
    <script src="../assets/js/jquery.blockUI.js"></script>
    <script src="../assets/js/waves.js"></script>
    <script src="../assets/js/jquery.nicescroll.js"></script>
    <script src="../assets/js/jquery.scrollTo.min.js"></script>

    <!-- App js -->
    <script src="../assets/js/app.js"></script>
    <script>
    $(document).ready(function() {
        // Form submit handler
        $('#prediction-form').submit(function(event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data into an object with custom keys (labels)
            const formData = {
                "Jenis Kelamin": parseInt($('#jenis_kelamin').val()), // Convert to integer
                "Organisasi": parseInt($('#organisasi').val()), // Convert to integer
                "Ekstrakurikuler": parseInt($('#ekstrakurikuler').val()), // Convert to integer
                "Sertifikasi Profesi": parseInt($('#sertifikasi_profesi')
                    .val()), // Convert to integer
                "Nilai Akhir": parseInt($('#nilai_akhir').val()), // Convert to integer
                "Tempat Magang": parseInt($('#tempat_magang').val()), // Convert to integer
                "Tempat Kerja": parseInt($('#tempat_kerja').val()) // Convert to integer
            };

            // Send data to the Flask endpoint using AJAX
            $.ajax({
                url: 'http://127.0.0.1:5000/predict', // Replace with your Flask endpoint
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(formData), // Send form data as JSON
                success: function(response) {
                    // Convert 0 and 1 to 'Ya' and 'Tidak' respectively
                    const translate = (value) => {
                        return value === 0 ? 'Ya' : 'Tidak';
                    };

                    // Dynamically display the prediction result below the form
                    $('#prediction-result').html(`
                    <h3>Prediction Result:</h3>
                    <div class="result-box">
                        <p><strong>Predicted Class:</strong> <span class="result">${translate(response.predicted_class)}</span></p>
                    </div>
                      <div class="result-box">
                        <h4>Priors:</h4>
                        <pre><code>${JSON.stringify(response.priors, null, 2)}</code></pre>
                    </div>
                    <div class="result-box">
                        <h4>Likelihoods:</h4>
                        <pre><code>${JSON.stringify(response.likelihoods, null, 2)}</code></pre>
                    </div>
                    <div class="result-box">
                        <h4>Posteriors:</h4>
                        <pre><code>${JSON.stringify(response.posteriors, null, 2)}</code></pre>
                    </div>
                    
                  
                `);
                },
                error: function(xhr, status, error) {
                    // Handle error: Show alert
                    alert('Terjadi kesalahan dalam pengiriman data: ' + error);
                }
            });
        });
    });
    </script>

</body>

</html>