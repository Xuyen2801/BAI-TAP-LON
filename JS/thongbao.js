document.addEventListener('DOMContentLoaded', function() {
    // Xử lý chuyển tab
    const tabButtons = document.querySelectorAll('.tab-btn');
    const notificationSections = document.querySelectorAll('.notification-section');

    // Hiển thị tất cả thông báo khi chọn tab "Tất cả"
    function showAllNotifications() {
        notificationSections.forEach(section => {
            section.style.display = 'block';
        });
    }

    // Ẩn tất cả thông báo
    function hideAllNotifications() {
        notificationSections.forEach(section => {
            section.style.display = 'none';
        });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Xóa class active của tất cả các tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Thêm class active cho tab được click
            this.classList.add('active');

            // Xử lý hiển thị thông báo
            const target = this.dataset.target;
            if (target === 'all-notifications') {
                showAllNotifications();
            } else {
                hideAllNotifications();
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
            }
        });
    });

    // Xử lý đánh dấu thông báo đã đọc
    const notificationItems = document.querySelectorAll('.notification-item');
    
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
                // Ở đây có thể thêm code để gửi request lên server
                // để cập nhật trạng thái đã đọc của thông báo
            }
        });
    });

    // Mặc định hiển thị tab "Tất cả"
    const allTab = document.querySelector('.tab-btn[data-target="all-notifications"]');
    if (allTab) {
        allTab.click();
    }
}); 