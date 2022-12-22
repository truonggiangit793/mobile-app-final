# PHÁT TRIỂN ỨNG DỤNG DI ĐỘNG

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)]()

Báo cáo môn học: **Phát triển ứng dụng di động**

Giảng viên hướng dẫn: **Doãn Xuân Thanh**

Báo cáo được thực hiện bởi:

- Phạm Trường Giang - 51900793

## Giới thiệu đề tài

- Tên đề tài: **ỨNG DỤNG REACT NATIVE QUÉT MÃ VẠCH SẢN PHẨM**
- Giới thiệu: Ứng dụng quét mã vạch sản phẩm nhằm quản lý các mặt hàng cận date ở cửa hàng tiện lợi: Hàng tháng ở cửa hàng tiện lợi, cửa hàng trưởng sẽ phân chia nhiệm vụ cho từng nhân viên để kiểm tra hạn sử dụng của tất cả các sản phẩm có trong cửa hàng (từ những sản phẩm được trưng bài ở quầy kệ cho đến tất cả các sản phẩm tồn trong kho). Thay cho việc phải ghi ra giấy số mã vạch của sản phẩm, hạn sử dụng và note lại số lượng cho từng sản phẩm đó. Bằng việc sử dụng ứng dụng này, nhân viên có thể tiết kiệm thời gian hơn trong quá trình làm việc dựa vào tính năng quét mã vạch thông qua camera điện thoại, hệ thống sẽ hiển thị ra thông tin của sản phẩm đó, nhân viên chỉ cần nhập dữ liệu là hạn sử dụng và số lượng mà mình kiểm kê được. Mặt khác, cửa hàng trưởng sẽ rất tốn thời gian trong việc phải nhập tay lại toàn bộ danh sách giấy do nhân viên cung cấp vào file excel để báo cáo cho công ty nếu làm theo cách truyền thống này, do đó sự ra đời của ứng dụng giúp cho cửa hàng trưởng và nhân viên trong cửa hàng tiết kiệm thời gian hơn trong quá trình làm việc, cửa hàng trưởng sẽ không cần phải nhập tay lại toàn bộ danh sách mà chỉ cần truy cập vào hệ thống để tải xuống file excel.

## Những tính năng chính

- Đăng nhập và đăng xuất.
- Xem danh sách công việc.
- Xem chi tiết công việc.
- Quét mã vạch sản phẩm.
- Nhập thông tin cho sản phẩm để thực hiện công việc.
- Theo dõi tiến độ công việc.
- Xem thông tin cá nhân.
- Chỉnh sửa thông tin cá nhân.
- Thay đổi mật khẩu đăng nhập.

## Công nghệ sử dụng

Công nghệ sử dụng cho việc xây dụng hệ thống API BACK-END:

- [Node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework

Công nghệ sử dụng xây dựng ứng dụng di động:

- [React Native] - React Native Learn once, write anywhere.

Hệ cơ sở dũ liệu : [MongoDB]

## Cài đặt

Tài xuống bằng [git] bằng cách sao chép dòng lệnh dưới đây và chạy trong cmd:

```
git clone https://github.com/truonggiangit793/mobile-app-final.git
```

Tiến hành cài đặt các gói thư viện cần thiết:

```sh
cd mobile-app-final
yarn
```

Chỉnh sửa địa chỉ IP của API Server ở **/src/configs/config.js**

## Khởi chạy ứng dụng

Để chạy ứng dụng, trước tiên thực hiện lệnh sau:

```
yarn start
```

Mở ứng dụng trên máy ảo Android, gõ lệnh sau đây:

```
yarn android
```

Mở ứng dụng trên máy ảo IOS, gõ lệnh sau đây:

```
yarn ios
```

## License

MIT

**Thanks!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[git]: https://git-scm.com/
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[react native]: https://reactnative.dev/
[mongodb]: https://www.mongodb.com
