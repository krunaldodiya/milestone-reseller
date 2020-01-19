import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {Button, ListItem} from 'react-native-elements';

export const UserInfo = (props: any) => {
  const {user} = props.navigation.state.params;
  const institute = useStoreState(state => state.institute);

  const checkSubscription = (category_id: any) => {
    return !!user.subscriptions.filter((subscription: any) => {
      return subscription.category_id === category_id;
    }).length;
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={{padding: 5}}>
            <Text style={{fontSize: 18, marginBottom: 7}}>{user.name}</Text>
            <Text style={{fontSize: 14, marginBottom: 0}}>{user.mobile}</Text>
          </View>

          <View style={{marginTop: 10}}>
            <View
              style={{
                padding: 5,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#bbb',
              }}>
              <Text style={{fontSize: 18, textTransform: 'uppercase'}}>
                Subscriptions
              </Text>
            </View>

            <View>
              {institute.categories.map((category: any) => {
                const isSubscribed = checkSubscription(category.category_id);

                return (
                  <ListItem
                    key={category.id}
                    leftAvatar={{source: {uri: category.info.image}}}
                    title={category.info.name}
                    subtitle={category.expires_at}
                    bottomDivider
                    rightElement={
                      <Button
                        buttonStyle={{
                          backgroundColor: isSubscribed ? 'red' : 'green',
                          width: 100,
                          height: 30,
                        }}
                        titleStyle={{
                          fontSize: 12,
                          textTransform: 'uppercase',
                        }}
                        title={isSubscribed ? 'unsubscribe' : 'subscribe'}
                      />
                    }
                    onPress={() => null}
                  />
                );
              })}
            </View>
          </View>
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
