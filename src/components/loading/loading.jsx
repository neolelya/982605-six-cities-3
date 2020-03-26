import React from 'react';

const Loading = () => {
  return (
    <div className="page page--favorites-empty">
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Please wait...</b>
              <b className="favorites__status">Data is loading</b>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Loading;
