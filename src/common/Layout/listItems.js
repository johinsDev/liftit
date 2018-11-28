import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../modules/auth/data/auth.selectors';

export const mainListItems = (
  <div>
    <Link to="/create-booking" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Create booking" />
      </ListItem>
    </Link>
    <Link to="/bookings" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="List Booking" />
      </ListItem>
    </Link>
  </div>
);

const sListItems = ({ user, history }) => (
  <div>
    <ListSubheader inset>User</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary={user.username} />
    </ListItem>
    <ListItem button onClick={() => {
      localStorage.removeItem('token')
      history.push('/')
    }}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

export const SecondaryListItems = connect(
  (state) => ({
    user: getUser(state)
  }), null
)(withRouter(sListItems));
