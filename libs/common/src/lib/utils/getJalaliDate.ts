import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);

export function getJalaliDate(
  date?: string | number | dayjs.Dayjs | Date | null
) {
  return dayjs(date).calendar('jalali').locale('fa');
}
