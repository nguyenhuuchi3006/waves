- tạo 2 folder server và client
- khởi tạo npm (npm init) cho server
- cài đặt các package cần thiết (express, body-parser, mongoose)


- xong server rồi thì cd vào CLIENT và create-react-app như bình thường
- 2 vấn đề: 
    + cả 2 client và server đều localhost, khi client dùng axios đến localhost của server không được 
    nên cần thêm vào proxy cho package.json của client (github)
    + phải mở 2 tab để chạy localhost -> dùng package concurrently để yarn run dev thôi là 2 cái cùng chạy