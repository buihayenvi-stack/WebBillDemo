document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    const API_URL = 'http://localhost:3000/api';

    const loadDashboard = async () => {
        content.innerHTML = '<h2>Loading...</h2>';
        try {
            const res = await fetch(`${API_URL}/stats`);
            const stats = await res.json();
            
            content.innerHTML = `
                <h1 class="mb-4">Dashboard</h1>
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Tổng Chi Tiêu</h5>
                                <p class="card-text fs-2">${stats.totalRevenue.toLocaleString('vi-VN')} VNĐ</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Tổng Số Hóa Đơn</h5>
                                <p class="card-text fs-2">${stats.totalInvoices}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                         <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Chi Tiêu Theo Cửa Hàng</h5>
                                <canvas id="revenueChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            renderRevenueChart(stats.revenueByStore);

        } catch (error) {
            content.innerHTML = '<p class="text-danger">Failed to load dashboard data.</p>';
            console.error(error);
        }
    };

    const renderRevenueChart = (revenueByStore) => {
        const ctx = document.getElementById('revenueChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(revenueByStore),
                datasets: [{
                    label: 'Tổng Chi Tiêu (VNĐ)',
                    data: Object.values(revenueByStore),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const loadInvoices = async () => {
        content.innerHTML = '<h2>Loading...</h2>';
        try {
            const res = await fetch(`${API_URL}/invoices`);
            const invoices = await res.json();
            
            content.innerHTML = `
                <h1 class="mb-4">Danh Sách Hóa Đơn</h1>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Số Hóa Đơn</th>
                            <th>Tên Cửa Hàng</th>
                            <th>Ngày Mua</th>
                            <th>Tổng Tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoices.map(inv => `
                            <tr>
                                <td>${inv.so_hoa_don}</td>
                                <td>${inv.ten_cua_hang}</td>
                                <td>${new Date(inv.ngay_mua).toLocaleDateString('vi-VN')}</td>
                                <td>${inv.tong_tien_thanh_toan.toLocaleString('vi-VN')} VNĐ</td>
                                <td>
                                    <button class="btn btn-sm btn-primary" onclick="loadInvoiceDetail(${inv.id})">
                                        Xem Chi Tiết
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

        } catch (error) {
            content.innerHTML = '<p class="text-danger">Failed to load invoices.</p>';
            console.error(error);
        }
    };
    
    window.loadInvoiceDetail = async (id) => {
         content.innerHTML = '<h2>Loading...</h2>';
        try {
            const res = await fetch(`${API_URL}/invoices/${id}`);
            const invoice = await res.json();
            
            content.innerHTML = `
                <button class="btn btn-secondary mb-3" onclick="loadInvoices()">Quay Lại Danh Sách</button>
                <div class="card">
                    <div class="card-header">
                        <h3>Hóa Đơn: ${invoice.so_hoa_don}</h3>
                    </div>
                    <div class="card-body">
                        <p><strong>Cửa Hàng:</strong> ${invoice.ten_cua_hang}</p>
                        <p><strong>Địa Chỉ:</strong> ${invoice.dia_chi_cua_hang}</p>
                        <p><strong>Ngày Mua:</strong> ${new Date(invoice.ngay_mua).toLocaleDateString('vi-VN')}</p>
                        <p><strong>Tổng Tiền:</strong> ${invoice.tong_tien_thanh_toan.toLocaleString('vi-VN')} VNĐ</p>
                        <hr>
                        <h5>Chi Tiết Hóa Đơn</h5>
                        <table class="table">
                             <thead>
                                <tr>
                                    <th>Tên Món</th>
                                    <th>Số Lượng</th>
                                    <th>Đơn Giá</th>
                                    <th>Thành Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${invoice.details.map(item => `
                                    <tr>
                                        <td>${item.ten_mon}</td>
                                        <td>${item.so_luong}</td>
                                        <td>${item.don_gia.toLocaleString('vi-VN')} VNĐ</td>
                                        <td>${item.thanh_tien.toLocaleString('vi-VN')} VNĐ</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

        } catch (error) {
            content.innerHTML = '<p class="text-danger">Failed to load invoice details.</p>';
            console.error(error);
        }
    }

    const loadPage = (page) => {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`.nav-link[data-page="${page}"]`).classList.add('active');

        switch (page) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'invoices':
                loadInvoices();
                break;
            default:
                content.innerHTML = '<h1>Page Not Found</h1>';
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.closest('a').dataset.page;
            loadPage(page);
        });
    });

    // Load default page
    loadDashboard();
});
