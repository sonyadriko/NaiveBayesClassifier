<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <title>Evaluasi</title>
    <link rel="shortcut icon" href="../assets/images/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="../assets/css/style.css" rel="stylesheet" type="text/css">
    <style>
        .result-box {
            border: 1px solid #ddd;
            padding: 10px;
            margin-bottom: 10px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }

        .result-box h4 {
            margin-top: 0;
            font-size: 16px;
            color: #333;
        }

        .result-box table {
            width: 100%;
            border-collapse: collapse;
        }

        .result-box table th,
        .result-box table td {
            border: 1px solid #ddd;
            text-align: center;
            padding: 8px;
        }

        .result-box table th {
            background-color: #f4f4f4;
            font-weight: bold;
        }
    </style>
</head>

<body class="fixed-left">
    <div id="wrapper">
        <?php include 'partials/sidebar.php' ?>
        <div class="content-page">
            <div class="content">
                <?php include 'partials/topbar.php' ?>
                <div class="page-content-wrapper">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="page-title-box">
                                    <h4 class="page-title">Evaluasi</h4>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="mini-stat clearfix bg-white p-4">
                                    <form id="evaluation-form">
                                        <div class="form-group">
                                            <label for="test-size" class="form-label">Pilih Ukuran Test Data</label>
                                            <select id="test-size" class="form-control">
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
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary px-4 py-2">Evaluasi</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="display: none;">
                            <div class="col-md-12">
                                <div class="mini-stat clearfix bg-white p-4">
                                    <div id="evaluation-result" style="margin-top: 20px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">© 2025 Naive Bayes</footer>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></script>

    <script>
    $(document).ready(function () {
        $('#evaluation-form').submit(function (event) {
            event.preventDefault();

            // Ambil test size dari dropdown
            const testSize = parseFloat($('#test-size').val());

            // Kirim permintaan ke backend
            $.ajax({
                url: 'http://127.0.0.1:5000/evaluate/confusion_matrix',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ test_size: testSize }),
                success: function (response) {
                    const matrix = response.confusion_matrix;
                    const accuracy = response.accuracy;
                    const precision = response.precision;
                    const recall = response.recall;
                    const f1_score = response.f1_score;
                    const testSizeUsed = response.test_size;

                    if (matrix && matrix.length > 0 && accuracy !== undefined && precision !== undefined && recall !== undefined && f1_score !== undefined) {
        // Menyiapkan HTML untuk confusion matrix dan metrik evaluasi
        let matrixHTML = `
            <h3>Confusion Matrix</h3>
            <div class="result-box">
                <h4>Ukuran Test Data: ${(testSizeUsed * 100).toFixed(0)}%</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Actual\Predicted</th>
                            <th>Predicted Negatif</th>
                            <th>Predicted Positif</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><th>Predicted Negatif</th><td>${matrix[0][0]}</td><td>${matrix[0][1]}</td></tr>
                        <tr><th>Predicted Positif</th><td>${matrix[1][0]}</td><td>${matrix[1][1]}</td></tr>
                    </tbody>
                </table>
            </div>
            <h4>Evaluation Metrics</h4>
            <div class="result-box">
                <table>
                    <tr><td>Akurasi</td><td>${accuracy.toFixed(4)}</td></tr>
                    <tr><td>Presisi</td><td>${precision.toFixed(4)}</td></tr>
                    <tr><td>Recall</td><td>${recall.toFixed(4)}</td></tr>
                    <tr><td>F1-Score</td><td>${f1_score.toFixed(4)}</td></tr>
                </table>
            </div>
        `;

        // Menampilkan hasil di elemen #evaluation-result
        $('#evaluation-result').html(matrixHTML);

        // Menampilkan elemen row jika ada data
        $('.row').show();
    } else {
        // Menyembunyikan elemen jika tidak ada data evaluasi
        $('.row').hide();
    }
                },
                error: function (xhr, status, error) {
                    alert('Terjadi kesalahan dalam evaluasi: ' + error);
                }
            });
        });
    });
</script>

</body>

</html>
