import FavoriteCard from '../favorite-card/favorite-card';
import {Offers} from '../../types/offer';

type FavoriteListProps = {
  offers: Offers;
}

function FavoriteList({offers} : FavoriteListProps): JSX.Element {

  return (
    <div className="favorites__places">
      {offers.map((offer) => (
        <FavoriteCard
          key={offer.id.toString()}
          offer={offer}
        />
      ))}
    </div>
  );
}

export default FavoriteList;
