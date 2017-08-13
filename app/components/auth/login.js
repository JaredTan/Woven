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
import SignUp from './signup';
import Header from '../styling/header';
import ButtonTextStyle from '../styling/button_text_style';
import BodyText from '../styling/body_text';

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

const onSignIn = (props, dispatch) => {
  dispatch(loginUser(props.email, props.password));
}

const LSForm = props => {
    const { handleSubmit } = props;
    return (
      <Container style={ styles.container }>
        <Content style={ styles.content }>
          <Header><Text>Log In</Text></Header>
          <Form style={ styles.form }>
            
              <Field name="email" label="email" component={renderInput} />
              <Field name="password" secureTextEntry={true} label="password" component={renderInput} />

              <Grid style={styles.buttonGrid}>
                <Col style={styles.buttonContainer}>
                  <Button
                    androidRippleColor='rgba(245,219,0,0.4)'
                    full
                    bordered
                    style={styles.signinButton}
                    transparent
                    onPress={handleSubmit(onSignIn)} >
                    <ButtonTextStyle>
                      <Text uppercase={false} style={styles.signinText}>
                      login
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
  fields: ['email', 'password'],
}, null, null)(LSForm);

const styles = {
  container: {
    padding: 42,
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
  },
  signinText: {
    color: 'black',
    fontSize: 12,
  },
  signupButton: {
    borderColor: 'black',
  },
  signupText: {
    color: 'black',
    fontSize: 12,
  },
  error: {
    color: 'red',
  },
  warning: {
    color: 'orange'
  }
}
