<?php 
// Determine the image based on the user's role
$userImage = ($_SESSION['role'] === 'admin') ? 'admin.jpg' : 'principal.jpg';
?>
<div class="topbar">

    <nav class="navbar-custom">

        <ul class="list-inline float-right mb-0">
           
            <li class="list-inline-item dropdown notification-list">
                <a class="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#"
                    role="button" aria-haspopup="false" aria-expanded="false">
                    <img src="../assets/images/<?php echo $userImage; ?>" alt="user" class="rounded-circle">
                </a>
                <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                    <!-- item-->
                    <div class="dropdown-item noti-title">
                        <h5>Welcome</h5>
                    <?php if (isset($_SESSION['role'])): ?>
                        <p><?php echo $_SESSION['role']; ?></p>
                    <?php endif; ?>
                    </div>
                    <a class="dropdown-item" href="logout.php"><i class="mdi mdi-logout m-r-5 text-muted"></i>
                        Logout</a>
                </div>
            </li>

        </ul>

        <ul class="list-inline menu-left mb-0">
            <li class="float-left">
                <button class="button-menu-mobile open-left waves-light waves-effect">
                    <i class="mdi mdi-menu"></i>
                </button>
            </li>
            <!-- <li class="hide-phone app-search">
                <form role="search" class="">
                    <input type="text" placeholder="Search..." class="form-control">
                    <a href=""><i class="fa fa-search"></i></a>
                </form>
            </li> -->
        </ul>

        <div class="clearfix"></div>

    </nav>

</div>