import {View, Text, Button, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart, setApiData} from './Redux/actions';
import CartModal from './Components/CartModal';

export default function Dashboard() {
  let apiUrl =
    'https://my-json-server.typicode.com/benirvingplt/products/products'; // in real world projects we define urls in a constant file.
  const {apiData,cart} = useSelector(state => state.reducer);
  const dispatch = useDispatch();

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

  renderItem = ({item, index}) => {
    let isThere = cart.findIndex(v => v.id == item.id)

    return (
      <View style={styles.listItemContainer}>
        <Image
          source={{uri: item.img}}
          style={{width: 100, height: 100}}
          resizeMode="contain"
        />
        <Text style={{color: '#000', flex: 1}}>{item.name}</Text>
        <Button color={isThere > -1 ? 'red' : undefined} onPress={()=>addRemoveFromCart(item)} title={isThere > -1 ? "Remove from cart" : "Add to cart"} />
      </View>
    );
  };

  function addRemoveFromCart(product){
    let isThere = cart.findIndex(v => v.id == product.id)
    if(isThere > -1){
      dispatch(removeFromCart(product))
    } else {
      dispatch(addToCart(product))

    }
  }

  function renderList() {
    if (apiError) {
      return <Text style={{alignSelf: 'center'}}>{apiError}</Text>;
    } else {
      return (
        <>
          <Button title={`Go to cart (${cart.length}) >`} />
          <FlatList
            data={apiData}
            style={{marginTop: 10}}
            renderItem={renderItem}
            keyExtractor={(item, i) => i}
          />
        </>
      );
    }
  }
  return (
    <View style={styles.main}>
      {loading ? <Text>Loading..</Text> : renderList()}
      <CartModal modalVisible={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },

  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
