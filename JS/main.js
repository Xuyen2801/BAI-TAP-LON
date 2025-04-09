// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Cart items
    const cartItems = document.querySelectorAll('.cart-item');
    const selectAllCheckbox = document.querySelector('.footer_cart input[type="checkbox"]');
    const deleteAllBtn = document.querySelector('.footer_cart a');
    const totalPriceElement = document.querySelector('.footer_cart div:last-child');
    
    // Search functionality
    const searchInput = document.querySelector('.input_search');
    const searchButton = document.querySelector('.search-button');
    
    // Dropdown menu
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Payment functionality
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    const buyButton = document.querySelector('.footer_cart button');
    const confirmPaymentButton = document.getElementById('confirmPayment');
    const paymentForm = document.getElementById('paymentForm');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const onlinePaymentInfo = document.getElementById('onlinePaymentInfo');

    // Initialize cart
    updateTotalPrice();

    // Handle quantity buttons
    cartItems.forEach(item => {
        const quantityInput = item.querySelector('.quantity-input');
        const minusBtn = item.querySelector('.quantity-btn.minus');
        const plusBtn = item.querySelector('.quantity-btn.plus');
        const deleteBtn = item.querySelector('.delete-item');
        const checkbox = item.querySelector('input[type="checkbox"]');

        // Quantity controls
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                if (quantity > 1) {
                    quantityInput.value = quantity - 1;
                    updateItemPrice(item);
                    updateTotalPrice();
                }
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                quantityInput.value = quantity + 1;
                updateItemPrice(item);
                updateTotalPrice();
            });
        }

        // Delete item
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                item.remove();
                updateTotalPrice();
            });
        }

        // Checkbox change
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                updateTotalPrice();
            });
        }

        // Input change
        if (quantityInput) {
            quantityInput.addEventListener('change', () => {
                let quantity = parseInt(quantityInput.value);
                if (quantity < 1) {
                    quantityInput.value = 1;
                }
                updateItemPrice(item);
                updateTotalPrice();
            });
        }
    });

    // Select all functionality
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updateTotalPrice();
    });

    // Delete all selected items
    deleteAllBtn.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('.cart-item input[type="checkbox"]:checked');
        selectedItems.forEach(checkbox => {
            checkbox.closest('.cart-item').remove();
        });
        updateTotalPrice();
    });

    // Search functionality
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        // Implement search logic here
        console.log('Searching for:', searchTerm);
    });

    // Dropdown menu toggle
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Payment method change handler
    paymentMethodSelect.addEventListener('change', function() {
        const selectedMethod = this.value;
        if (selectedMethod === 'online') {
            onlinePaymentInfo.style.display = 'block';
        } else {
            onlinePaymentInfo.style.display = 'none';
        }
    });

    // Show payment modal when clicking buy button
    buyButton.addEventListener('click', function() {
        const selectedItems = document.querySelectorAll('.cart-item input[type="checkbox"]:checked');
        if (selectedItems.length === 0) {
            showNotification('Vui lòng chọn ít nhất một sản phẩm để thanh toán', 'warning');
            return;
        }

        // Update payment items
        const paymentItemsContainer = document.getElementById('payment-items');
        paymentItemsContainer.innerHTML = '';
        let subtotal = 0;

        selectedItems.forEach(checkbox => {
            const item = checkbox.closest('.cart-item');
            const name = item.querySelector('.cart-item-details p:first-child').textContent;
            const price = parseInt(item.querySelector('.gia_sp').textContent.replace(/[^\d]/g, ''));
            const quantity = parseInt(item.querySelector('.quantity input').value);
            
            subtotal += price * quantity;

            const paymentItem = document.createElement('div');
            paymentItem.className = 'payment-item';
            paymentItem.innerHTML = `
                <span>${name} x ${quantity}</span>
                <span>${formatPrice(price * quantity)}</span>
            `;
            paymentItemsContainer.appendChild(paymentItem);
        });

        // Update payment totals
        const shippingFee = 30000; // Phí vận chuyển cố định
        document.getElementById('payment-subtotal').textContent = formatPrice(subtotal);
        document.getElementById('payment-shipping').textContent = formatPrice(shippingFee);
        document.getElementById('payment-total').textContent = formatPrice(subtotal + shippingFee);

        // Show modal
        paymentModal.show();
    });

    // Handle payment confirmation
    confirmPaymentButton.addEventListener('click', function() {
        if (!paymentForm.checkValidity()) {
            paymentForm.reportValidity();
            return;
        }

        const paymentMethod = document.getElementById('paymentMethod').value;
        if (paymentMethod === 'online') {
            // Simulate online payment process
            showNotification('Đang xử lý thanh toán online...', 'info');
            setTimeout(() => {
                completePayment();
            }, 2000);
        } else {
            completePayment();
        }
    });

    function completePayment() {
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            note: document.getElementById('note').value,
            total: document.getElementById('payment-total').textContent
        };

        // Here you would typically send this data to your server
        console.log('Payment data:', formData);

        // Show success message
        showNotification('Đơn hàng của bạn đã được xác nhận! Cảm ơn bạn đã mua hàng.', 'success');
        
        // Close modal and reset form
        paymentModal.hide();
        paymentForm.reset();

        // Remove purchased items from cart
        const selectedItems = document.querySelectorAll('.cart-item input[type="checkbox"]:checked');
        selectedItems.forEach(checkbox => {
            checkbox.closest('.cart-item').remove();
        });

        // Update cart total
        updateTotalPrice();
    }

    // Helper functions
    function updateItemPrice(item) {
        const priceText = item.querySelector('.cart-item-details p:last-child strong').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        const quantity = parseInt(item.querySelector('.quantity input').value);
        const totalPrice = price * quantity;
        item.querySelector('.gia_sp').textContent = formatPrice(totalPrice);
    }

    function updateTotalPrice() {
        let total = 0;
        let selectedCount = 0;
        
        document.querySelectorAll('.cart-item').forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                const priceText = item.querySelector('.gia_sp').textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                total += price;
                selectedCount++;
            }
        });

        totalPriceElement.innerHTML = `Tổng cộng (${selectedCount} Sản phẩm): ${formatPrice(total)}`;
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ';
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}); 