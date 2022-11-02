export class VerifyPaymentDTO {
  status: number;
  track_id: string;
  id: string;
  order_id: string;
  amount: number;
  card_no: string;
  hashed_card_no: string;
  date: number;
}
