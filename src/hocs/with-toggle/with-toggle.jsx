import React, {PureComponent} from 'react';

const withToggle = (Component) => {
  class WithToggle extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
      };

      this._handleToggleClick = this._handleToggleClick.bind(this);
    }

    _handleToggleClick() {
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
          onToggleClick={this._handleToggleClick}
        />
      );
    }
  }

  return WithToggle;
};

export default withToggle;
