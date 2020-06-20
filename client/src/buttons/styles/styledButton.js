import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import colors from '../../constants/colors';

export default withStyles(() => ({
  root: {
    color: colors.secondaryOne,
    backgroundColor: colors.neutralDark,
    fontFamily: "'Roboto Mono', monospace",
    fontWeight: 600,
    transition: 'all 0.15s',
    '&:hover': {
      color: colors.primary,
      backgroundColor: colors.neutralDarker,
    },
  },
}))(Button);
