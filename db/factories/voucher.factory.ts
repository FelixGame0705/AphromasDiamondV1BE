import { VoucherEntity } from "src/entities/voucher.entity";
import { setSeederFactory } from "typeorm-extension";

export const voucherFactory = setSeederFactory(VoucherEntity, async (faker) => {
    
    const voucher = new VoucherEntity();
    
    // Đặt phần trăm giảm giá từ 5% đến 20%
    const percentDiscounts = faker.datatype.number({ min: 5, max: 20 });
    voucher.PercentDiscounts = percentDiscounts;

    // Tạo VoucherCode với chữ cái in hoa (4 đến 7 ký tự) và số của phần trăm được giảm
    const length = faker.datatype.number({ min: 4, max: 7 });
    const alphaCode = faker.random.alphaNumeric(length).toUpperCase(); // Tạo mã chữ cái và số
    voucher.VoucherCode = alphaCode + percentDiscounts; // Kết hợp mã và phần trăm giảm giá

    // Tạo mô tả ngắn gọn cho voucher
    voucher.Description = `Get ${percentDiscounts}% off on products`;

    // Đặt thời gian bắt đầu trong khoảng từ 1 tháng trước đến hiện tại
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setMonth(currentDate.getMonth() - 1);
    const startDate = faker.date.between(pastDate, currentDate);
    
    // Tạo một số ngẫu nhiên từ 7 đến 14 để thêm vào startDate
    const daysToAdd = faker.datatype.number({ min: 7, max: 14 });
    const endDate = new Date(startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // Thêm số ngày ngẫu nhiên vào startDate
    
    voucher.StartDate = startDate;
    voucher.EndDate = endDate;
        
    return voucher;
});
