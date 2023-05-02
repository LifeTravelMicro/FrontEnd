
export interface Plan {
  id: number | string;
  name:string;
  description:string;
  duration: string;
  capacity: string;
  thumbnail: string;
  agencyId: number|string;
  accommodationId: number|string;
  transportId: number|string;
  tourId: number|string;
  reviews: any[]
}

