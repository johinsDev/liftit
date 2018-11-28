import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames/bind';
import styles from './Distance.scss';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from 'react-redux'; 
import { getDistance } from '../../../data/booking.selectors'

const cx = classNames.bind(styles);

class Distance extends Component {
  render() {
    const { metadata: { hr, mi, km }, isValid, isSubmitting, submit } = this.props;
  
    return (
      <Paper className={cx('distance')}>
        <Grid container>
          <Grid item xs={3} className={cx('wrapper-button')}>
            <Button className={cx('button')} disabled={isSubmitting || !isValid} onClick={submit}>
              Create Booking
            </Button>
          </Grid>
          <Grid item xs={9}>
            <List className={cx("list")}>
              <ListItem>
                <ListItemText primary="Millas: " />
                <Chip label={mi} className={cx("chip")} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Km: " />
                <Chip label={km} className={cx("chip")} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Time: " />
                <Chip label={hr} className={cx("chip")} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return ({
    metadata: getDistance(state)
  })
}

export default connect(mapStateToProps, null)(Distance);