import React, { useState } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  TextField
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import { makeStyles } from '@material-ui/core/styles';
import './index.scss';

const useStyles = makeStyles({
  root: {
    Width: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 20,
    textDecoration: 'none',
    color: '#cb2d39',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  pos: {
    marginBottom: 12
  }
});

function ProteinWindow(props) {
  const {
    toggleGlyco,
    toggleSulfide,
    length,
    updateWindowStart,
    updateWindowEnd
  } = props;
  const [showGlyco, setShowGlyco] = useState(true);
  const [showSulfide, setShowSulfide] = useState(true);
  const classes = useStyles();

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(length);

  const handleToggle = bond => {
    if (bond === 'sulfide') {
      toggleSulfide(!showSulfide);
      setShowSulfide(!showSulfide);
    } else {
      toggleGlyco(!showGlyco);
      setShowGlyco(!showGlyco);
    }
  };

  return (
    <div className="window--wrapper">
      <Card variant="outlined" classes={{ root: 'window--display' }}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Protein Window Input
          </Typography>

          <div className="window--menuItem">
            <Typography>
              Total Protein Length:
              <Typography display="inline" classes={{ root: 'bold-text' }}>
                {length}
              </Typography>
            </Typography>
          </div>
          <div className="window--menuItem">
            <TextField
              id="outlined-basic"
              defaultValue={0}
              label="Start"
              variant="outlined"
              onChange={ev => updateWindowStart(ev.target.value)}
            />
            <TextField
              id="outlined-basic"
              defaultValue={length}
              label="End"
              variant="outlined"
              onChange={ev => updateWindowEnd(ev.target.value)}
            />
            {/* TODO: Decide if we want users to set window view or if it should stay automatic */}
            {/* <div className="button-visibility--on">
              <IconButton onClick={() => console.log('clicked')}>
                <ZoomInIcon />
              </IconButton>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

ProteinWindow.propTypes = {
  toggleGlyco: PropTypes.func,
  toggleSulfide: PropTypes.func,
  length: PropTypes.number.isRequired
};

ProteinWindow.defaultProps = {
  toggleGlyco: () => {},
  toggleSulfide: () => {}
};

export default ProteinWindow;
