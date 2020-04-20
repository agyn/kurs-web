import { ExchangerEditDto } from './exchanger-edit.dto';

export interface ExchangerList {
  total: number,
  result: ExchangerEditDto[]
}
