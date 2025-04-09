document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử cần thiết
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const authModal = new bootstrap.Modal(document.getElementById('authModal'));

    // Xử lý chuyển đổi tab
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Xóa class active của tất cả các tab
            authTabs.forEach(t => t.classList.remove('active'));
            // Thêm class active cho tab được click
            this.classList.add('active');

            // Ẩn tất cả các form
            authForms.forEach(form => form.classList.remove('active'));
            // Hiển thị form tương ứng
            const formId = this.getAttribute('data-tab') + '-form';
            document.getElementById(formId).classList.add('active');
        });
    });

    // Xử lý form đăng nhập
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // TODO: Xử lý đăng nhập
        console.log('Đăng nhập với:', email, password);
        
        // Đóng modal
        authModal.hide();
        
        // Chuyển hướng về trang chủ sau 1 giây
        setTimeout(function() {
            window.location.href = '../HTML/Home.html';
        }, 1000);
    });

    // Xử lý form đăng ký
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Kiểm tra mật khẩu
        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }

        // TODO: Xử lý đăng ký
        console.log('Đăng ký với:', name, email, phone, password);
        
        // Đóng modal
        authModal.hide();
        
        // Chuyển hướng về trang chủ sau 1 giây
        setTimeout(function() {
            window.location.href = '../HTML/Home.html';
        }, 1000);
    });

    // Xử lý đăng nhập bằng Facebook
    const facebookButton = document.querySelector('.social-button.facebook');
    facebookButton.addEventListener('click', function() {
        // TODO: Xử lý đăng nhập Facebook
        console.log('Đăng nhập bằng Facebook');
        
        // Đóng modal
        authModal.hide();
        
        // Chuyển hướng về trang chủ sau 1 giây
        setTimeout(function() {
            window.location.href = '../HTML/Home.html';
        }, 1000);
    });

    // Xử lý đăng nhập bằng Google
    const googleButton = document.querySelector('.social-button.google');
    googleButton.addEventListener('click', function() {
        // TODO: Xử lý đăng nhập Google
        console.log('Đăng nhập bằng Google');
        
        // Đóng modal
        authModal.hide();
        
        // Chuyển hướng về trang chủ sau 1 giây
        setTimeout(function() {
            window.location.href = '../HTML/Home.html';
        }, 1000);
    });

    // Xử lý quên mật khẩu
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        // TODO: Xử lý quên mật khẩu
        alert('Chức năng quên mật khẩu đang được phát triển');
    });
}); 