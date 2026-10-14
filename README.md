# Sudes Logistics Website

> **Dự án:** Thiết kế & Lập trình Website Logistics – **Sudes Logistics**  
> **Link Demo chuẩn:** [https://sudes-logistics.mysapo.net/](https://sudes-logistics.mysapo.net/)  
> **Phiên bản:** 2.0.0 (Production Ready)  
> **Mục tiêu:** Dựng lại 1:1 theo bản demo gốc của Sapo, tối ưu UI/UX, hỗ trợ đa thiết bị và tích hợp đa ngôn ngữ.

---

## 📌 Tổng quan dự án

Website **Sudes Logistics** là giải pháp website doanh nghiệp hiện đại dành cho lĩnh vực Logistics, Chuỗi cung ứng, Xuất nhập khẩu và Kho bãi. Toàn bộ giao diện, bố cục (Layout), hệ thống màu nhận diện thương hiệu (`#fd5624` & `#062e39`), hiệu ứng animation, 3D dropdown và các khối nội dung được bám sát 100% theo bản demo.

---

## 🚀 Công nghệ sử dụng

| Phân hệ | Công nghệ / Thư viện | Vai trò |
|---|---|---|
| **Cấu trúc (Markup)** | HTML5 Semantic | Chuẩn SEO, thẻ ngữ nghĩa (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) |
| **Hệ thống Grid & Layout** | Bootstrap 5.3.3 + CSS Grid/Flexbox | Hệ thống lưới responsive 12 cột, offcanvas menu di động, modal |
| **Hiệu ứng Cuộn (Scroll Reveal)** | AOS (Animate On Scroll) 2.3.4 | Hiệu ứng cuộn mượt mà trên toàn trang (`fade-up`, `fade-left`, `fade-right`, `zoom-in`) |
| **Styling & Hiệu ứng 3D** | CSS3 3D Transforms (`perspective`, `rotateX`) | Menu Header dropdown lật 3D sống động, hiệu ứng hover đa tầng |
| **Typography & Font** | Lexend (Google Fonts) | Tương đồng 1:1 phong cách typography hiện đại của bản demo |
| **Slider & Carousel** | Swiper 11 (CSS & JS) | Slide Hero fade mượt mà với style transition và Feedback khách hàng tự động chuyển đổi |
| **Icons & Ký hiệu** | Bootstrap Icons 1.11 (`bi-caret-down-fill`...) + SVG Vector gốc | Hệ thống icon sắc nét, không vỡ hạt trên màn hình Retina/4K |
| **Đa ngôn ngữ (i18n)** | GTranslate Widget API | Mặc định Tiếng Việt, tự động dịch toàn trang sang English qua widget góc phải |
| **Tương tác động (JS)** | Vanilla JavaScript (ES6+) | AOS initialization, đếm số count-up, popup video modal, smooth scroll to top |

---

## 📂 Cấu trúc thư mục

```text
sudes-logistics/
├── index.html                   # Trang chủ đầy đủ các section theo demo
├── README.md                    # Tài liệu hướng dẫn chi tiết dự án
├── push-github.cmd              # Script tự động commit & push lên GitHub
└── assets/
    ├── css/
    │   └── style.css            # Toàn bộ CSS giao diện, 3D menu, responsive
    ├── js/
    │   └── main.js              # Swiper slider, count-up, back-to-top, video popup
    └── img/                     # 70+ hình ảnh & icon tải trực tiếp từ bản demo
        ├── logo.png             # Logo chính Sudes Logistics
        ├── slider_1.jpg         # Slide 1 Hero
        ├── slider_2.jpg         # Slide 2 Hero
        ├── banner_about.jpg     # Ảnh lớn phần Giới thiệu
        ├── about_icon_1..3.png  # 3 icon đường bộ, hàng không, đường biển
        ├── quy_trinh_img_1..4   # 4 hình tròn quy trình làm việc
        ├── dich_vu_img_1..8.jpg # 8 ảnh nền dịch vụ
        ├── dich_vu_icon_1..8    # 8 icon dịch vụ tương ứng
        ├── bg_tai_sao_chon.jpg  # Background parallax chỉ số thống kê
        ├── icon_tsc_1..5.png    # 5 icon kho bãi, thể tích, xe tải, khách hàng
        ├── blog_1..4.jpg        # 4 ảnh bài viết tin tức
        ├── bg_video_why.jpg     # Thumbnail video câu hỏi thường gặp
        ├── image_danh_gia_1..3  # Ảnh đại diện khách hàng đánh giá
        ├── thuonghieu.png       # Ảnh poster dải đối tác
        ├── thuonghieu_1..20.jpg # 20 logo thương hiệu đối tác
        ├── payment_1..6.jpg     # 6 ảnh album thư viện ảnh ở footer
        ├── vn.png & en.png      # Cờ ngôn ngữ Tiếng Việt & Tiếng Anh
        └── ...
```

---

## 🎨 Chi tiết các Section & Tính năng

1. **Header (2 tầng)**:
   - **Top bar**: Mạng xã hội (Facebook, Instagram, Zalo, Youtube), giờ làm việc (8h - 22h), Hotline `1900 6750`, email `support@sapo.vn`.
   - **Main bar**: Logo chính, Navigation menu có **3D transform dropdown** ở mục "Dịch vụ" và "Thư viện", ô tìm kiếm mở rộng (Search dropdown), nút `BÁO GIÁ` icon envelope.
   - **Mobile Drawer**: Offcanvas sidebar chuẩn mobile thân thiện với ngón tay.
2. **Hero Slider (Auto chuyển đổi)**:
   - Tự động chạy với hiệu ứng `crossFade` mượt mà qua thư viện Swiper.
   - Chữ tiêu đề và nút CTA chạy animation trượt vào ấn tượng.
3. **Giới thiệu (About Sudes Logistics)**:
   - Banner hình ảnh lớn, 3 hình thức vận tải (Đường bộ, Hàng không, Đường biển).
   - Khối thống kê đơn hàng vận chuyển thành công `1500+` có bộ đếm tự tăng số khi cuộn tới.
4. **Quy trình làm việc (Workflow)**:
   - 4 bước chuẩn chỉ: Yêu cầu báo giá ➔ Tiếp nhận đơn hàng ➔ Kho bãi lưu trữ ➔ Vận chuyển sản phẩm.
   - Hiệu ứng hover nổi khối 3D nâng lên (`translateY`).
5. **Dịch vụ Sudes Logistics (Services)**:
   - 8 dịch vụ lớn với hình ảnh thực tế chất lượng cao.
   - Hiệu ứng hover lật 3D icon (`rotateY`) và phóng to hình ảnh nền mượt mà.
6. **Tại sao chọn chúng tôi (Why Choose Us)**:
   - Background tối mờ phủ lớp gradient.
   - 5 khối chỉ số ấn tượng: `30` Cụm kho, `300.000 M³` Sức chứa, `250` Cán bộ nhân viên, `100` Xe tải chuyên dụng, `+5000` Khách hàng tin tưởng.
7. **Tin tức mới nhất (News / Blog)**:
   - 4 bài viết thực tế kèm ngày đăng, đoạn trích, liên kết đọc tiếp và hiệu ứng zoom ảnh.
8. **Câu hỏi thường gặp (FAQ & Video giới thiệu)**:
   - Accordion 4 câu hỏi thường gặp có đóng/mở mượt mà.
   - Khung xem video với nút Play có hiệu ứng sóng xung kích (`pulse-ring`), click vào mở Popup Modal xem video YouTube thực tế.
9. **Đánh giá khách hàng (Feedback)**:
   - Slider đánh giá khách hàng (K&K, Đông Nam, Thiết bị công nghiệp HT) hiển thị ảnh đại diện, đánh giá số sao và chức danh.
10. **Đối tác & Giá trị bền vững (Brands)**:
    - Lưới 20 logo đối tác thực tế từ demo + Poster đối tác Sudes Logistics.
11. **CTA Kết nối (Contact Callout)**:
    - Khối dải màu ấn tượng kết nối trực tiếp Hotline `1900 6750` và nút Báo giá nhanh.
12. **Footer**:
    - Thông tin liên hệ, menu liên kết, giờ làm việc và bộ sưu tập ảnh `Hình ảnh của chúng tôi` (6 ảnh).

---

## ⚙️ Các chi tiết tuân thủ theo yêu cầu chỉ đạo

- **Loại bỏ theo yêu cầu ảnh gạch chéo**:
  - ❌ Đã bỏ Popup quảng cáo chuỗi ứng dụng Sapo góc trái dưới màn hình.
  - ❌ Đã bỏ Section "Team điều hành" (Cùng bạn vượt mọi giới hạn).
  - ❌ Đã bỏ 2 nút liên hệ và icon Messenger cố định ở góc dưới màn hình.
- **Giữ lại & Tối ưu hóa**:
  - ✅ **Nút mũi tên lên đầu trang (`.backtop`)**: Tự động hiện khi cuộn xuống qua 350px, bấm vào cuộn êm (`easeOutCubic`) về vị trí đầu trang.
  - ✅ **Nút chuyển đổi ngôn ngữ (`.popup-ngonngu`)**: Đặt cố định góc phải màn hình với icon địa cầu màu cam. Khi hover hoặc click sẽ hiển thị 2 lựa chọn **Tiếng Việt** (mặc định) và **English**, tích hợp GTranslate widget tự động dịch toàn bộ nội dung.

---

## 💻 Hướng dẫn cài đặt & Khởi chạy

Dự án là Frontend thuần tĩnh (HTML5/CSS3/JavaScript), không cần cài đặt database hay cấu hình backend phức tạp:

### Cách 1: Chạy trực tiếp
Nhấp đúp chuột vào file `index.html` để mở trong trình duyệt Chrome, Edge, Firefox hoặc Cốc Cốc.

### Cách 2: Chạy qua Local Server
```bash
# Sử dụng Python 3
python -m http.server 8000

# Hoặc dùng Node.js npx serve
npx serve .
```
Truy cập: `http://localhost:8000`

### Cách 3: Đẩy mã nguồn lên GitHub
Trong thư mục dự án có sẵn file tiện ích:
1. Nhấp đúp chuột vào file `push-github.cmd`
2. Script sẽ tự động chạy:
   ```cmd
   git add .
   git commit -m "Update sudes-logistics"
   git push
   ```

---

## 📱 Độ tương thích & Responsive

- **Desktop & Laptop**: Màn hình siêu nét từ 1200px – 4K.
- **Tablet**: Tối ưu hiển thị ở kích thước 768px – 1024px (iPad, Galaxy Tab).
- **Mobile**: Tối ưu hiển thị mượt mà trên iPhone, Android màn hình từ 360px – 430px (Offcanvas menu, slider chạm vuốt).

---

## 📄 Bản quyền
Giao diện được lập trình mô phỏng giao diện mẫu Sudes Logistics trên nền tảng Sapo.
Mã nguồn phục vụ cho mục đích học tập và triển khai dự án thực tế.
