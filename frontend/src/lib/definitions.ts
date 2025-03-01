export type StoreFinderConfig = {
  apiKey?: string;
  label?: string;
  style?: {
    mainColor?: string;
  };
};

export type DaySchedule = {
  isClosed: boolean;
  openTime: string;
  closeTime: string;
};

export type OpeningHours = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
};

export type Location = {
  coordinates: [number, number];
  street: string;
  city: string;
  postalCode: string;
  country: string;
  googleMapUrl: string;
};

export type Store = {
  id: number;
  label: string;
  websiteUrl: string;
  location: Location;
  reservationRule: string;
  openingHours: OpeningHours;
  updatedAt: string;
  createdAt: string;
  distance?: number;
};

export type StoreResponse = {
  docs: Store[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}