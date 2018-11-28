import React, { Component } from 'react';
import { connect } from 'react-redux'
import { filterSelectors } from 'material-ui-filter'
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import source from './data.json'
import List from '@material-ui/core/List';
import ReactList from 'react-list';
import Layout from '../../../common/Layout';
import Grid from '@material-ui/core/Grid';
import { getBookings } from '../data/booking.actions.js';

class listBooking extends Component {
  componentDidMount() {
    this.props.get();
  }

  renderItem = (i, k) => {
    const { list } = this.props
    const key = i
    const val = list[i]

    return (
      <div key={i}>
        <ListItem key={key} id={key}>
          <div key={i} style={{ display: 'flex' }}>
            <div style={{ width: 200 }}>{val.id}</div>
            <div style={{ width: 300 }}>{val.origin}</div>
            <div style={{ width: 300 }}>{val.destination}</div>
            <div style={{ width: 200 }}>{val.created}</div>
          </div>
        </ListItem>
        <Divider />
      </div>
    )
  }

render() {
  const { list } = this.props

  return (
    <Layout>
      <Grid container style={{
            marginTop: '4rem',
            height: 'calc(100vh - 5rem)'
      }}>
        <Grid xs={12} item>
          <List>
            <ReactList
              itemRenderer={this.renderItem}
              length={list ? list.length : 0}
              type="simple"
            />
          </List>
        </Grid>
      </Grid>
    </Layout>
  )
}
}


const mapStateToProps = state => {
  const { filters } = state
  const { hasFilters } = filterSelectors.selectFilterProps('bookings', filters)
  const list = filterSelectors.getFilteredList('bookings', filters, state.bookings.bookings)

  return {
    hasFilters,
    list
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => ({
    get: () => dispatch(getBookings())
  })
)(listBooking)