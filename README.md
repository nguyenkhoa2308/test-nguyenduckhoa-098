## Xử lý Play/Pause Video Khi Cuộn Trang

Ứng dụng sử dụng IntersectionObserver API để theo dõi video nào đang hiển thị trên màn hình.

### Logic hoạt động

- Mỗi video sẽ được đăng ký với một IntersectionObserver.
- Khi video hiển thị ít nhất 80% trên màn hình (threshold: 0.8):
  - Video sẽ tự động phát (play()).
- Khi video không còn nằm trong vùng hiển thị:
  - Video sẽ tự động dừng (pause()).

### Vì sao dùng IntersectionObserver?

So với việc dùng sự kiện scroll, IntersectionObserver có ưu điểm:

- Tối ưu hiệu năng hơn
- Giảm xử lý không cần thiết
- Được browser tối ưu sẵn

### Ví dụ

```ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;

      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  },
  {
    threshold: 0.8,
  },
);
```
