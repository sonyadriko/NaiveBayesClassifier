<?php session_start();

// Check if the user is logged in
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== TRUE) {
    header('Location: login.php');
    exit();
} ?>
<div class="left side-menu">
    <button type="button" class="button-menu-mobile button-menu-mobile-topbar open-left waves-effect">
        <i class="ion-close"></i>
    </button>

    <!-- LOGO -->
    <div class="topbar-left">
        <div class="text-center">
            <a href="index.php" class="logo"><i class="mdi mdi-assistant"></i> Naive Bayes</a>
            <!-- <a href="index.html" class="logo"><img src="../assets/images/logo.png" height="24" alt="logo"></a> -->
        </div>
    </div>

    <div class="sidebar-inner slimscrollleft">

        <div id="sidebar-menu">
            <ul>

                <li>
                    <a href="index.php" class="waves-effect"><i class="mdi mdi-airplay"></i><span> Dashboard</span></a>
                </li>
                <?php if ($_SESSION['role'] !== 'kepala sekolah'): ?>
                <li>
                    <a href="data-training.php" class="waves-effect"><i class="mdi mdi-swap-horizontal"></i><span> Data Training</span></a>
                </li>
                <?php endif; ?>
                <li>
                    <a href="prediksi.php" class="waves-effect"><i class="mdi mdi-wallet"></i><span> Prediksi</span></a>
                </li>
            </ul>
        </div>
        <div class="clearfix"></div>
    </div> <!-- end sidebarinner -->
</div>