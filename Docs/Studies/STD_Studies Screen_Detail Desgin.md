# Tài liệu thiết kế màn hình Studies screen
Tài liệu thiết kế màn hình studies screen

## Lịch sử thay đổi
- v0.1 4/11/2026: Tạo tài liệu
- v0.2 4/11/2026: thêm highlight cho danh sách sinh viên theo học lực
- v0.3 4/11/2026: thêm lựa chọn cho loại lớp
## Danh sách các màn hình
- STD001: Màn hình danh sách studies, cho tìm kiếm giới hạn số lượng tìm kiếm trên màn hình
- STD002: Màn hình thêm/sửa/xóa study, màn hình dạng popup gồm các input fill data.


## Chi tiết thiết kế
 
### Danh sách các mục trên màn hình

#### STD001 Màn hình danh sách studies
| No | Id | Text | Type | IsRequired | I/O | Description |
| - | - | - | - | - | - | - |
| 1 Thông tin tìm kiếm | |  |  |  |  |  |
| 1.1 | title | Danh sách Sinh Viên | Lable |  | O | Hiện thị title màn hình |
| 1.2 | name | Họ và tên | text |  | I | Nhập họ và tên để tìm kiếm. Tìm kiếm gần đúng |
| 1.3 | classId | Lớp | text |  | I | Nhập tên lớp để tìm kiếm. Tìm kiếm gần đúng |
| 1.4 | classification | Loại lớp | dropdown |  | I | Các lựa chọn gồm: Tất cả, Normal, CNC, Chuyên |
| 2 danh sách sinh viên | |  |  |  |  | Từng dòng sẽ được đánh dấu theo học lực <br> Yếu: #FA674B <br> Giỏi: #4BFA9A <br> Xuất sắc: #9153E0 |
| 2.1 | id | Mã sinh viên | lable |  | O |  |
| 2.2 | name | Họ và tên | lable |  | O |  |
| 2.3 | classId | Lớp | lable |  | O |  |
| 2.4 | classification | Loại lớp| lable |  | O |  |
| 2.5 | point | Điểm trung bình | lable |  | O |  |
| 2.6 | status | Học lực | lable |  | O |  |

### STD002 Màn hình thêm/sửa/xóa

