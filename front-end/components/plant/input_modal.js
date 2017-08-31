import React from 'react';
import { Modal, Text, TouchableHighlight, View, Dimensions, StyleSheet, Image, TextInput } from 'react-native';

class InputModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      text: 'Leave a message with me!',
      messages: props.plant.messages
    };

    this.submitAndReset = this.submitAndReset.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  clearInput() {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        text: ''
      });
    };
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
        text: 'Would you rather leave a different message?'
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
          <View
            style={styles.backdrop}
          >
            <TextInput
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={this.submitAndReset()}
              onFocus={this.clearInput()}
              value={this.state.text}
              style={styles.backdrop}
            />
          </View>
         </TouchableHighlight >
        </Modal>

        <TouchableHighlight
          onPress={() => {this.setModalVisible(true)}}
          style={styles.plantMessageIcon}
        >
          <Image
            style={styles.roundedIcon}
            source={require('../../assets/icons/PlantMessageIcon.png')}
          />
        </TouchableHighlight>

      </View>
    );
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
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    padding: 3,
   },
   plantMessageIcon: {
    backgroundColor: 'transparent',
    width: 65,
    height: 65,
    top: Dimensions.get('window').height*.09,
    left: Dimensions.get('window').width*.805,
    borderRadius: 180,
   },
   roundedIcon: {
    width: 61,
    height: 61,
    resizeMode: 'contain'
  }
});

export default InputModal;
