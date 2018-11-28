import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames/bind';
import { Field } from "formik";
import styles from './SearchBox.scss';
import AutoComplete from '../../../../../common/AutoComplete';
import { Grid } from '@material-ui/core';

const cx = classNames.bind(styles);

class SearchBox extends Component {
  render() {
    return (
      <Paper className={cx('paper')}>
        <Grid container>
          <Grid item xs={5}>
              <Field
              name="origin"
              placeholder="¿De dónde sale tu pedido?"
              component={AutoComplete}
            />
          </Grid>
          <Grid item xs={5}>
            <Field
              name="destination"
              placeholder="¿Dónde quieres que llegue tu pedido?"
              component={AutoComplete}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default SearchBox;