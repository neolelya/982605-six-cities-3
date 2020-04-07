import * as React from 'react';
import {Subtract} from 'utility-types';

interface InjectedProps {
  review: string;
  rating: string;
  onInputChange: (evt: React.ChangeEvent) => void;
  onFormReset: () => void;
}

interface State {
  rating: string;
  review: string;
}

const withReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithReview extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleFormReset = this.handleFormReset.bind(this);

      this.state = {
        rating: ``,
        review: ``,
      };
    }

    private handleFormReset() {
      this.setState({
        rating: ``,
        review: ``,
      });
    }

    private handleInputChange(evt) {
      const {name, value} = evt.target;
      this.setState({[name]: value} as { [P in keyof State]: string });
    }

    render() {
      const {rating, review} = this.state;

      return (
        <Component
          {...this.props}
          review={review}
          rating={+rating}
          onInputChange={this.handleInputChange}
          onFormReset={this.handleFormReset}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
