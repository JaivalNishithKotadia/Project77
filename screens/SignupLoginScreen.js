import * as React from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import ExchangeClass from '../components/exchangeClass'

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
    };
  }
  userSignUp = (emailId, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then((response) => {
        return Alert.alert('User Added Successfully');
      })
      .catch(function (error) {
        var errorCode = error.code();
        var errorMessage = error.message();
        return Alert.alert(errorMessage);
      });
  };
  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        return Alert.alert('Successfully Logged In');
      })
      .catch((error) => {
        var errorCode = error.code();
        var errorMessage = error.message();
        return Alert.alert(errorMessage);
      });
  };
  render() {
    return (
      <View style={{ backgroundColor: '#FFE0B2' }}>
        <View style={{ backgroundColor: '#FFE0B2' }}>
          <ExchangeClass/>
          <Text style={styles.title}>Barter</Text>
        </View>
        <Text
          style={{
            color: '#ff5722',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 15,
          }}>
          EMAIL ID
        </Text>
        <View style={{ alignItems: 'center' ,backgroundColor: '#FFE0B2' }}>
          <TextInput
            style={styles.loginBox}
            keyboardType={'email-address'}
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          />
        </View>

        <Text
          style={{
            color: '#ff5722',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 15,
          }}>
          PASSWORD
        </Text>
        <View style={{ alignItems: 'center',backgroundColor: '#FFE0B2'  }}>
          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
        </View>
        <View style={{ alignItems: 'center' ,backgroundColor: '#FFE0B2' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userSignUp(this.state.emailId, this.state.password);
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: '700',
    marginTop: 200,
    marginBottom: 80,
    textAlign: 'center',
    color: '#EDAE50',
  },
  loginBox: {
    height: 43,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EAA073',
    borderBottomStartRadius: 2,
    borderBottomEndRadius: 2,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    width: 300,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    marginTop: 8,
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontWeight: '700',
    color: '#ff5722',
  },
});
