import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offers} from '../../types/offer';

type OfferListProps = {
  offers: Offers;
}

function OfferList({offers} : OfferListProps): JSX.Element {
  const [, setActiveOffer] = useState({});

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id.toString()}
          offer={offer}
          onCardHover={setActiveOffer}
        />
      ))}
    </div>
  );
}

export default OfferList;
