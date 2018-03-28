import { connect } from 'react-redux';
import { getLoc, getSelectableFilters } from '../selectors';
import { 
    getFilterZoneFor, 
    getMovingFromZone,
    getFilterTopOnlyFor 
} from '../reducers/filter';

import { getModalIsOpen, getModalType } from '../reducers/ui';
import { 
    updateFilter, 
    setIsMoving,
    setIsMovingFromZone,
    toggleTopOnly
} from '../actions/filter';

import { closeModal } from '../actions/ui';

import filterModal from '../components/elements/FModal';

const mapStateToProps = (state, ownProps) => ({
    modalIsOpen: getModalIsOpen (state),
    modalType: getModalType (state),
    getFilterZone: getFilterZoneFor (state),
    getFilterTopOnly: getFilterTopOnlyFor (state),
    movedFromZone: getMovingFromZone (state),
    loc: getLoc (state),
    selectable: getSelectableFilters (state),

});
const mapDispatchToProps = (dispatch, ownProps) => ({
    setIsMoving: (isMoving) => dispatch (setIsMoving (isMoving)),
    setIsMovingFromZone: (fromZone) => dispatch (setIsMovingFromZone (fromZone)),
    closeModal: () => dispatch (closeModal ()),
    updateFilter: (...props) => dispatch (updateFilter (...props)),
    toggleTopOnly: (type, payload) => dispatch (toggleTopOnly (type, payload)),
});

const enhance = connect (
    mapStateToProps,
    mapDispatchToProps
);

export default enhance (filterModal);