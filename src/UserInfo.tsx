import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Header, ListItem} from 'react-native-elements';

export const UserInfo = (props: any) => {
  const institute = useStoreState(state => state.institute);
  const user_data = useStoreState(state => {
    return state.institute.students.filter((student: any) => {
      return student.student_id === props.navigation.state.params.user.id;
    })[0];
  });

  const user = user_data ? user_data.info : null;

  const toggleSubscription = useStoreActions(
    (actions: any) => actions.toggleSubscription,
  );

  const removeUser = useStoreActions((actions: any) => actions.removeUser);

  const checkSubscription = (category_id: any) => {
    return !!user.subscriptions.filter((subscription: any) => {
      return subscription.category_id === category_id;
    }).length;
  };

  if (!user) {
    return (
      <View>
        <Text>No such user</Text>
      </View>
    );
  }

  return (
    <Fragment>
      <SafeAreaView style={{flex: 1}}>
        <Header
          style={{flex: 1}}
          statusBarProps={{
            barStyle: 'light-content',
            translucent: true,
            backgroundColor: '#003333',
          }}
          barStyle="light-content"
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            size: 22,
            onPress: async () => {
              props.navigation.pop();
            },
          }}
          centerComponent={{
            text: user.mobile,
            style: {color: '#fff', fontSize: 22},
          }}
          rightComponent={{
            text: 'delete',
            style: {
              color: '#fff',
              fontSize: 14,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            },
            onPress: async () => {
              await removeUser({student_id: user.id});
              props.navigation.pop();
            },
          }}
          containerStyle={{backgroundColor: '#003333'}}
        />

        <View style={styles.container}>
          {user.name ? (
            <View style={{padding: 20}}>
              <Text style={{fontSize: 18, fontWeight: '600'}}>
                Name: {user.name}
              </Text>
            </View>
          ) : null}

          <View>
            <View
              style={{
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#bbb',
              }}>
              <Text style={{fontSize: 16, textTransform: 'uppercase'}}>
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
                        onPress={async () => {
                          await toggleSubscription({
                            user_id: user.id,
                            category_id: category.id,
                            expires_at: category.expires_at,
                          });
                        }}
                      />
                    }
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
  },
});
