/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Link, useHistory} from 'react-router-native';
import axios from '../axios';
import {SocketContext} from '../Context/ControlContext';

const Registration = () => {
  const history = useHistory();
  const [passErr, setPassErr] = useState('');
  const firebase = useContext(SocketContext);
  const {user, createAccount, logOut, error, setError, setUser} = firebase[0];
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      password2: '',
    },
  });

  if (passErr) {
    setTimeout(() => {
      setPassErr('');
    }, 4000);
  }
  if (error && error !== '') {
    setTimeout(() => {
      setError('');
    }, 4000);
  }
  const onSubmit = data => {
    const {email, name} = data;
    if (data.password === data.password2) {
      if (firebase) {
        createAccount(data.email, data.password)
          .then(data => {
            setUser(data.user);
            axios
              .put('/user/create', {email: email, name: name})
              .then(res => console.log(res.data));
            reset();
            history.push('/');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setError('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              setError('That email address is invalid!');
            }
          });
      }
    } else {
      setPassErr('mismatch password');
    }
  };
  return (
    <View style={style.login}>
      {!user?.email ? (
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 15, fontWeight: '700'}}>
            Wellcome to Lets Chat
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
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  label={'Name'}
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
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
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  secureTextEntry
                  label={'Re Enter Password'}
                  style={style.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password2"
            />
            <Text style={{color: 'red', fontWeight: '700'}}>
              {passErr && `${passErr}`}
            </Text>
            <Button
              mode="contained"
              style={style.button}
              title="Submit"
              onPress={handleSubmit(onSubmit)}>
              Register Now
            </Button>
            {error !== '' && (
              <Text style={{color: 'red', marginTop: 6, fontWeight: '700'}}>
                {error}
              </Text>
            )}
          </View>
          <Text style={{marginTop: 15}}>You have an Account? </Text>
          <Link to={'/'}>
            <Text style={{marginTop: 10, color: 'blue', fontWeight: '700'}}>
              LogIn Now
            </Text>
          </Link>
        </View>
      ) : (
        <View>
          <Button onPress={logOut}>LogOut</Button>
        </View>
      )}
    </View>
  );
};

export default Registration;

const style = StyleSheet.create({
  login: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
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
