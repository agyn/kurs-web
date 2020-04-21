import { CurrencyEditDto } from "./Currency-edit.dto";

export interface CurrencyList {
  total: number,
  result: CurrencyEditDto[]
}
