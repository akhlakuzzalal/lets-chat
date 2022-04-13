/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const SingleChat = () => {
  const [message, setMessage] = useState('Send');
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      msg: '',
    },
  });
  const sendMessage = data => {
    setMessage(data.msg);
    reset();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.incoming}>Hii</Text>
      <Text style={styles.incoming}>Thanks For Choose Lets Chat</Text>
      <Text style={styles.incoming}>
        Chating Functions are now implementing
      </Text>
      {message !== '' && (
        <View style={styles.send}>
          <Text style={styles.sendText}>{message}</Text>
        </View>
      )}
      <View style={styles.sendBox}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Enter for send"
              style={{
                paddingLeft: 10,
                width: '78%',
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="msg"
        />
        <Button
          onPress={handleSubmit(sendMessage)}
          style={{width: '22%', backgroundColor: 'tomato'}}>
          Send
        </Button>
      </View>
    </View>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  container: {
    height: '89%',
    width: '95%',
    marginHorizontal: '3%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  sendBox: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    borderColor: 'tomato',
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  incoming: {
    marginBottom: 3,
    paddingLeft: 14,
    borderRadius: 20,
    width: 300,
    color: 'black',
    paddingVertical: 7,
    backgroundColor: '#E1E1E1',
  },
  send: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    display: 'flex',
  },
  sendText: {
    textAlign: 'right',
    marginBottom: 3,
    paddingRight: 14,
    borderRadius: 20,
    width: 300,
    color: 'white',
    paddingVertical: 7,
    backgroundColor: '#4e65cc',
  },
});
