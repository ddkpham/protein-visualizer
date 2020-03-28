import React from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography
} from '@material-ui/core';
import Logo from '../../static/sunlab.png';
import './index.scss';

function Introduction(props) {
  const title = 'Protein Visualizer';

  const redirect = () => {
    window.location.href = 'http://www.sfu.ca/chemistry/groups/bingyun_sun/';
  };

  return (
    <div>
      <Card className="introduction--wrapper">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="lab logo"
            height="140"
            image={Logo}
            className="introduction--logo"
            onClick={redirect}
          />
        </CardActionArea>
        <CardContent className="introduction--body">
          <Typography variant="h5" className="introduction--title">
            Read Me
          </Typography>
          <Typography variant="body1">
            This web application was built to visualize protein glycoslyation
            sites and sulfide bonds to illustrate patterns in their arrangement.
          </Typography>
          <ul>
            <li className="introduction--bullet">
              <Typography variant="body2" display="inline">
                Select a protein to visualize from the drop down menu located
                above this card. There are several example proteins for
                selection.{' '}
              </Typography>
            </li>
            <li className="introduction--bullet">
              <Typography variant="body2" display="inline">
                If the current scale of the visualization is not sufficient to
                identify patterns , on the top right of the app bar is a sliding
                scale to horizontally expand the protein.
              </Typography>
            </li>
            <li className="introduction--bullet">
              <Typography variant="body2" display="inline">
                In addition to scaling, there is also a window feature that
                allows users to target a specific region for visualization. This
                is particularily useful when scaling alone is not sufficient to
                seperate patterns. The window feature is located below the
                original visualization.
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default Introduction;
