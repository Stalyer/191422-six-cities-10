import OfferCard from '../offer-card/offer-card';
import {Offer, Offers} from '../../types/offer';

type OfferListProps = {
  offers: Offers,
  onCardHover: (offer: Offer) => void;
}

function OfferList({offers, onCardHover} : OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id.toString()}
          offer={offer}
          onCardHover={onCardHover}
        />
      ))}
    </div>
  );
}

export default OfferList;
