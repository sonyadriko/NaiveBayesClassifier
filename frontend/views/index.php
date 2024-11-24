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
                                    <div class="btn-group float-right">
                                        <ol class="breadcrumb hide-phone p-0 m-0">
                                            <li class="breadcrumb-item"><a href="#">Annex</a></li>
                                            <li class="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>
                                    <h4 class="page-title">Dashboard</h4>
                                </div>
                            </div>
                        </div>
                        <!-- end page title end breadcrumb -->
                        <div class="row">
                            <div class="col-md-6 col-xl-3">
                                <div class="mini-stat clearfix bg-white">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <img src="../assets/images/coins/btc.png" alt="" class="rounded-curcle">
                                        </div>
                                        <div class="col-4">
                                            <h4 class="counter text-dark m-0 pb-1">$ 11852</h4>
                                            <i class="mdi mdi-arrow-down text-danger"></i> <small
                                                class="text-danger">-5.45%</small>
                                        </div>
                                        <div class="col-4">
                                            <a href="#" class="btn btn-success btn-sm float-right">Buy</a>
                                        </div>
                                        <div class="col-12">
                                            <div id="sparkline0"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-3">
                                <div class="mini-stat clearfix bg-white">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <img src="../assets/images/coins/eth.png" alt="" class="rounded-curcle">
                                        </div>
                                        <div class="col-4">
                                            <h4 class="counter text-dark m-0 pb-1">$ 956</h4>
                                            <i class="mdi mdi-arrow-up text-success"></i> <small
                                                class="text-success">+1.45%</small>
                                        </div>
                                        <div class="col-4">
                                            <a href="#" class="btn btn-danger btn-sm float-right">Sell</a>
                                        </div>
                                        <div class="col-12">
                                            <div id="sparkline1"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-3  align-items-center">
                                <div class="mini-stat clearfix bg-white">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <img src="../assets/images/coins/dash.png" alt="" class="rounded-curcle">
                                        </div>
                                        <div class="col-4">
                                            <h4 class="counter text-dark m-0 pb-1">$ 825</h4>
                                            <i class="mdi mdi-arrow-down text-danger"></i> <small
                                                class="text-danger">-5.45%</small>
                                        </div>
                                        <div class="col-4">
                                            <a href="#" class="btn btn-success btn-sm float-right">Buy</a>
                                        </div>
                                        <div class="col-12">
                                            <div id="sparkline2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-3">
                                <div class="mini-stat clearfix bg-white">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <img src="../assets/images/coins/lite.png" alt="" class="rounded-curcle">
                                        </div>
                                        <div class="col-4">
                                            <h4 class="counter text-dark m-0 pb-1">$ 250</h4>
                                            <i class="mdi mdi-arrow-up text-success"></i> <small
                                                class="text-success">+1.45%</small>
                                        </div>
                                        <div class="col-4">
                                            <a href="#" class="btn btn-danger btn-sm float-right">Sell</a>
                                        </div>
                                        <div class="col-12">
                                            <div id="sparkline3"></div>
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
                © 2024 Naive Bayes
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