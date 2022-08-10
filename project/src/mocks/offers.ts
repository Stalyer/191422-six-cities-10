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
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    }
  },
  {
    id: 2,
    title: 'Wood and stone place',
    type: 'Private room',
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 5,
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    }
  },
  {
    id: 3,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 3,
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    }
  },
  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    previewImage: '/img/apartment-03.jpg',
    price: 180,
    rating: 2,
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Amsterdam'
    }
  },
  {
    id: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    previewImage: '/img/apartment-03.jpg',
    price: 180,
    rating: 2,
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Paris'
    }
  },
  {
    id: 6,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: '/img/apartment-03.jpg',
    price: 180,
    rating: 2,
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Paris'
    }
  },
  {
    id: 7,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: '/img/apartment-03.jpg',
    price: 180,
    rating: 2,
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Cologne'
    }
  },
  {
    id: 8,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: '/img/apartment-03.jpg',
    price: 180,
    rating: 2,
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: 'Hamburg'
    }
  },
];
