export type Offer = {
  id: number,
  title: string,
  type: string,
  previewImage: string,
  price: number,
  rating: number,
  isFavorite: boolean,
  isPremium: boolean,
}

export type Offers = Offer[];
