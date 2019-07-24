import React, { useEffect } from 'react';
import { connect } from 'react-redux'; // 1connect redux to component
import Preloader from '../layout/Preloader';
import LogItem from './LogItem';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  // destructure destructured // 4.props.. actions

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show..</p>
      ) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

// 3bringing in the stuff from state
const mapStateToProps = state => ({
  log: state.log // log a is a prop
});

export default connect(
  mapStateToProps,
  { getLogs } // +4actions as 2nd parameter
)(Logs);
// 2export of redux connected component
