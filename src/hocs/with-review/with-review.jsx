import React, {PureComponent} from 'react';

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this._handleInputChange = this._handleInputChange.bind(this);
      this._handleFormReset = this._handleFormReset.bind(this);

      this.state = {
        rating: ``,
        review: ``,
      };
    }

    _handleFormReset() {
      this.setState({
        rating: ``,
        review: ``,
      });
    }

    _handleInputChange(evt) {
      const {name, value} = evt.target;
      this.setState({[name]: value});
    }

    render() {
      const {rating, review} = this.state;

      return (
        <Component
          {...this.props}
          review={review}
          rating={+rating}
          onInputChange={this._handleInputChange}
          onFormReset={this._handleFormReset}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
