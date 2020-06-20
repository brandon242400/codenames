import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import StyledButton from '../buttons/styles/styledButton';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '50vw',
  },
}));

export default function RulesPopUp() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledButton type="button" onClick={handleOpen} variant="contained" color="primary">
        Read the rules
      </StyledButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Rules</h2>
            <p id="transition-modal-description">
              Codenames is a game of guessing which code names (words) in a set are
              related to a hint-word given by another player.
              <br />
              <br />
              Players split into two teams: red and blue. One player of each team is
              selected as the team&apos;s spymaster; the others are field operatives.
              Twenty-five Codename cards, each bearing a picture, are laid out in a
              5×5 rectangular grid, in random order. A number of these words represent
              red agents, a number represent blue agents, one represents an assassin,
              and the others represent innocent bystanders.
              <br />
              <br />
              The teams&apos; spymasters are given a randomly-dealt map card showing a 5×5
              grid of 25 squares of various colors, each corresponding to one of the
              code name cards on the table. Teams take turns. On each turn, the
              appropriate spymaster gives a verbal hint about the words on the
              respective cards. Each hint may only consist of one single word and a
              number. The spymaster gives a hint that is related to as many of the
              words on his/her own agents&apos; cards as possible, but not to any others –
              lest they accidentally lead their team to choose a card representing an
              innocent bystander, an opposing agent, or the assassin.
              <br />
              <br />
              The hint&apos;s word can be chosen freely, as long as it is not (and does not
              contain) any of the words on the code name cards still showing at that
              time. Code name cards are covered as guesses are made.
              <br />
              <br />
              The hint&apos;s number tells the field operatives how many words in the grid
              are related to the word of the clue. It also determines the maximum
              number of guesses the field operatives may make on that turn, which is
              the hint&apos;s number plus one. Field operatives must make at least one
              guess per turn, risking a wrong guess and its consequences. They may
              also end their turn voluntarily at any point thereafter.
              <br />
              <br />
              After a spymaster gives the hint with its word and number, their field
              operatives make guesses about which code name cards bear words related
              to the hint and point them out, one at a time. When a code name card is
              pointed out, the spymaster covers that card with an appropriate identity
              card – a blue agent card, a red agent card, an innocent bystander card,
              or the assassin card – as indicated on the spymasters&apos; map of the grid.
              <br />
              <br />
              If the assassin is pointed out, the game ends immediately, with the team
              who identified him losing. If an agent of the other team is pointed out,
              the turn ends immediately, and that other team is also one agent closer
              to winning. If an innocent bystander is pointed out, the turn simply
              ends.
              <br />
              <br />
              The game ends when all of one team&apos;s agents are identified (winning the
              game for that team), or when one team has identified the assassin
              (losing the game).

            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
