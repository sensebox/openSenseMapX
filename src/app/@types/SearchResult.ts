import { Location } from "./Location";

export interface SearchResult {
  _id: string;
  name: string;
  currentLocation: Location;
}