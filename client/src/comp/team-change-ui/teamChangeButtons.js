import React from 'react';
import PropTypes from 'prop-types';

export default function teamChangeButtons(props) {
  return (
    <div>
      <p>Change Team</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <div>
          <button
            type="button"
            onClick={() => props.setTeam('red')}
          >
            Red Team
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => props.setTeam('spyRed')}
          >
            Red Team&apos;s Spy
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => props.setTeam('spyBlue')}
          >
            Blue Team&apos;s Spy
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => props.setTeam('blue')}
          >
            Blue Team
          </button>
        </div>

      </div>
    </div>
  );
}

teamChangeButtons.propTypes = {
  setTeam: PropTypes.func.isRequired,
};
