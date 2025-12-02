# WebBill: Hệ Thống Quản Lý Hóa Đơn

WebBill là một ứng dụng web đơn giản giúp quản lý hóa đơn, hiển thị tổng quan doanh thu và danh sách các hóa đơn một cách trực quan.

## Tính Năng

*   **Dashboard Tổng Quan**: Xem tổng chi tiêu, tổng số hóa đơn, và biểu đồ chi tiêu theo từng cửa hàng.
*   **Danh Sách Hóa Đơn**: Duyệt qua danh sách tất cả hóa đơn.
*   **Chi Tiết Hóa Đơn**: Xem thông tin chi tiết của từng hóa đơn, bao gồm các mặt hàng đã mua.

## Công Nghệ Sử Dụng

*   **Backend**: Node.js với Express.js
*   **Frontend**: HTML, CSS (Bootstrap), JavaScript
*   **Database (Mock)**: Dữ liệu được lưu trữ trong file `db.json`
*   **Biểu Đồ**: Chart.js
*   **Icons**: Feather Icons

## Cài Đặt và Chạy Ứng Dụng

Để cài đặt và chạy ứng dụng này trên máy cục bộ của bạn, làm theo các bước sau:

### 1. Clone Repository

```bash
git clone <URL_CUA_REPOSITORY>
cd WebBill
```

(Lưu ý: Thay `<URL_CUA_REPOSITORY>` bằng URL thực tế của repository của bạn)

### 2. Cài Đặt Dependencies

Ứng dụng backend yêu cầu Node.js và các package được liệt kê trong `package.json`. Sử dụng npm để cài đặt chúng:

```bash
npm install
```

### 3. Chạy Server Backend

Sau khi cài đặt xong, bạn có thể khởi động server backend:

```bash
npm start
```

Server sẽ chạy trên `http://localhost:3000`.

### 4. Truy Cập Ứng Dụng Frontend

Mở trình duyệt web của bạn và truy cập:

```
http://localhost:3000
```

Bạn sẽ thấy giao diện Dashboard của ứng dụng.

## Cấu Trúc Dự Án

```
E:\WebBill\
├───package-lock.json
├───package.json
├───server.js               # Backend server chính
├───data\
│   └───db.json             # Dữ liệu mẫu (hóa đơn, chi tiết hóa đơn)
└───public\
    ├───app.js              # Logic frontend JavaScript
    ├───index.html          # File HTML chính
    └───style.css           # CSS tùy chỉnh
```

## API Endpoints

Ứng dụng cung cấp các API sau:

*   `GET /api/invoices`: Lấy tất cả danh sách hóa đơn.
*   `GET /api/invoices/:id`: Lấy chi tiết một hóa đơn cụ thể bằng ID.
*   `GET /api/stats`: Lấy dữ liệu thống kê tổng quan (tổng doanh thu, tổng số hóa đơn, doanh thu theo cửa hàng).


