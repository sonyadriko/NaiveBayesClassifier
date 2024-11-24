<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <title>Data Training</title>
    <meta content="Admin Dashboard" name="description" />
    <meta content="Mannatthemes" name="author" />

    <link rel="shortcut icon" href="../assets/images/favicon.ico">

    <!-- CSS Files -->
    <link href="../assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/icons.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/style.css" rel="stylesheet" type="text/css">

    <!-- DataTables CSS -->
    <link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet">

</head>

<body class="fixed-left">

    <!-- Begin page -->
    <div id="wrapper">

        <!-- Sidebar -->
        <?php include 'partials/sidebar.php' ?>
        <!-- End Sidebar -->

        <!-- Content -->
        <div class="content-page">
            <div class="content">
                <!-- Top Bar -->
                <?php include 'partials/topbar.php' ?>
                <!-- End Top Bar -->

                <div class="page-content-wrapper">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="page-title-box">
                                    <h4 class="page-title">Data Training</h4>
                                </div>
                            </div>
                        </div>
                        <!-- Form Section -->
                        <div class="row mb-4">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Upload Excel File</h4>
                                        <form id="uploadForm" action="/upload" method="POST"
                                            enctype="multipart/form-data">
                                            <div class="form-group">
                                                <label for="excelFile">Choose Excel File</label>
                                                <input type="file" class="form-control" id="excelFile" name="file"
                                                    accept=".xls,.xlsx" required>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Upload</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Form Section -->
                        <!-- Table Section -->
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Data from Server</h4>
                                        <div class="table-responsive">
                                            <table id="data-table" class="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <!-- Table headers will be dynamically added -->
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- Table rows will be dynamically added -->
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Table Section -->
                    </div>
                </div>
            </div>

            <footer class="footer">
                © 2024 Naive Bayes
            </footer>
        </div>
    </div>

    <!-- JS Files -->
    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <script>
    $(document).ready(function() {
        $('#uploadForm').on('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            var formData = new FormData(this); // Prepare form data

            $.ajax({
                url: 'http://127.0.0.1:5000/upload', // The Flask endpoint to handle the file upload
                type: 'POST',
                data: formData,
                contentType: false, // Do not set content type (multipart)
                processData: false, // Do not process the data
                success: function(response) {
                    alert('File uploaded successfully');
                },
                error: function(err) {
                    alert('Error uploading file');
                }
            });
        });
    });
    </script>
    <script>
    $(document).ready(function() {
        // Fetch data from Flask endpoint
        $.ajax({
            url: 'http://127.0.0.1:5000/readdata',
            method: 'GET',
            success: function(response) {
                if (response.data) {
                    const data = response.data;

                    // Tentukan urutan kolom yang diinginkan
                    const columnOrder = [
                        'Jenis Kelamin',
                        'Organisasi',
                        'Ekstrakurikuler',
                        'Sertifikasi Profesi',
                        'Nilai Akhir',
                        'Tempat Magang',
                        'Tempat Kerja',
                        'Durasi Mendapat Kerja'
                    ];

                    // Pastikan kolom yang diterima mengikuti urutan yang diinginkan
                    const headers = columnOrder;
                    let headerHtml = '';
                    headers.forEach(header => {
                        headerHtml += `<th>${header}</th>`;
                    });
                    $('#data-table thead tr').html(headerHtml);

                    // Populate table rows
                    let bodyHtml = '';
                    data.forEach(row => {
                        bodyHtml += '<tr>';
                        headers.forEach(header => {
                            bodyHtml += `<td>${row[header]}</td>`;
                        });
                        bodyHtml += '</tr>';
                    });
                    $('#data-table tbody').html(bodyHtml);

                    // Initialize DataTable
                    $('#data-table').DataTable();
                }
            },
            error: function(err) {
                console.error('Error fetching data:', err);
            }
        });
    });
    </script>

</body>

</html>