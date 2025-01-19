<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <title>Dashboard</title>
    <meta content="Admin Dashboard" name="description" />
    <meta content="Mannatthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <link rel="shortcut icon" href="../assets/images/favicon.ico">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/style.css" rel="stylesheet" type="text/css">

</head>
<body class="fixed-left">
    <!-- Loader -->
    <!-- <div id="preloader">
        <div id="status">
            <div class="spinner"></div>
        </div>
    </div> -->

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
                                    <h4 class="page-title">Dashboard</h4>
                                </div>
                            </div>
                        </div>
                        <!-- end page title end breadcrumb -->

                        <!-- Explanation of Naive Bayes Classifier -->
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Naive Bayes Classifier</h4>
                                        <p class="text-muted">
                                        Naive Bayes Classifier adalah model pembelajaran mesin probabilistik yang digunakan untuk tugas-tugas klasifikasi. Model ini didasarkan pada Teorema Bayes, yang menggambarkan probabilitas suatu peristiwa berdasarkan pengetahuan sebelumnya tentang kondisi yang mungkin terkait dengan peristiwa tersebut. Pengklasifikasi mengasumsikan bahwa keberadaan fitur tertentu dalam suatu kelas tidak terkait dengan keberadaan fitur lainnya.
                                        </p>
                                        <p class="text-muted">
                                        Terlepas dari kesederhanaannya, Naive Bayes Classifier dapat bekerja dengan sangat baik di banyak aplikasi dunia nyata, terutama untuk tugas-tugas klasifikasi teks seperti deteksi spam, analisis sentimen, dan kategorisasi dokumen.
                                        </p>
                                        <p class="text-muted">
                                        Keuntungan utama dari Naive Bayes Classifier meliputi kesederhanaan, efisiensi, dan kemampuannya untuk menangani kumpulan data yang besar. Namun, metode ini bergantung pada asumsi independensi fitur, yang mungkin tidak selalu benar dalam praktiknya.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end explanation -->

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


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>
   



</body>

</html>