import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Field, reduxForm } from 'redux-form'
import { Container, Content, Grid, Col, Form, Item, Input, Label, Button } from 'native-base';
import { loginUser, signupUser, addAlert } from '../../actions';
import SignUp from './signup';
import ButtonTextStyle from '../styling/button_text_style';

const renderInput = ({
  input: { onChange, ...restInput },
  label,
  type,
  secureTextEntry,
  meta: { touched, error, warning }
}) => {
  if (label === "email") {
    icon = "email-outline"
  } else {
    icon = "lock-outline"
  }
  return (
    <View>
      <Item style={ styles.formItem }>
        <Icon name={`${icon}`} size={26} color='#12512d'/>
        <Input
          placeholder={label}
          style={styles.input}
          selectionColor={'#12512d'}
          tintColor={'#12512d'}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
          {...restInput} />
      </Item>
    </View>
  )
}

const onSignIn = (props, dispatch) => {
  dispatch(loginUser(props.email, props.password));
}

// DEMO LOGINS
// const demoLogin = (props, dispatch) => {
//   dispatch(loginUser('AwesomeUser@awesome.com', 'awesome'));
// }
//
// const partnerLogin = (props, dispatch) => {
//   dispatch(loginUser('AwesomePartner@awesome.com', 'awesome'));
// }

const LSForm = props => {
    const { handleSubmit } = props;
    return (
      <Container style={ styles.container }>
        <Content style={ styles.content }>
          <Image style={styles.logo} source={require('../../assets/icons/woven-logo-copy.png')} />
          <Form style={ styles.form }>
            <Field name="email" label="email" component={renderInput} />
            <Field name="password" secureTextEntry={true} label="password" component={renderInput} />
            <Grid style={styles.buttonGrid}>
              <Col style={styles.buttonContainer}>
                <Button
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

const warn = formProps => {
  const warnings = {}
  if (!formProps.email) {
    warnings.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    warnings.email = 'Invalid email address'
  }
  if (!formProps.password) {
    warnings.password = 'Required'
  } else if (formProps.password.length < 6) {
    warnings.password = 'Must be 6 characters or more'
  }
  return warnings
}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
}, null, null)(LSForm);

const styles = {
  container: {
    top: Dimensions.get('window').height*.03,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingLeft: Dimensions.get('window').width*.1,
    paddingRight: Dimensions.get('window').width*.1,
    height: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 24
  },
  logo: {
    width: Dimensions.get('window').width*.4,
    height: Dimensions.get('window').width*.4,
    margin: Dimensions.get('window').width*.2,
    alignSelf: 'center'
  },
  formItem:{
    marginLeft: 6,
    marginRight: 6
  },
  input: {
    paddingLeft: 30,
    color: '#12512d'
  },
  label: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
  buttonGrid: {
  },
  buttonContainer: {
    marginTop: Dimensions.get('window').height*.05,
  },
  signinButton: {
    borderRadius: 50,
    borderColor: 'transparent',
    backgroundColor: '#cdf9d8',
  },
  signinText: {
    color: '#12512d',
    fontSize: 12
  },
  demostuff: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  demoButton: {
    width: 50,
    height: 20
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
};
