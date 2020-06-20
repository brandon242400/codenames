import styled from 'styled-components';
import colors from '../../../constants/colors';

const assassinCardStyle = styled.div`
  background-color: ${colors.secondaryTwo};
  border: 2px solid ${colors.primary};
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(100, 100, 100, 0.75);
  color: ${colors.primary};
  font-family: 'Roboto Mono', monospace;
  font-size: 110%;
  font-weight: 500;
  height: 100px;
  margin: 5px 1px;
  padding: 35px 0;
  width: 175px;
`;

const bystanderCardStyle = styled.div`
  background-color: ${colors.neutralDark};
  border: 2px solid ${colors.primary};
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(100, 100, 100, 0.75);
  color: ${colors.secondaryOne};
  font-family: 'Roboto Mono', monospace;
  font-size: 110%;
  font-weight: 500;
  height: 100px;
  margin: 5px 1px;
  padding: 35px 0;
  width: 175px;
  transition: background-color 0.15s, color 0.15s;
  :hover {
    cursor: pointer;
    background-color: ${colors.neutralDarker};
    color: ${colors.primary};
  }
`;

const bystanderCardStyleSelected = styled.div`
  background-color: ${colors.neutralLight};
  border: 2px solid ${colors.neutralDarker};
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(100, 100, 100, 0.75);
  color: ${colors.neutralDarker};
  font-family: 'Roboto Mono', monospace;
  font-size: 110%;
  font-weight: 500;
  height: 100px;
  margin: 5px 1px;
  padding: 35px 0;
  width: 175px;
`;

const friendlyCardStyle = styled.div`
  background-color: ${colors.primary};
  border: 2px solid ${colors.neutralDark};
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(100, 100, 100, 0.75);
  color: ${colors.neutralDark};
  font-family: 'Roboto Mono', monospace;
  font-size: 110%;
  font-weight: 500;
  height: 100px;
  margin: 5px 1px;
  padding: 35px 0;
  width: 175px;
`;

const enemyCardStyle = styled.div`
  background-color: ${colors.primary};
  border: 2px solid ${colors.secondaryTwo};
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(100, 100, 100, 0.75);
  color: ${colors.secondaryTwo};
  font-family: 'Roboto Mono', monospace;
  font-size: 110%;
  font-weight: 500;
  height: 100px;
  margin: 5px 1px;
  padding: 35px 0;
  width: 175px;
`;

export {
  enemyCardStyle,
  friendlyCardStyle,
  bystanderCardStyle,
  bystanderCardStyleSelected,
  assassinCardStyle,
};
