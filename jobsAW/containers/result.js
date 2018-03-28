import { connect } from 'react-redux';

import { setResultId } from '../actions/ui';
import { getResultId } from '../reducers/ui';

import Results from '../components/elements/Results';

const mapStateToProps = (state) => ({
    resultId: getResultId (state),
});


const mapDispatchToProps = (dispatch) => ({
    setResultId: (id) => dispatch (setResultId(id)),
});

const enhance = connect (mapStateToProps, mapDispatchToProps);

export default enhance (Results);