import { connect } from 'react-redux';

import { getJobData, getLoc, getSelectableFilters } from '../selectors';
import * as actions from '../actions/fetch';

import { getFilterIsMoving } from '../reducers/filter';
import { getModalIsOpen } from '../reducers/ui';
import { getSelectablesLoadedFlag } from '../reducers'; 

import App from '../components/elements/App';

const mapStateToProps = (state, ownProps) => ({
    loaded: actions.getLoadingFinished (state),
    jobs: getJobData (state),
    loc: getLoc (state),
    selectableFilters: getSelectableFilters (state),
    selectablesLoadedFlag: getSelectablesLoadedFlag (state),
    modalIsOpen: getModalIsOpen (state),
    filterIsMoving: getFilterIsMoving (state),
});

const enhance = connect (
    mapStateToProps,
    actions
);

export default enhance (App);