import * as React from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { defaultStyles } from '../constants/Styles';
import { Link } from 'expo-router';
import { Heart, Star } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface ListingsProps {
  items: any[];
  category: string;
  refresh: number;
}

export default function Listings({ items: items, category, refresh }: ListingsProps) {
  const [loading, setLoading] = React.useState(false);
  const listRef = React.useRef<BottomSheetFlatListMethods>(null);

  React.useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  React.useEffect(() => {
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
              <Text style={{ fontFamily: 'mon-sb' }}>{item.price}€</Text>
              <Text style={{ fontFamily: 'mon' }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        ref={listRef}
        renderItem={renderRow}
        data={loading ? [] : items}
        ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
      />
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
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
});
