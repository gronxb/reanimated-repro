import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useCallback, useRef} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const backdropComponent = (backDropProps: any) => (
    <BottomSheetBackdrop
      {...backDropProps}
      pressBehavior="close"
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      enableTouchThrough={true}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Show Bottom Sheet"
        onPress={() => bottomSheetRef.current?.expand()}
      />
      <Button
        title="Hide Bottom Sheet"
        onPress={() => bottomSheetRef.current?.close()}
      />

      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={backdropComponent}
        snapPoints={[500]}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Button
            onPress={() => {
              Alert.alert('You tapped the button!');
            }}
            title="Click me"
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default () => {
  return (
    <GestureHandlerRootView>
      <App />
    </GestureHandlerRootView>
  );
};
