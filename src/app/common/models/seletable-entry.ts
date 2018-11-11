import { HouseEntry } from './house-entry';

export interface SelectableEntry extends HouseEntry {
  selected: boolean;
}
