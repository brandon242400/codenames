import styled from 'styled-components';

const assassinCardStyle = styled.div`
background-color: #444;
border: 2px solid black;
border-radius: 5px;
height: 10vh;
margin: 5px 1px;
min-height: 50px;
padding-bottom: 10px;
transition: background-color 0.25s;
width: 18%;
h5 {
  color: red;
}
:hover {
  background-color: green;
  cursor: pointer;
}
`;

const bystanderCardStyle = styled.div`
background-color: #777;
border: 2px solid black;
border-radius: 5px;
height: 10vh;
margin: 5px 1px;
min-height: 50px;
padding-bottom: 10px;
transition: background-color 0.25s;
width: 18%;
:hover {
  background-color: green;
  cursor: pointer;
}
`;

const redCardStyle = styled.div`
background-color: #777;
border: 2px solid red;
border-radius: 5px;
height: 10vh;
margin: 5px 1px;
min-height: 50px;
padding-bottom: 10px;
transition: background-color 0.25s;
width: 18%;
:hover {
  background-color: green;
  cursor: pointer;
}
`;

const blueCardStyle = styled.div`
background-color: #777;
border: 2px solid blue;
border-radius: 5px;
height: 10vh;
margin: 5px 1px;
min-height: 50px;
padding-bottom: 10px;
transition: background-color 0.25s;
width: 18%;
:hover {
  background-color: green;
  cursor: pointer;
}
`;

export {
  blueCardStyle,
  redCardStyle,
  bystanderCardStyle,
  assassinCardStyle,
};
