import React, { useState } from 'react';
import {
  AppBar,
  MenuItem,
  Typography,
  IconButton,
  Menu,
  Toolbar,
  Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import { makeStyles } from '@material-ui/core/styles';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
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
  const {
    toggleLegend,
    scaleVisualization,
    setScaleFactor,
    toggleFullScale,
    disableFullScale,
    fullScale
  } = props;
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

  const updateFullScale = () => {
    toggleFullScale();
  };

  return (
    <AppBar>
      <Toolbar>
        <Tooltip title="Toggle Legend">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleLegend}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Turn off Scaling (Proteins must have min 3000 length)">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="scale"
            onClick={updateFullScale}
            disabled={disableFullScale}
          >
            <AspectRatioIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" className={classes.title}>
          Sun Lab
        </Typography>
        <div>
          <Tooltip title="Increase Scaling Factor">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              disabled={fullScale}
              onClick={evt => {
                handleMenu(evt);
                scaleVisualization();
              }}
              color="inherit"
            >
              <LinearScaleIcon />
            </IconButton>
          </Tooltip>
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
                max={15}
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
  scaleVisualization: PropTypes.func,
  setScaleFactor: PropTypes.func,
  toggleFullScale: PropTypes.func.isRequired,
  disableFullScale: PropTypes.bool,
  fullScale: PropTypes.bool
};

CustomAppBar.defaultProps = {
  scaleVisualization: () => {},
  setScaleFactor: () => {},
  disableFullScale: false,
  fullScale: false
};

export default CustomAppBar;
