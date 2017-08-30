import React from 'react';
import { Modal, Text, TouchableHighlight, View, Dimensions, StyleSheet, Image } from 'react-native';

class InputModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.container}>
          <View
            style={styles.backdrop}
          >
            <Text>Leave a message with me!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight 
          onPress={() => {this.setModalVisible(true)}}
          style={styles.waterIcon}
        >
          <Image
            style={styles.roundedIcon}
            source={require('../../assets/icons/waterIcon.png')}
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
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: 80,
   },
   waterIcon: {
    backgroundColor: 'transparent',
    width: 65,
    height: 65,
    top: Dimensions.get('window').height*.08,
    left: Dimensions.get('window').width*.8,
    borderRadius: 180,
   },
   roundedIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain'
  }
});

export default InputModal;