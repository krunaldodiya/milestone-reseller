import AsyncStorage from '@react-native-community/async-storage';
import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {Fragment, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Header, Input, ListItem} from 'react-native-elements';
import {baseUrl} from './libs/vars';

export const Auth = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [keywords, setKeywords] = useState('');

  const institute = useStoreState(state => state.institute);
  const getInstitute = useStoreActions((actions: any) => actions.getInstitute);

  useEffect(() => {
    const init = async () => {
      try {
        await getInstitute();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    init();
  }, []);

  const getFilteredStudents = () => {
    const data = institute.students;

    return keywords.length >= 3
      ? data.filter((student: any) => {
          return (
            student.info.name.match(new RegExp(`^${keywords}`, 'gi')) ||
            student.info.mobile.match(new RegExp(`^${keywords}`, 'gi'))
          );
        })
      : data;
  };

  const showStudents = () => {
    return (
      <View>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={getFilteredStudents()}
          renderItem={({item}: any) => {
            const user = item.info;
            const image = `${baseUrl}/storage/${user.avatar}`;

            return (
              <ListItem
                leftAvatar={{source: {uri: image}}}
                title={user.name}
                subtitle={user.mobile}
                bottomDivider
                onPress={() => props.navigation.push('UserInfo', {user})}
              />
            );
          }}
        />
      </View>
    );
  };

  const noStudents = () => {
    return (
      <View>
        <Text>No Students</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="small" style={styles.loading} />;
  }

  return (
    <Fragment>
      <SafeAreaView style={{flex: 1}}>
        <Header
          statusBarProps={{
            barStyle: 'light-content',
            translucent: true,
            backgroundColor: '#003333',
          }}
          barStyle="light-content"
          centerComponent={{
            numberOfLines: 2,
            text: institute.name,
            style: {
              color: '#fff',
              fontSize: 20,
              textAlign: 'center',
              textAlignVertical: 'center',
            },
          }}
          rightComponent={{
            text: 'logout',
            style: {
              color: '#fff',
              fontSize: 14,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            },
            onPress: async () => {
              AsyncStorage.removeItem('token');
              props.navigation.replace('Guest');
            },
          }}
          containerStyle={{
            backgroundColor: '#003333',
            justifyContent: 'center',
          }}
        />

        <View style={{flex: 1, marginTop: 5}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
            }}>
            <View style={{flex: 1}}>
              <Input
                placeholder="Search"
                value={keywords}
                onChangeText={(data: any) => setKeywords(data)}
                autoCorrect={false}
                autoCapitalize="none"
                inputStyle={{padding: 0, fontSize: 14}}
                underlineColorAndroid="transparent"
                inputContainerStyle={{borderBottomWidth: 0}}
                containerStyle={styles.input}
              />
            </View>

            <View style={{marginLeft: 5}}>
              <Button
                buttonStyle={{backgroundColor: '#003333'}}
                title="Add Student"
                titleStyle={{fontSize: 14, textTransform: 'uppercase'}}
                onPress={() => props.navigation.push('AddStudent')}
              />
            </View>
          </View>

          <View style={{flex: 1, marginTop: 10}}>
            {institute.students.length ? showStudents() : noStudents()}
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  loading: {flex: 1, justifyContent: 'center'},
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingLeft: 10,
  },
});
