export type Venue = {
  slug: string;
  name: string;
  operator: string | null;
  address: string;
  zone: 'WEST' | 'CENTRAL' | 'EAST' | 'TBD';
  capacity: number | null;
  squareFeet: number | null;
  hasRooftop: boolean | null;
  hasStage: boolean | null;
  hasKitchen: boolean | null;
  adaAccessible: boolean | null;
  notes: string;
};
