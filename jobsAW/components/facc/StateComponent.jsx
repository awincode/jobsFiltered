import React, { Component } from 'react';
import PropTypes from 'prop-types';

import bug from '../../../_libs/bug';

/**
 *  A component that handles the interactive component state
 *      - hover
 *      - hovered  -  like hover but unhovers on button click
 *      - focus
 *      - active
 */
class StateComponent extends Component {
    constructor(props) {
        super (props);
        
        const {active = false} = props;

        this.state = {
            hover: false,
            hovered: false,
            focus: false,
            active: active,
        };
    }

    static propTypes = {
        children: PropTypes.func.isRequired,
    }

    // React 16.3
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.active === prevState.active) {
            return null;
        }

        return { 
            active: nextProps.active
        };
    }

    // < React 16.3  -  deprecated
    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.props.active) {
            this.setState ({ active: nextProps.active});
        }
    }


    render() {
        return (
            <div 
                onMouseEnter={() => (this.setState ({
                        hover: true,
                        hovered: true
                    })
                )}
                onMouseLeave={() => (this.setState({
                        hover: false,
                        hovered: false
                    })
                )}

                onFocus={() => (this.setState ({ focus: true }))}
                onBlur={() => (this.setState ({ focus: false }))}
                onClick={() => (this.setState ((prevState) => ({
                        active: !prevState.active,
                        hovered: false
                    })
                ))}
            >
                {this.props.children (this.state)}
            </div>
        );
    }
}

export default StateComponent;
