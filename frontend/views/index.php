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

    <!-- jvectormap -->
    <link href="../assets/plugins/jvectormap/jquery-jvectormap-2.0.2.css" rel="stylesheet">

    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/icons.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/style.css" rel="stylesheet" type="text/css">

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

    <!--Morris Chart-->
    <script src="../assets/plugins/flot-chart/jquery.flot.min.js"></script>
    <script src="../assets/plugins/flot-chart/jquery.flot.time.js"></script>
    <script src="../assets/plugins/flot-chart/curvedLines.js"></script>
    <script src="../assets/plugins/flot-chart/jquery.flot.pie.js"></script>
    <script src="../assets/plugins/morris/morris.min.js"></script>
    <script src="../assets/plugins/raphael/raphael-min.js"></script>
    <script src="../assets/plugins/jquery-sparkline/jquery.sparkline.min.js"></script>

    <script src="../assets/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js"></script>
    <script src="../assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>


    <script src="../assets/pages/crypto-dash.init.js"></script>

    <!-- App js -->
    <script src="../assets/js/app.js"></script>
    <script>
    $(document).ready(function() {
        $("#boxscroll").niceScroll({
            cursorborder: "",
            cursorcolor: "#cecece",
            boxzoom: true
        });
        $("#boxscroll2").niceScroll({
            cursorborder: "",
            cursorcolor: "#cecece",
            boxzoom: true
        });
    });
    </script>


</body>

</html>