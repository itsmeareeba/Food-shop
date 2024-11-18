import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CATEGORIES } from "../../assets/categories";
import { useCartStore } from "../store/cart-store";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";
// Define a Product interface
interface Product {
  id: number;
  name: string;
  imageUrl: string;
}
// Sample product data (replace this with your actual data)
const PRODUCTS: Product[] = [
  { id: 1, name: "Pizza", imageUrl: "https://example.com/pizza.png" },
  { id: 2, name: "Burger", imageUrl: "https://example.com/burger.png" },
  { id: 3, name: "Sushi", imageUrl: "https://example.com/sushi.png" },
  // Add more products as needed
];
export const ListHeader = () => {
  const { getItemCount } = useCartStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Specify the type here
  const handleSearch = () => {
    // Filter products based on search query
    const results = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results); // This should now be valid
  };

  const handleSignOut = async () =>{
    await supabase.auth.signOut();
  };

  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWyDrOTvJItpfqm7ndt7eFj_N_V2Hx2QGNHA&s" }}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>Food Shop</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getItemCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
            <FontAwesome name="sign-out" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
              <Text style={styles.resultText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.searchResultsContainer}
        />
      )}
      <View style={styles.heroContainer}>
        <Image
          source={require("../../assets/images/banner-foods.png")}
          style={styles.heroImage}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.voucherContainer2}>
        <Text style={styles.sectionTitle}>Voucher Program</Text>
        <Text style={styles.Title}>See all</Text>
        {/* ... other components ... */}
      </View>
      <View style={styles.voucherimgContainer}>
        <Image
          source={require("../../assets/images/voucher.png")}
          style={styles.voucherimg}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:  0.3,
    shadowRadius: 4,
    padding: 5,
  },
  searchIcon: {
    marginLeft: 10,
    marginRight:20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchResultsContainer: {
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginHorizontal: 10,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  resultImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  resultText: {
    fontSize: 16,
  },
  heroContainer: {
    width: "100%",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  categoryText: {},
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: 10,
    backgroundColor: "#F35C56",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  voucherContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    alignItems: "center",
    marginRight:10,
   },
  Title: {
    marginRight: 10, // Add space between the texts
    fontWeight: "bold",
    alignItems: "center",
    paddingBottom: 10,
    color: "#F35C56", // Example font weight
  },
  voucherimgContainer:{
    width:"100%",
    height:200,
  },
  voucherimg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});