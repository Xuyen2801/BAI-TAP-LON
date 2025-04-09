document.addEventListener('DOMContentLoaded', function() {
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('../HTML/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Thêm sự kiện cho thanh tìm kiếm
                const searchInput = document.querySelector('.input_search');
                const searchButton = document.querySelector('.search-button');
                
                searchButton.addEventListener('click', function() {
                    const searchTerm = searchInput.value.trim();
                    if (searchTerm) {
                        window.location.href = `../HTML/DanhMucSanPham.html?search=${encodeURIComponent(searchTerm)}`;
                    }
                });

                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const searchTerm = searchInput.value.trim();
                        if (searchTerm) {
                            window.location.href = `../HTML/DanhMucSanPham.html?search=${encodeURIComponent(searchTerm)}`;
                        }
                    }
                });
            });
    }
}); 