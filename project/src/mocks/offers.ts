import {Offers} from '../types/offer';

export const offers: Offers = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    previewImage: '/img/apartment-01.jpg',
    price: 120,
    rating: 4,
    isFavorite: true,
    isPremium: true
  },
  {
    id: 2,
    title: 'Wood and stone place',
    type: 'Private room',
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 5,
    isFavorite: false,
    isPremium: true
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 3,
    isFavorite: true,
    isPremium: false
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    previewImage: '/img/apartment-03.jpg',
    price: 180,
    rating: 2,
    isFavorite: false,
    isPremium: false
  }
];
