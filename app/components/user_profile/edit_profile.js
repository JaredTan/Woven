import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { Container, Content, Grid, Col, Form, Item, Input, Label, Button } from 'native-base';
import {addAlert, updateUser } from '../../actions';
import PhotoUpload from 'react-native-photo-upload';



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

const handleEdit = (props, dispatch, payload) => {
  dispatch(updateUser(payload.initialValues.currentUserId, props.firstName, props.lastName, props.bio));
  payload.navigator.pop();
}

const EditForm = props => {
    const { handleSubmit, currentUser } = props;
    return (
      <Container style={ styles.container }>
        <Content style={ styles.content }>
          <Form style={ styles.form }>
            <PhotoUpload
               onPhotoSelect={avatar => {
                 if (avatar) {
                   console.log('Image base64 string: ', avatar)
                 }
               }}
              >
             <Image
               style={{
                 paddingVertical: 30,
                 width: 150,
                 height: 150,
                 borderRadius: 75
               }}
               resizeMode='cover'
               source={{
                 uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
               }}
             />
          </PhotoUpload>
          <Field name="firstName" label="First Name" component={renderInput} />
          <Field name="lastName" label="Last Name" component={renderInput} />
          <Field name="bio" label="Bio" component={renderInput} />
            <Grid style={styles.buttonGrid}>
              <Col style={styles.buttonContainer}>
                <Button
                  androidRippleColor='rgba(255,255,255,0.4)'
                  full
                  bordered
                  style={styles.signupButton}
                  transparent
                  onPress={handleSubmit(handleEdit)} >
                  <Text uppercase={false} style={styles.signupText}>
                    edit profile
                  </Text>
                </Button>
              </Col>
            </Grid>
          </Form>
        </Content>
      </Container>
    )
}

const mapStateToProps = (state) => {
  return (
    state
  )
};


EditForm = reduxForm({
  form: 'edit-form',
  fields: ['firstName', 'lastName', 'bio', 'currentUserId'],
})(EditForm)

EditForm = connect(
  state => ({
    initialValues: {
      firstName: state.users.currentUser.firstName,
      lastName: state.users.currentUser.lastName,
      bio: state.users.currentUser.bio,
      currentUserId: state.users.currentUser._id
    }
  })
)(EditForm)


export default EditForm;
//
// export default reduxForm({
//   form: 'edit-form',
//   fields: ['firstName', 'lastName', 'bio'],
// }, mapStateToProps, null)(EditForm);

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
    borderColor: 'black',
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
  },
  login: {
    alignSelf: 'center',
    marginTop: 10
  }
}
