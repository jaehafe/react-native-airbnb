import * as React from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { defaultStyles } from '../constants/Styles';
import { Link } from 'expo-router';
import { Heart, Star } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface ListingsProps {
  items: any[];
  category: string;
}

export default function Listings({ items: items, category }: ListingsProps) {
  const [loading, setLoading] = React.useState(false);
  const listRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    console.log('listing length>>', items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
            <Image source={{ uri: item.medium_url }} style={styles.image} />
            <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
              <Heart color={'#000'} />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <Star size={16} color={'black'} fill={'black'} />
                <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating / 20}</Text>
              </View>
            </View>

            <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>

            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: 'mon-sb' }}>{item.price}元</Text>
              <Text style={{ fontFamily: 'mon' }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList ref={listRef} renderItem={renderRow} data={loading ? [] : items} />
    </View>
  );
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});
