import React from 'react';
import { Modal, Text, TouchableHighlight, View, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, Button } from 'react-native';

class InputModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      text: '',
      messages: props.plant.messages
    };

    this.submitAndReset = this.submitAndReset.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.resizeTextBox = this.resizeTextBox.bind(this);
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }

  submitAndReset() {
    return (e) => {
      const {updatePlant, connectionId, partner, plant} = this.props;
      plant.messages.for[partner.firstName] = this.state.text;

      updatePlant(connectionId, plant);

      this.setModalVisible(!this.state.modalVisible);
      this.setState({
        text: ''
      });
    };
  }


  render() {
    return (
      <View>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <TouchableHighlight
          style={styles.container}
          onPress={() => {this.setModalVisible(!this.state.modalVisible)}}
         >
          <View style={styles.backdrop}>
            <TextInput
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={this.submitAndReset()}
              value={this.state.text}
              style={styles.messageText}
              maxLength={50}
              clearButtonMode={'while-editing'}
              clearTextOnFocus={true}
              returnKeyType={'send'}
              autoCapitalize={'sentences'}
              placeholder={'Leave a message with me!'}
              autoFocus={true}
            />
          </View>
         </TouchableHighlight>
        </Modal>

        <TouchableOpacity
          onPress={() => {this.setModalVisible(true)}}
          style={styles.plantMessageIcon}
        >
          <Image
            style={styles.roundedIcon}
            source={require('../../assets/icons/PlantMessageIcon.png')}
          />
        </TouchableOpacity>

      </View>
    );
  }

  resizeTextBox() {
    
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000050',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   },
   backdrop:{
    width: Dimensions.get('window').width*.8,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 5,
   },
   messageText:{
     paddingLeft: 10,
   },
   plantMessageIcon: {
    backgroundColor: 'transparent',
    width: 61,
    height: 61,
    top: Dimensions.get('window').height*.09,
    left: Dimensions.get('window').width*.805,
    borderRadius: 31,
   },
   roundedIcon: {
    width: 61,
    height: 61,
    resizeMode: 'contain'
  }
});

export default InputModal;
