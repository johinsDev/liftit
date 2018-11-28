import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Layout from '../common/Layout';
import { Link, withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { compose } from 'redux';
import FormHelperText from '@material-ui/core/FormHelperText';
import { signIn } from '../data/auth.actions';
import { connect } from 'react-redux'

class Login extends Component {
  render() {
    const { values, handleChange, handleBlur, isSubmitting, isValid, handleSubmit, errors } = this.props;
  
    return (
      <Layout>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              error={errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
             {errors.email && <FormHelperText id="component-error-text">{errors.email}</FormHelperText>}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              error={errors.password}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && <FormHelperText id="component-error-text">{errors.password}</FormHelperText>}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isValid || isSubmitting}
            style={{
              marginTop: '1rem'
            }}
          >
            Sign in
          </Button>
          <Link to="/sign-up" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{
                marginTop: '1rem'
              }}
            >
              Crear Cuenta
            </Button>
          </Link>
        </form>
      </Layout>
    );
  }
}

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
  .email('Invalid email')
  .required('Required'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(signIn(data))
  }
}

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  ),
  withFormik({
    mapPropsToValues: () => ({ 
      password: '', 
      email: ''
    }),
    validationSchema: loginSchema,
    handleSubmit: async (values, { props, setSubmitting }) => {

      try {
        const response = await props.login(values);

        if (response.value.data) {
          localStorage.setItem('token', response.value.data.token)
          props.history.push('create-booking')
        }
      } catch (error) {
        console.log(error)
      }

      setSubmitting(false)
    }
  })
)(Login);