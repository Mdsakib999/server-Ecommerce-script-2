export interface IOfferImage {
  url: string;
  public_id: string;
}

export interface IOffer {
  _id?: string;
  images: IOfferImage[];
}
