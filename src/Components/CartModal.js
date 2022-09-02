import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {useSelector} from 'react-redux';
import ProductList from './ProductList';

const CartModal = props => {
  const {apiData, cart} = useSelector(state => state.reducer);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}} />
        <Text style={{fontSize: 25}}>Cart</Text>
        <Text
          style={{fontSize: 25, flex: 1, textAlign: 'right'}}
          onPress={() => props.toggleModal()}>
          X
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={props.modalVisible}
        transparent={false}
        style={{flex: 1}}
        onRequestClose={() => {
          props.toggleModal(false);
        }}>
        <View style={{backgroundColor: 'white', margin: 10}}>
          {renderHeader()}

          {cart.length > 0 ? (
            <ProductList />
          ) : (
            <Text style={{alignSelf: 'center', marginTop: 30}}>
              No products added
            </Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CartModal;
