export type Offer = {
  id: number,
  title: string,
  type: string,
  previewImage: string,
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
  }
}

export type Offers = Offer[];
