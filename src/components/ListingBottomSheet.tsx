import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import Listings from './Listings';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface ListingBottomSheetProps {
  listings: any;
  category: string;
}

function ListingBottomSheet({ listings, category }: ListingBottomSheetProps) {
  const snapPoints = React.useMemo(() => ['10%', '100%'], []);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [refresh, setRefresh] = React.useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <View style={styles.contentContainer}>
        <Listings items={listings} refresh={refresh} category={category} />
        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={onShowMap} style={styles.btn}>
            <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>Map</Text>
            <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

export default React.memo(ListingBottomSheet);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
