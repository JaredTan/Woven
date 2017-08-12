import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  DeviceEventEmitter
} from 'react-native'
import { Field, reduxForm, change } from 'redux-form'
import { Container, Content, Grid, Col, Form, Item, Input, Label, Button } from 'native-base';
import {addAlert, updateUser } from '../../actions';
import PhotoUpload from 'react-native-photo-upload';




const renderInput = ({
  input: { onChange, ...restInput },
  label,
  type,
  secureTextEntry,
  meta: { touched, notification, warning }
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
      ((notification && <Text style={styles.notification}>{notification}</Text>) ||
        (warning && <Text style={styles.warning}>{warning}</Text>))}</View>
    </View>
  )
}


const handleEdit = (props, dispatch, payload) => {
  dispatch(updateUser(payload.initialValues.currentUserId, props.firstName, props.lastName, props.imageUrl, payload.navigator));
  payload.navigator.pop();
}

const EditForm = (props) => {
    const { handleSubmit, initialValues } = props;
    return (
      <Container style={ styles.container }>
        <Content style={ styles.content }>
          <Form style={ styles.form }>
            <PhotoUpload
               onPhotoSelect={b64image => {
                 if (b64image) {
                   props.change('imageUrl', `data:image/png;base64,${b64image}`)
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
                 uri: initialValues.imageUrl
               }}
             />
          </PhotoUpload>
          <Field name="firstName" label="First Name" component={renderInput} />
          <Field name="lastName" label="Last Name" component={renderInput} />
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
                    update profile
                  </Text>
                </Button>
              </Col>
            </Grid>
          </Form>
        </Content>
      </Container>
    )
}

EditForm = reduxForm({
  form: 'edit-form',
  fields: ['firstName', 'lastName', 'currentUserId', 'imageUrl'],
})(EditForm)

EditForm = connect(
  state => ({
    initialValues: {
      firstName: state.users.currentUser.firstName,
      lastName: state.users.currentUser.lastName,
      currentUserId: state.users.currentUser._id,
      imageUrl: state.users.currentUser.imageUrl
    }
  })
)(EditForm)

export default EditForm;

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
  notification: {
    color: 'green',
  },
  warning: {
    color: 'orange'
  },
  login: {
    alignSelf: 'center',
    marginTop: 10
  }
}
