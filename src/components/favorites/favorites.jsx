import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../header/header.jsx';
import FavoritesEmpty from '../favorites-empty/favorites-empty.jsx';
import {AppRoute} from '../../consts';
import FavoritesItem from '../favorites-item/favorites-item.jsx';
import {getFavorites} from '../../reducer/data/selectors';
import {Operation as DataOperation} from '../../reducer/data/data';
import {favoritesShape} from '../../shape';

class Favorites extends PureComponent {
  componentDidMount() {
    this.props.onFavoritesLoad();
  }

  render() {
    const {
      userEmail,
      favorites,
      onFavoritesLoad,
      onBookmarkClick,
      onRentalCardHover,
    } = this.props;

    return (
      <div className="page">
        <Header userEmail={userEmail} onUserEmailClick={onFavoritesLoad} />

        {favorites.length > 0 ? (
          <Fragment>
            <main className="page__main page__main--favorites">
              <div className="page__favorites-container container">
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>

                  <ul className="favorites__list">
                    {favorites.map((favoritesItem, index) => (
                      <FavoritesItem
                        key={index + favoritesItem.city}
                        favoriteCity={favoritesItem.city}
                        favoriteOffers={favoritesItem.offers}
                        onBookmarkClick={onBookmarkClick}
                        onRentalCardHover={onRentalCardHover}
                        userEmail={userEmail}
                      />
                    ))}
                  </ul>
                </section>
              </div>
            </main>
            <footer className="footer container">
              <Link to={AppRoute.ROOT} className="footer__logo-link">
                <img
                  className="footer__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="64"
                  height="33"
                />
              </Link>
            </footer>
          </Fragment>
        ) : (
          <FavoritesEmpty />
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  userEmail: PropTypes.string,
  favorites: favoritesShape,
  onFavoritesLoad: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoritesLoad() {
    dispatch(DataOperation.loadFavorites());
  },
  onBookmarkClick(id, status) {
    dispatch(DataOperation.changeFavoriteStatus(id, status));
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
