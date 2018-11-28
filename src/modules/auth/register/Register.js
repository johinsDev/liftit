import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Layout from '../common/Layout';
import { Link, withRouter } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { compose } from 'redux';
import { signUp } from '../data/auth.actions';
import { connect } from 'react-redux'

class Register extends Component {
  render() {
    const { values, handleChange, handleBlur, isSubmitting, isValid, handleSubmit, errors } = this.props;

    return (
      <Layout>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">username</InputLabel>
            <Input
              name="username"
              type="text"
              id="username"
              error={errors.username}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && <FormHelperText id="component-error-text">{errors.username}</FormHelperText>}
          </FormControl>
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
            Sign Up
          </Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={{
                marginTop: '1rem'
              }}
            >
              Iniciar sesion
            </Button>
          </Link>
        </form>
      </Layout>
    );
  }
}


const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
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
    register: (data) => dispatch(signUp(data))
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
      email: '',
      username: ''
    }),
    validationSchema: registerSchema,
    handleSubmit: async (values, { props, setSubmitting }) => {
      try {
        const response = await props.register(values);

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
)(Register);