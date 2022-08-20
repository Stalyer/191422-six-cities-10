export type Offer = {
  id: number,
  title: string,
  description: string,
  type: string,
  previewImage: string,
  images: [string],
  price: number,
  rating: number,
  isFavorite: boolean,
  isPremium: boolean,
  location: {
    latitude: number,
    longitude: number,
    zoom: number
  },
  city: {
    location: {
      latitude: number,
      longitude: number,
      zoom: number
    },
    name: string
  },
  bedrooms: number,
  goods: [string],
  maxAdults: number,
  host: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string
  }
}

export type Offers = Offer[];
