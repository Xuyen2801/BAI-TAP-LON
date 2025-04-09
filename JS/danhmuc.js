// Danh sách sản phẩm mẫu
const products = [
    {
        id: 1,
        name: "Đồng Hồ Rolex Submariner 124060 Mặt Số Đen",
        price: 237000000,
        image: "../IMG/sanpham/dm1.png",
        rating: 4.8,
        soldCount: 12,
        category: "under300",
        brand: "Rolex"
    },
    {
        id: 2,
        name: "Đồng Hồ Audemars Piguet Code 11.59 Selfwinding",
        price: 505000000,
        image: "../IMG/sanpham/dm2.png",
        rating: 4.9,
        soldCount: 8,
        category: "over500",
        brand: "Audemars Piguet"
    },
    {
        id: 3,
        name: "Đồng Hồ Patek Philippe Complications World Time",
        price: 2305000000,
        image: "../IMG/sanpham/dm3.png",
        rating: 5.0,
        soldCount: 3,
        category: "over500",
        brand: "Patek Philippe"
    },
    {
        id: 4,
        name: "Đồng Hồ Vacheron Constantin Overseas Chronograph",
        price: 503000000,
        image: "../IMG/sanpham/dm4.png",
        rating: 4.7,
        soldCount: 15,
        category: "over500",
        brand: "Vacheron Constantin"
    },
    {
        id: 5,
        name: "Đồng Hồ A. Lange & Söhne Datograph Up/Down",
        price: 670000000,
        image: "../IMG/sanpham/dm5.png",
        rating: 4.9,
        soldCount: 6,
        category: "over500",
        brand: "A. Lange & Söhne"
    },
    {
        id: 6,
        name: "Đồng Hồ Rolex Daytona",
        price: 450000000,
        image: "../IMG/sanpham/dm6.png",
        rating: 4.8,
        soldCount: 10,
        category: "300to500",
        brand: "Rolex"
    },
    {
        id: 7,
        name: "Đồng Hồ Patek Philippe Nautilus",
        price: 1117000000,
        image: "../IMG/sanpham/dm7.png",
        rating: 5.0,
        soldCount: 4,
        category: "over500",
        brand: "Patek Philippe"
    },
    {
        id: 8,
        name: "Đồng Hồ Audemars Piguet Royal Oak",
        price: 1117000000,
        image: "../IMG/sanpham/dm8.png",
        rating: 4.9,
        soldCount: 7,
        category: "over500",
        brand: "Audemars Piguet"
    },
    {
        id: 9,
        name: "Đồng Hồ Vacheron Constantin Patrimony",
        price: 1117000000,
        image: "../IMG/sanpham/dm9.png",
        rating: 4.8,
        soldCount: 9,
        category: "over500",
        brand: "Vacheron Constantin"
    },
    {
        id: 10,
        name: "Đồng Hồ A. Lange & Söhne 1815",
        price: 670000000,
        image: "../IMG/sanpham/dm10.png",
        rating: 4.9,
        soldCount: 5,
        category: "over500",
        brand: "A. Lange & Söhne"
    },
    {
        id: 11,
        name: "Đồng Hồ Rolex Day-Date",
        price: 1117000000,
        image: "../IMG/sanpham/dm11.png",
        rating: 4.8,
        soldCount: 11,
        category: "over500",
        brand: "Rolex"
    },
    {
        id: 12,
        name: "Đồng Hồ Patek Philippe Grand Complications",
        price: 1117000000,
        image: "../IMG/sanpham/dm12.png",
        rating: 5.0,
        soldCount: 2,
        category: "over500",
        brand: "Patek Philippe"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị tất cả sản phẩm khi trang được tải
    displayProducts(products);

    // Xử lý sự kiện cho các bộ lọc
    const filterOptions = document.querySelectorAll('.filters ul li a');
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.textContent.trim();
            applyFilter(filterValue);
        });
    });

    // Xử lý sự kiện cho các tab trạng thái
    const statusTabs = document.querySelectorAll('.ds_trang_thai ul li a');
    statusTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            // Xóa class active từ tất cả các tab
            statusTabs.forEach(t => t.classList.remove('active'));
            // Thêm class active cho tab được chọn
            this.classList.add('active');
            const statusValue = this.textContent.trim();
            applyFilter(statusValue);
        });
    });
});

// Hàm xáo trộn mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hàm chuyển hướng đến trang chi tiết sản phẩm
function goToProductDetail(productId) {
    window.location.href = '../HTML/ChiTietSanPham.html' + productId;
}

// Hàm áp dụng bộ lọc
function applyFilter(filterValue) {
    let filteredProducts = [...products];

    // Lọc theo giá
    if (filterValue.includes('triệu') || filterValue.includes('tỷ')) {
        if (filterValue.includes('Dưới 120')) {
            filteredProducts = filteredProducts.filter(p => p.price < 120000000);
        } else if (filterValue.includes('120 triệu - 250')) {
            filteredProducts = filteredProducts.filter(p => p.price >= 120000000 && p.price < 250000000);
        } else if (filterValue.includes('250 triệu - 500')) {
            filteredProducts = filteredProducts.filter(p => p.price >= 250000000 && p.price < 500000000);
        } else if (filterValue.includes('500 triệu - 1 tỷ 200')) {
            filteredProducts = filteredProducts.filter(p => p.price >= 500000000 && p.price < 1200000000);
        }
    }

    // Xáo trộn và lấy 3 sản phẩm ngẫu nhiên
    shuffleArray(filteredProducts);
    const randomProducts = filteredProducts.slice(0, 3);
    
    // Hiển thị sản phẩm
    displayProducts(randomProducts);
}

// Hàm hiển thị sản phẩm
function displayProducts(products) {
    const productsContainer = document.querySelector('.list_item');
    productsContainer.innerHTML = '';

    if (products.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">Không tìm thấy sản phẩm phù hợp</div>';
        return;
    }

    products.forEach(product => {
        const oldPrice = Math.round(product.price * 1.03);
        const productHTML = `
            <div class="item" onclick="goToProductDetail(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <h6>${product.name}</h6>
                <div class="info">
                    <div class="text">
                        <p><del>${formatPrice(oldPrice)} VNĐ</del></p>
                        <p><b>${formatPrice(product.price)} VNĐ</b></p>
                    </div>
                    <div class="btn_add">
                        <button class="btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <a href="#" onclick="event.preventDefault();">Thêm vào giỏ hàng</a>
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productHTML;
    });
}

// Hàm format giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Hàm thêm vào giỏ hàng
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (confirm('Đã thêm sản phẩm vào giỏ hàng! Bạn có muốn xem giỏ hàng không?')) {
        window.location.href = 'GioHang.html';
    }
} 
