export interface Transport {
  id: number | string,
  type: string,
  seats: string,
  departureDate: string,
  returnDate: string,
  price: number | string
  agencyId: number| string,
  transportImages: any
}
