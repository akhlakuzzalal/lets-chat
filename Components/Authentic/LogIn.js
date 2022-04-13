/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Link, useHistory} from 'react-router-native';
import {SocketContext} from '../Context/ControlContext';

const LogIn = () => {
  const history = useHistory();
  const firebase = useContext(SocketContext);
  const {user, logOut, logIn, setUser, setError, error} = firebase[0];
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = data => {
    if (firebase) {
      logIn(data.email, data.password)
        .then(data => {
          setUser(data.user);
          history.push('/');
        })
        .catch(error => {
          console.log(error.code);
          if (error.code === 'auth/user-not-found') {
            setError('You have no account with this mail');
          }
          if (error.code === 'auth/invalid-email') {
            setError('This is not a valid email address');
          }

          if (error.code === 'auth/wrong-password') {
            setError('Please enter correct password');
          }
        });
    }
    reset();
  };
  if (error && error !== '') {
    setTimeout(() => {
      setError('');
    }, 4000);
  }
  return (
    <View style={style.login}>
      {!user?.email ? (
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 15, fontWeight: '700'}}>
            Please LogIn For the next
          </Text>
          <View style={{width: '100%'}}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label={'Email'}
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && <Text style={style.error}>This is required.</Text>}

            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  secureTextEntry
                  label={'Password'}
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />

            <Button
              mode="contained"
              style={style.button}
              title="Submit"
              onPress={handleSubmit(onSubmit)}>
              Log In
            </Button>
            {error !== '' && (
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: 'red',
                  marginTop: 8,
                }}>
                {error}
              </Text>
            )}
          </View>
          <Text style={{marginTop: 15}}>Haven't any Account? </Text>
          <Link to={'/register'}>
            <Text style={{marginTop: 10, color: 'blue', fontWeight: '700'}}>
              Register Now
            </Text>
          </Link>
        </View>
      ) : (
        <View>
          <Button onPress={logOut}>Log Out</Button>
        </View>
      )}
    </View>
  );
};

export default LogIn;

const style = StyleSheet.create({
  login: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100,
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: 'none',
    marginBottom: 6,
  },
  button: {
    marginTop: 15,
    color: 'white',
  },
  error: {
    color: 'red',
  },
});
