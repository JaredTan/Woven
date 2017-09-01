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
} from 'react-native';
import Dimensions from 'Dimensions';
import { Field, reduxForm, change } from 'redux-form';
import { Container, Content, Grid, Col, Form, Item, Input, Label, Button } from 'native-base';
import {addAlert, updateUser } from '../../actions';
import PhotoUpload from 'react-native-photo-upload';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';


const renderInput = ({
  input: { onChange, ...restInput },
  label,
  type,
  secureTextEntry,
  meta: { touched}
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
      <View>{touched}</View>
    </View>
  )
}


const handleEdit = (props, dispatch, payload) => {
  let newBirthday = new Date(props.birthday);
  newBirthday.setMinutes( newBirthday.getMinutes() + newBirthday.getTimezoneOffset() );
  let newAnniversary = new Date(props.anniversary);
  newAnniversary.setMinutes( newAnniversary.getMinutes() + newAnniversary.getTimezoneOffset() );
  dispatch(updateUser(payload.initialValues.currentUserId, props.firstName, props.lastName, props.imageUrl, newBirthday, newAnniversary));
  payload.navigator.pop();
}

const EditForm = (props) => {
    const { handleSubmit, initialValues } = props;
    return (
      <Container style={ styles.container }>
        <Content style={ styles.content }>
          <Form style={ styles.form }>
            <View style={styles.photo}>
            <PhotoUpload
               onPhotoSelect={b64image => {
                 if (b64image) {
                   props.change('imageUrl', `data:image/png;base64,${b64image}`)
                 }
               }}
              >
             <Image
               style={{
                 width: Dimensions.get('window').width*.3,
                 height: Dimensions.get('window').width*.3,
                 borderRadius: Dimensions.get('window').width*.15
               }}
               resizeMode='cover'
               source={{
                 uri: initialValues.imageUrl
               }}
             />
          </PhotoUpload>
          <Text style={{fontSize: 10}}>Upload Picture</Text>
          </View>
          <Field name="firstName" label="First Name" component={renderInput} />
          <Field name="lastName" label="Last Name" component={renderInput} />
          <View style={styles.dates}>
            <View style={styles.date}>
              <Text>Birthday      </Text>
              <Field name="birthday"
                component={ props =>
                  <DatePicker
                    date={props.input.value}
                    mode='date'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    placeholder='MM/DD/YYYY'
                    format='MM/DD/YYYY'
                    onDateChange={(date) => {
                      props.input.onChange(moment(new Date(date)).format("MM/DD/YYYY"))
                    }
                  }
                  />
              }/>
          </View>
          <View style={styles.date}>
            <Text>Anniversary</Text>
            <Field name="anniversary"
              component={ props =>
                <DatePicker
                  date={props.input.value}
                  mode='date'
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  placeholder='MM/DD/YYYY'
                  format='MM/DD/YYYY'
                  onDateChange={(date) => props.input.onChange(moment(new Date(date)).format("MM/DD/YYYY"))}
                  />
              }/>
          </View>
        </View>
          <Grid style={styles.buttonGrid}>
            <Col style={styles.buttonContainer}>
              <Button
                full
                bordered
                style={styles.editButton}
                transparent
                onPress={handleSubmit(handleEdit)} >
                <Text>
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
  fields: ['firstName', 'lastName', 'currentUserId', 'imageUrl', 'birthday', 'anniversary'],
})(EditForm)

EditForm = connect(
  state => ({
    initialValues: {
      firstName: state.users.currentUser.firstName,
      lastName: state.users.currentUser.lastName,
      currentUserId: state.users.currentUser._id,
      imageUrl: state.users.currentUser.imageUrl,
      birthday: moment(new Date(state.users.currentUser.birthday)).format("MM/DD/YYYY"),
      anniversary: moment(new Date(state.users.currentUser.anniversary)).format("MM/DD/YYYY")
    }
  })
)(EditForm)

export default EditForm;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  form: {
  },
  content: {
    top: Dimensions.get('window').height*.1,
    paddingTop: Dimensions.get('window').height*.03,
    paddingLeft: Dimensions.get('window').width*.1,
    paddingRight: Dimensions.get('window').width*.1,
    height: '100%'
  },
  photo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  formItem:{
    marginLeft: 6,
    marginRight: 6
  },
  dates: {
    marginTop: 10,
    marginBottom: 10
  },
  label: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
  input: {
    textAlign: 'center',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 24,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 10
  },
  editButton: {
    borderRadius: 50,
    borderColor: 'transparent',
    backgroundColor: '#cdf9d8'
  }
}
