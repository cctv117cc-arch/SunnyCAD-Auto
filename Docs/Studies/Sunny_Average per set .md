# Tài liệu cho trang tính toán  Average per set  CAD- Average per set 
tài liệu thiết kế chi tiết màn hình tính toán  `Average per set `

## Lịch sử thay đổi
- V0.1 07/11/2026: tạo trang tính toán dựa theo excel đã có 

## Danh sách các màn hình
- Sheet1: Tính cho phép tính toán cơ bản từ bất kể đơn vị yard hay inch, số lượng sản phẩm nhập vào cuối cùng cho ra kết quả trung bình từ các thông số đã nhập

## Chi tiết thiết kế

### Logic tính toán chung

- Các kết quả tính toán sẽ được làm tròn đến 4 chữ số sau thập phân

### Danh sách các mục trên  màn hình

#### Sheet1 Tính

| No | Id | Text | Type | IsRequired | I/O | Description |
| --- | --- | --- | --- | --- | --- | --- |
| 1. Vùng nhập số lượng cần |  |  |  |  |  |  |
| 1.1 | NumberOfUnit | Số lượng cần tính | number | x | I |  |
| 2. Vùng input thông tin |  |  |  |  |  | Mặc định có ít nhất 1 cụm thông tin bên dưới. <br >Số lượng sẽ được xác định mặc định là 8 dòng|
| 2.1 | yard | Độ dài đơn vị yard | number |  | I | Giá trị mặc định: 0 |
| 2.2 | inch | Độ dài đơn vị inch | number |  | I | Giá trị mặc định: 0 |
| 2.3 | P32 | Phần hệ 32 | number |  | I | Giá trị mặc định: 0 |
| 2.4 | Ratio (set) | Số lượng cần tính | number | x | I | Giá trị mặc định: 0 |
| 2.5 | Number Of Layer | Số lượng Layer | number | x | I | Giá trị mặc định: 1 |
| 2.6 | Length of Marker | Độ dài marker đơn vị  yard | number |  | O | Giá trị mặc định: 0 |
| 2.7 | Length of Marker per set | Độ dài trung bình một set của marker đơn vị  yard  | number |  | O | Giá trị mặc định: 0 |
| 2.8 | Length of Marker*Layer| Độ dài tích số lớp với độ dài marker đơn vị yard | number |  | O | Giá trị mặc định: 0 |
| 3. Vùng tính toán tổng |  |  |  |  |  | Kết quả tính tổng của vùng 3 |
| 3.1| Total (set) | tổng số lượng set | number |  | O | Giá trị mặc định: 0 |
| 3.2| Total (yard) | tổng độ dài đơn vị yard| number |  | O | Giá trị mặc định: 0 |
| 3.2| Average per set | tổng độ dài đơn vị yard| number |  | O | Giá trị mặc định: 0 |

#### Chi tiết xử lý đối tượng
1. `yard` hoặc `inch` hoặc `P32` hoặc `Ratio (set)` hoặc `Number Of Layer` thay đổi giá trị bắt đầu tính toán 
- `Length of Marker` = `yard` +(`inch`+ `P32`/ 32)/36
- `Length of Marker per set` = `Length of Marker`/`Ratio (set)`
- `Length of Marker*Layer` = `Length of Marker` * `Number Of Layer`
- `Total (set)` là  tổng của tất cả các giá trị  : `Ratio (set)` * `Number Of Layer`
- `Total (yard)` là  tổng của tất cả các giá trị: `Length of Marker*Layer` 
- `Average per set ` = `Total (yard)`/ `Total (set)`