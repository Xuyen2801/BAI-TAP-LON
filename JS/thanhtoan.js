document.addEventListener('DOMContentLoaded', function() {
    // Lấy thông tin giỏ hàng từ localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Hiển thị sản phẩm trong giỏ hàng
    displayCartItems(cartItems);
    
    // Tính tổng tiền
    calculateTotal(cartItems);
    
    // Xử lý sự kiện khi người dùng thay đổi phương thức thanh toán
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            updatePaymentMethod(this.value);
        });
    });
    
    // Xử lý sự kiện khi người dùng nhấn nút thanh toán
    const payButton = document.querySelector('.btn-pay');
    payButton.addEventListener('click', function(e) {
        e.preventDefault();
        processPayment();
    });
});

function displayCartItems(items) {
    const paymentItemsContainer = document.getElementById('payment-items');
    paymentItemsContainer.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'payment-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="payment-item-details">
                <p>${item.name}</p>
                <p>Số lượng: ${item.quantity}</p>
                <p>Giá: ${formatPrice(item.price)}</p>
            </div>
        `;
        paymentItemsContainer.appendChild(itemElement);
    });
}

function calculateTotal(items) {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingFee = 30000; // Phí vận chuyển cố định
    const total = subtotal + shippingFee;
    
    document.querySelector('.subtotal .amount').textContent = formatPrice(subtotal);
    document.querySelector('.shipping .amount').textContent = formatPrice(shippingFee);
    document.querySelector('.total .amount').textContent = formatPrice(total);
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function updatePaymentMethod(method) {
    const paymentNote = document.querySelector('.payment-note');
    switch(method) {
        case 'cod':
            paymentNote.textContent = 'Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng';
            break;
        case 'bank':
            paymentNote.textContent = 'Vui lòng chuyển khoản theo thông tin sau: STK: 123456789, Ngân hàng: Vietcombank, Chủ TK: Công ty TNHH ABC';
            break;
        case 'momo':
            paymentNote.textContent = 'Quét mã QR Momo để thanh toán';
            break;
        default:
            paymentNote.textContent = '';
    }
}

function processPayment() {
    // Kiểm tra thông tin giao hàng
    const fullName = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    if (!fullName || !phone || !address) {
        alert('Vui lòng điền đầy đủ thông tin giao hàng');
        return;
    }
    
    // Tạo đơn hàng
    const order = {
        customerInfo: {
            fullName,
            phone,
            address
        },
        items: JSON.parse(localStorage.getItem('cart')),
        paymentMethod,
        total: calculateTotal(JSON.parse(localStorage.getItem('cart'))),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Lưu đơn hàng vào localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Xóa giỏ hàng
    localStorage.removeItem('cart');
    
    // Chuyển hướng đến trang xác nhận đơn hàng
    window.location.href = 'XacNhanDonHang.html';
} 