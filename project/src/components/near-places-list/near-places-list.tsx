import NearPlacesCard from '../near-places-card/near-places-card';
import {Offers} from '../../types/offer';

type NearPlacesListProps = {
  offers: Offers;
}

function NearPlacesList({offers} : NearPlacesListProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <NearPlacesCard
            key={offer.id.toString()}
            offer={offer}
          />
        ))}
      </div>
    </section>
  );
}

export default NearPlacesList;
