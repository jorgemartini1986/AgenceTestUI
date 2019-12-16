import { IncomingByDate } from './IncomingByDate';
export interface IncomingDto {
  noUsuario: string;
  coUsuario: string;
  incomingList?: IncomingByDate[];
  totalPersonalEarnings: number;
  earningPercent: number;
}
