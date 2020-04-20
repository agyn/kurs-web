import { CitiesEditDto } from './cities-edit.dto';

export interface CitiesList {
  total: number,
  result: CitiesEditDto[]
}
