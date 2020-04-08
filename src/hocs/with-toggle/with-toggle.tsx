import * as React from 'react';
import {Subtract} from 'utility-types';

interface InjectedProps {
  isActive: boolean;
  onToggleClick: () => void;
}

interface State {
  isActive: boolean;
}

const withToggle = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithToggle extends React.PureComponent<P, State> {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };

      this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    private handleToggleClick() {
      this.setState({
        isActive: !this.state.isActive,
      });
    }

    render() {
      const {isActive} = this.state;

      return (
        <Component
          {...this.props}
          isActive={isActive}
          onToggleClick={this.handleToggleClick}
        />
      );
    }
  }

  return WithToggle;
};

export default withToggle;
