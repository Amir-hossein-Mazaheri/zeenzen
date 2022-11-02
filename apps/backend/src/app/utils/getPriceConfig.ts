import { ColumnOptions } from 'typeorm';

export default function getPriceConfig(
  otherOptions: Partial<ColumnOptions> = {},
): ColumnOptions {
  return { ...otherOptions, type: 'decimal', precision: 20, scale: 2 };
}
