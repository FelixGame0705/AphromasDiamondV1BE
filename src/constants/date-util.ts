import { Transform } from 'class-transformer';
import { parse, format } from 'date-fns';

// Hàm chuyển đổi từ 'DD-MM-YYYY HH:mm:ss' sang Date object
export function ToDatabaseDateTime() {
  return Transform(({ value }) => {
    if (value) {
      return parse(value, 'dd-MM-yyyy HH:mm:ss', new Date());
    }
    return value;
  });
}

// Hàm chuyển đổi từ Date object sang 'DD-MM-YYYY HH:mm:ss'
export function FromDatabaseDateTime() {
  return Transform(({ value }) => {
    if (value) {
      return format(value, 'dd-MM-yyyy HH:mm:ss');
    }
    return value;
  });
}
