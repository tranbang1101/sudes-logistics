# Sudes Logistics

Website giới thiệu công ty logistics **Sudes Logistics**, dựng lại theo giao diện demo [themes.sapo.vn/demo/sudes-logistics](https://themes.sapo.vn/demo/sudes-logistics).

## Công nghệ sử dụng

| Hạng mục | Lựa chọn |
|---|---|
| Cấu trúc | HTML5 |
| Layout / Grid | Bootstrap 5.3 (grid, navbar, carousel, accordion) |
| Styling | CSS3 thuần (biến CSS, responsive, animation) |
| Tương tác | JavaScript thuần (IntersectionObserver, count-up, scroll) |
| Icon | Bootstrap Icons 1.11 |
| Font | Lexend (Google Fonts) |
| Đa ngôn ngữ | GTranslate Widget (mặc định Tiếng Việt, chuyển sang English) |

Dự án là site tĩnh, không cần backend hay database.

## Cấu trúc thư mục

```
sudes-logistics/
├── index.html            # Trang chính (toàn bộ các section)
├── README.md
└── assets/
    ├── css/
    │   └── style.css     # Giao diện, responsive, animation
    ├── js/
    │   └── main.js       # Header, back-to-top, reveal, count-up
    └── img/              # Thư mục ảnh (thêm ảnh thật vào đây)
```

## Các section đã có

1. **Header** – logo, menu (có dropdown Dịch vụ), hotline, nút BÁO GIÁ, tìm kiếm, menu hamburger trên mobile/tablet.
2. **Hero slider** – 2 slide, tự chạy, có indicator.
3. **Giới thiệu** – thông tin công ty, 3 hình thức vận chuyển, bộ đếm 1500+ đơn hàng.
4. **Quy trình làm việc** – 4 bước.
5. **Dịch vụ** – 8 dịch vụ, hiệu ứng lật icon khi hover.
6. **Tại sao chọn chúng tôi** – 5 chỉ số (kho, sức chứa, nhân viên, xe tải, khách hàng), đếm số khi cuộn tới.
7. **Tin tức** – 3 bài viết mới nhất.
8. **FAQ** – accordion 4 câu hỏi.
9. **Đánh giá khách hàng** – carousel 3 feedback.
10. **Đối tác** – dải logo đối tác.
11. **CTA liên hệ** – kêu gọi liên hệ, hotline.
12. **Footer** – thông tin công ty, menu, dịch vụ, giờ làm việc, mạng xã hội.

**Đã loại bỏ theo yêu cầu:** popup quảng cáo ứng dụng Sapo, khối "Team điều hành", nút Liên hệ và nút Messenger.

**Giữ lại:** nút mũi tên lên đầu trang (luôn hiển thị khi cuộn xuống, bấm để về đầu trang), nút chọn ngôn ngữ.

## Tính năng nổi bật

- **Responsive** trên desktop, tablet và mobile (breakpoint của Bootstrap, kèm chỉnh riêng ở `style.css`).
- **Animation**: hero fade, hiệu ứng xuất hiện khi cuộn (fade up, fade left/right, zoom), hover card nâng lên, đếm số liệu, header đổi bóng khi cuộn.
- **Nút về đầu trang** smooth scroll.
- **Đa ngôn ngữ**: mặc định tiếng Việt, người dùng chọn English qua icon địa cầu góc phải.
- **Tôn trọng `prefers-reduced-motion`**: tắt animation nếu người dùng cài đặt giảm chuyển động.

## Cách chạy

Không cần cài đặt. Mở `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```bash
# Python
python -m http.server 8000

# hoặc Node
npx serve .
```

Sau đó truy cập `http://localhost:8000`.

> Lưu ý: widget dịch GTranslate và Google Fonts, Bootstrap, Bootstrap Icons được tải từ CDN, nên cần kết nối internet khi chạy.

## Ghi chú cho lần phát triển tiếp

- **Ảnh**: giao diện hiện dùng khối màu gradient thay cho ảnh minh họa. Khi có ảnh thật, đặt vào `assets/img/` và thay các `div.news-thumb` / `div.visual-card` bằng thẻ `<img>` hoặc đổi `background-image`.
- **Logo**: đang dùng icon và chữ trong code. Có thể thay bằng file logo trong `assets/img/`.
- **Đối tác**: hiện là placeholder "Đối tác 1–8", thay bằng logo thật.
- **Trang con** (Giới thiệu, Dịch vụ chi tiết, Tin tức, Liên hệ...): hiện các menu trỏ về anchor trên trang chủ, có thể tách thành trang riêng khi cần.
- **Form báo giá / liên hệ**: chưa có form xử lý; nút BÁO GIÁ hiện đang dẫn tới phần liên hệ.

## Bản quyền

Thiết kế tham khảo theo theme Sudes Logistics của Sapo. Nội dung là nội dung mẫu để phục vụ dự án.
