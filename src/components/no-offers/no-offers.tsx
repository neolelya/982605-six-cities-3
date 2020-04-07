import * as React from 'react';

interface Props {
  currentCity: string;
  isError: boolean;
}

const NoOffers: React.FC<Props> = (props: Props) => {
  const {currentCity, isError} = props;
  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          {isError ? (
            <b className="cities__status">
              Please check your internet connection
            </b>
          ) : (
            <React.Fragment>
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">
                We could not find any property available at the moment in{` `}
                {currentCity}
              </p>
            </React.Fragment>
          )}
        </div>
      </section>
      <div
        className="cities__right-section"
        style={{
          backgroundPosition: `right center`,
          backgroundSize: `100% auto`,
          backgroundImage: `url(../img/no-places@2x.png)`,
        }}
      />
    </div>
  );
};

export default NoOffers;
