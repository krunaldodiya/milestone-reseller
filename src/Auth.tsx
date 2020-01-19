import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Input, ListItem} from 'react-native-elements';

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

            return (
              <ListItem
                leftAvatar={{source: {uri: user.avatar}}}
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
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 5,
        }}>
        <View style={{flex: 1}}>
          <Input
            placeholder="Filter Students"
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
            title="Add Student"
            titleStyle={{fontSize: 12, textTransform: 'uppercase'}}
            onPress={() => props.navigation.push('AddStudent')}
          />
        </View>
      </View>

      <View style={{flex: 1, marginTop: 10}}>
        {institute.students.length ? showStudents() : noStudents()}
      </View>
    </View>
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
