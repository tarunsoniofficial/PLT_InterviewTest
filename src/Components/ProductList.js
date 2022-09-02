import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native'
import React from 'react'
import { addToCart, removeFromCart } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductList(props) {

  const {cart} = useSelector(state => state.reducer);
  const dispatch = useDispatch();

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
      return (
        <>
          <FlatList
            data={props.data || cart}
            style={{marginTop: 10}}
            renderItem={renderItem}
            keyExtractor={(item, i) => i}
          />
        </>
      );
  }


  return (
   <View >
      {renderList()}
    </View>
  )
}


const styles = StyleSheet.create({
  
    listItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
  });
  