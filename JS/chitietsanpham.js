document.addEventListener('DOMContentLoaded', function() {
    // Xử lý nút Xem thêm/Thu gọn
    const showMoreBtn = document.querySelector('.show-more-btn');
    const descriptionContent = document.querySelector('.description-content');
    
    if (showMoreBtn && descriptionContent) {
        showMoreBtn.addEventListener('click', function() {
            descriptionContent.classList.toggle('expanded');
            if (descriptionContent.classList.contains('expanded')) {
                showMoreBtn.innerHTML = 'Thu gọn <i class="ti-angle-up"></i>';
            } else {
                showMoreBtn.innerHTML = 'Xem thêm <i class="ti-angle-down"></i>';
            }
        });
    }

    // Xử lý chuyển đổi ảnh thumbnail
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src;
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Xử lý số lượng sản phẩm
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');

    minusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Xử lý nút thêm vào giỏ hàng
    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        // TODO: Thêm sản phẩm vào giỏ hàng
        alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
    });

    // Xử lý nút mua ngay
    const buyNowBtn = document.querySelector('.buy-now');
    buyNowBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        // TODO: Chuyển đến trang thanh toán
        window.location.href = '../HTML/ThanhToan.html';
    });

    // Xử lý input số lượng
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        }
    });

    // Zoom ảnh khi hover (tùy chọn)
    const mainImageContainer = document.querySelector('.main-image');
    mainImageContainer.addEventListener('mousemove', function(e) {
        const image = this.querySelector('img');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        image.style.transform = 'scale(1.5)';
    });

    mainImageContainer.addEventListener('mouseleave', function() {
        const image = this.querySelector('img');
        image.style.transform = 'scale(1)';
    });
}); 