import {useStoreActions} from 'easy-peasy';
import React, {Fragment, useState} from 'react';
import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';

export const AddStudent = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState();
  const [error, setError] = useState();

  const addStudent = useStoreActions((actions: any) => actions.addStudent);

  const addStudentHandler = async () => {
    setLoading(true);

    try {
      await addStudent({mobile});
      setLoading(false);
      props.navigation.pop();
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
      Alert.alert('Oops', error);
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#0D62A2" barStyle="light-content" />

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
  top: {
    flex: 1,
    backgroundColor: '#0D62A2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {color: 'white', textAlignVertical: 'center', fontSize: 36},
  bottom: {flex: 1, justifyContent: 'center'},
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {},
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingLeft: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {margin: 20},
});
