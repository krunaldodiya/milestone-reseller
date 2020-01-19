import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

export const UserInfo = (props: any) => {
  const {user} = props.navigation.state.params;

  return (
    <Fragment>
      <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text>{user.name}</Text>
          <Text>{user.mobile}</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
