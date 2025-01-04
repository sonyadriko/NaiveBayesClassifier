<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
        <title>Annex - Responsive Bootstrap 4 Admin Dashboard</title>
        <meta content="Admin Dashboard" name="description" />
        <meta content="Mannatthemes" name="author" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <link rel="shortcut icon" href="../assets/images/favicon.ico">

        <link href="../assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="../assets/css/icons.css" rel="stylesheet" type="text/css">
        <link href="../assets/css/style.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

    </head>


    <body>

        
        <!-- Begin page -->
        <div class="accountbg"></div>
        <div class="wrapper-page">

            <div class="card">
                <div class="card-body">

                    <h3 class="text-center mt-0 m-b-15">
                        <a href="index.html" class="logo logo-admin"><img src="../assets/images/logo.png" height="24" alt="logo"></a>
                    </h3>

                    <div class="p-3">
                    <form class="form-horizontal mt-3" action="proses_login.php" method="POST" id="loginForm">
    <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars(bin2hex(random_bytes(32))); ?>">
    <div class="form-group row">
        <div class="col-12">
            <input class="form-control" type="email" name="email" required placeholder="Email">
        </div>
    </div>
    <div class="form-group row">
        <div class="col-12">
            <input class="form-control" type="password" name="password" required placeholder="Password">
        </div>
    </div>
    <div class="form-group text-center row mt-4">
        <div class="col-12">
            <button class="btn btn-danger btn-block waves-effect waves-light" type="submit">Log In</button>
        </div>
    </div>
</form>

                    </div>

                </div>
            </div>
        </div>



        <!-- jQuery  -->
<script src="../assets/js/jquery.min.js"></script>
<script src="../assets/js/popper.min.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/modernizr.min.js"></script>
<script src="../assets/js/waves.js"></script>
<script src="../assets/js/jquery.slimscroll.js"></script>
<script src="../assets/js/jquery.nicescroll.js"></script>
<script src="../assets/js/jquery.scrollTo.min.js"></script>

<!-- App js -->
<script src="../assets/js/app.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

<!-- Debug logging -->
<script>
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        console.log('Form submitted');
        console.log('Email:', document.querySelector('input[name="email"]').value);
        console.log('Password:', document.querySelector('input[name="password"]').value);
    });

    <?php if (isset($_GET['login']) && $_GET['login'] == 'success'): ?>
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in!'
        });
    <?php elseif (isset($_GET['login']) && $_GET['login'] == 'failed'): ?>
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Incorrect email or password!'
        });
    <?php endif; ?>
</script>

    </body>
</html>