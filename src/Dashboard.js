import {View, Text, Button, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart, setApiData} from './Redux/actions';
import CartModal from './Components/CartModal';
import ProductList from './Components/ProductList';

export default function Dashboard() {
  let apiUrl =
    'https://my-json-server.typicode.com/benirvingplt/products/products'; // in real world projects we define urls in a constant file.
  const {apiData, cart} = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl).then(resp => {
      resp
        .json()
        .then(data => {
          setIsLoading(false);
          dispatch(setApiData(data));
        })
        .catch(err => {
          setIsLoading(false);
          setApiError(err);
        });
    });
  }, []);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }
  return (
    <View style={styles.main}>
      <Button
        onPress={() => toggleModal()}
        title={`Show cart (${cart.length})`}
      />

      {loading ? <Text style={{alignSelf:'center',marginTop:50}}>Loading..</Text> : <ProductList data={apiData} />}
      <CartModal
        modalVisible={modalVisible}
        toggleModal={() => toggleModal()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
  },

  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
