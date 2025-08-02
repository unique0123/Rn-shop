import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { PRODUCTS } from '../../../assets/products'
import ProductListItem from "../../components/product-list-item"
import ListHeader from '../../components/List-header'
import Auth from '../auth'
import {getProductsAndCategories} from '../../api/api'

const Home = () => {

  const {data, error, isLoading} = getProductsAndCategories();

  if(isLoading) return <ActivityIndicator/>;

  if(error || !data ) return <Text>Error: {error?.message || 'an Error occured'}</Text>

  // console.log(data);
  return (
    <View>
      <FlatList data={data.products} renderItem={({ item }) => <ProductListItem product={item}/>
      } keyExtractor={item => item.id.toString()}
      numColumns={2}
      ListHeaderComponent={<ListHeader categories={data.categories}/>}
      contentContainerStyle= {styles.flatlistContent}
      columnWrapperStyle= {styles.flatlistColumn}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    

      />
    </View>


      )
}

export default Home

const styles = StyleSheet.create({

  flatlistContent: {
    paddingBottom: 20,
  },
  flatlistColumn: {
    justifyContent: 'space-between'
  },
})