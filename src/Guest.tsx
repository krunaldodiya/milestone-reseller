import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, {Fragment, useState} from 'react';
import {Alert, StatusBar, StyleSheet, View, Image} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {baseUrl} from './libs/vars';

export const Guest = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const doSignIn = async () => {
    setLoading(true);

    try {
      const {data} = await axios.post(baseUrl + '/api/reseller/login', {
        username,
        password,
      });

      AsyncStorage.setItem('token', data.token);
      setLoading(false);
      props.navigation.replace('Auth');
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
      Alert.alert('Oops', error);
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#003333" barStyle="light-content" />

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Image
              style={{flex: 1}}
              source={require('../src/images/logo.png')}
              resizeMode="contain"
              resizeMethod="auto"
            />
          </View>

          <View style={styles.bottom}>
            <View style={styles.inputContainer}>
              <View>
                <Input
                  placeholder="Username"
                  value={username}
                  onChangeText={(data: any) => setUsername(data)}
                  autoCorrect={false}
                  autoCapitalize="none"
                  inputStyle={{padding: 5}}
                  inputContainerStyle={styles.input}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View>
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={(data: any) => setPassword(data)}
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                  inputStyle={{padding: 5}}
                  inputContainerStyle={styles.input}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="login"
                titleStyle={{fontSize: 16, textTransform: 'uppercase'}}
                buttonStyle={{backgroundColor: '#003333'}}
                onPress={() => doSignIn()}
                disabled={loading}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: '#003333',
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
