import {useStoreActions} from 'easy-peasy';
import React, {Fragment, useState} from 'react';
import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import {Button, Input, Header} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

export const AddStudent = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState();

  const addStudent = useStoreActions((actions: any) => actions.addStudent);

  const addStudentHandler = async () => {
    setLoading(true);

    try {
      await addStudent({mobile});
      setLoading(false);
      props.navigation.pop();
    } catch (e) {
      setLoading(false);
      Alert.alert('Oops', e.response.data.message);
    }
  };

  return (
    <Fragment>
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
          text: 'Add Student',
          style: {color: '#fff', fontSize: 22},
        }}
        containerStyle={{backgroundColor: '#003333'}}
      />

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View>
              <Input
                placeholder="Mobile Number"
                value={mobile}
                onChangeText={(data: any) => setMobile(data)}
                autoCorrect={false}
                autoCapitalize="none"
                inputStyle={{padding: 5}}
                inputContainerStyle={styles.input}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={{backgroundColor: '#003333'}}
              title="ADD"
              onPress={() => addStudentHandler()}
              disabled={loading}
              loading={loading}
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingLeft: 10,
    marginHorizontal: 10,
  },
  inputContainer: {},
  buttonContainer: {margin: 20},
});
