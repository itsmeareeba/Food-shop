import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Product } from '../../assets/types/product';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
export const ProductListItem = ({ product }: {product: Product}) => {
  return (
  <Link asChild href={`/product/${product.slug}`}>
    <Pressable style={styles.item}>
        <View style={styles.itemImageContainer}>
            <Image source={product.heroImage} style={styles.itemImage} />
        </View>
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>{product.title}</Text>
            <View style={styles.priceRating}>
              <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
              <View style={styles.rating}>
                <FontAwesome5 name="star" size={12} color="#FFC107" />
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
            </View>
        </View>
    </Pressable>
  </Link>
  );
};
const styles = StyleSheet.create({
    item: {
        width: '48%',
        backgroundColor: 'white',
        marginVertical: 8,
        borderRadius: 10,
        overflow: 'hidden',
    },
    itemImageContainer: {
        borderRadius: 10,
        width: '100%',
        height: 150,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    itemTextContainer: {
        padding: 8,
        alignItems: 'flex-start',
        gap: 4,
    },
    itemTitle: {
        fontSize: 16,
        color: '#888',
    },
    priceRating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    itemPrice: {
         fontSize: 14,
        fontWeight: 'bold',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 4,
        color: '#888',
    },
});