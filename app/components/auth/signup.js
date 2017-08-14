import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { Container, Content, Grid, Col, Form, Item, Input, Label, Button } from 'native-base';
import { loginUser, signupUser, addAlert } from '../../actions';
import {authUser} from '../../actions';
import Login from './login';
import Header from '../styling/header';
import ButtonTextStyle from '../styling/button_text_style';

const renderInput = ({
  input: { onChange, ...restInput },
  label,
  type,
  secureTextEntry,
  meta: { touched, error, warning }
}) => {
  return (
    <View>
      <Item style={ styles.formItem } floatingLabel>
        <Label style={ styles.label }>{label}</Label>
          <Input
            style={styles.input}
            underlineColorAndroid={'transparent'}
            selectionColor={'rgba(245,219,0,0.8)'}
            tintColor={'rgba(245,219,0,0.8)'}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            {...restInput} />
      </Item>
      <View>{touched &&
      ((error && <Text style={styles.error}>{error}</Text>) ||
        (warning && <Text style={styles.warning}>{warning}</Text>))}</View>
    </View>
  )
}

const onSignUp = (props, dispatch, payload) => {
  dispatch(signupUser(props.email, props.password, props.firstName, props.lastName, props.partnerEmail));
  payload.navigator.pop();
}

const LSForm = props => {
    const { handleSubmit } = props;
    return (
      <Container style={ styles.container }>
        <Content style={ styles.content }>
        <Header><Text style={styles.title}>Sign Up</Text></Header>
          <Form style={ styles.form }>
          <Field name="email" label="Email" component={renderInput} />
          <Field name="password" secureTextEntry={true} label="Password" component={renderInput} />
          <Field name="firstName" label="First Name" component={renderInput} />
          <Field name="lastName" label="Last Name" component={renderInput} />
          <Field name="partnerEmail" label="Partner Email" component={renderInput} />
              <Grid style={styles.buttonGrid}>
                <Col style={styles.buttonContainer}>
                  <Button
                    androidRippleColor='rgba(255,255,255,0.4)'
                    full
                    bordered
                    style={styles.signupButton}
                    transparent
                    onPress={handleSubmit(onSignUp)} >
                    <ButtonTextStyle>
                      <Text uppercase={false}>
                        register
                      </Text>
                    </ButtonTextStyle>
                  </Button>
                </Col>
              </Grid>
      </Form>
      </Content>
      </Container>
    )
}

const validate = formProps => {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }
  if (!formProps.password) {
    errors.password = 'Required'
  } else if (formProps.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  }
  if (!formProps.firstName) {
    errors.firstName = 'Required'
  }
  if (!formProps.lastName) {
    errors.lastName = 'Required'
  }
  if (!formProps.partnerEmail) {
    errors.partnerEmail = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.partnerEmail = 'Invalid email address'
  }
  return errors
}

const warn = formProps => {
  const warnings = {}
  if (formProps.password === "123456") {
    warnings.password = 'Too easy password.'
  }
  return warnings
}

export default reduxForm({
  form: 'login',
  validate: validate,
  warn: warn,
  fields: ['email', 'password', 'firstName', 'lastName', 'partnerEmail'],
}, null, null)(LSForm);

const styles = {
  container: {
    paddingLeft: 42,
    paddingRight: 42,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
  },
  title: {
    textAlign: 'center',
    fontSize: 24
  },
  form: {
  },
  formItem:{
    marginLeft: 6,
    marginRight: 6
  },
  label: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
  input: {
    textAlign: 'center',
  },
  buttonGrid: {
  },
  buttonContainer: {
    marginTop: 24,
    marginLeft: 6,
    marginRight: 6
  },
  signinButton: {
    borderColor: '#12512d',
    borderRadius: 5
  },
  signinText: {
    color: 'black',
    fontSize: 12,
  },
  signupButton: {
    borderColor: '#12512d',
  },
  error: {
    color: 'red',
  },
  warning: {
    color: 'orange'
  },
  login: {
    alignSelf: 'center',
    marginTop: 10
  }
}
