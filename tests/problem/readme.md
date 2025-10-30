## Vấn đề
File use-visual_user.spec.ts có phần login lặp

## Giải pháp

### 1. Before Each - HOOK
✅ Giải quyết lặp code nhưng không giải quyết lặp thao tác
✅ Đánh giá chính xác

### 2. Share Context
✅ Giảm cả lặp code và lặp thao tác
✅ Có vấn đề về cleanup và state pollution
✅ Không an toàn với parallel execution
✅ Use cases đề cập đều chính xác

### 3. Fixture
✅ Lặp thao tác nhưng an toàn và isolation
✅ Phù hợp với production code
✅ Trade-off analysis chính xác


### Performance So sánh:
- **Before Each**: Medium (login mỗi test)
- **Share Context**: Fastest (login 1 lần)  
- **Fixture**: Medium-Slow (login + cleanup mỗi test)


### Sử dụng khi nào:
- **Before Each**: Khi cần cleanup nhẹ giữa tests
- **Share Context**: Chỉ cho READ-only tests hoặc integration flows  
- **Fixture**: Hầu hết trường hợp production (RECOMMENDED)

Trade-off: Chấp nhận login nhiều lần hơn để đổi lấy test reliability và isolation! 🔄

VÍ DỤ:
### Ví dụ Share Context (chỉ READ operations):
```typescript
test('Check product names', async () => {
  // Chỉ đọc tên sản phẩm - không thay đổi state
});

test('Verify product prices', async () => {
  // Chỉ đọc giá - không thay đổi state  
});
```

### Ví dụ Fixture (có WRITE operations):
```typescript
test('Add to cart', async ({ visualUserPage }) => {
  // Thay đổi cart state
});

test('Complete checkout', async ({ visualUserPage }) => {
  // Thay đổi order state
});
```

### Share Context trong Integration Testing:
- ✅ Test workflow liên tục (login → browse → cart → checkout)
- ✅ Test data consistency giữa các bước
- ✅ Performance testing (measure total flow time)