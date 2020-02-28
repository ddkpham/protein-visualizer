import React, { useState } from 'react';
import {
  AppBar,
  MenuItem,
  Typography,
  IconButton,
  Menu,
  Toolbar
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import './index.scss';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function CustomAppBar(props) {
  const { toggleLegend, scaleVisualization, setScaleFactor } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const valueText = val => {
    setScaleFactor(val);
    return `${val}x`;
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleLegend}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Sun Lab
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={evt => {
              handleMenu(evt);
              scaleVisualization();
            }}
            color="inherit"
          >
            <LinearScaleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
            classes={{
              paper: 'wide-menu'
            }}
          >
            <MenuItem onClick={handleClose}>
              <Typography id="discrete-slider" gutterBottom>
                Protein Scaling Factor
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              classes={{ root: 'menuItem--large' }}
            >
              <Slider
                defaultValue={1}
                getAriaValueText={valueText}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
              />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

CustomAppBar.propTypes = {
  toggleLegend: PropTypes.bool.isRequired,
  scaleVisualization: PropTypes.func
};

CustomAppBar.defaultProps = {
  scaleVisualization: () => {}
};

export default CustomAppBar;
