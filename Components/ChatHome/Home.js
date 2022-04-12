/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import {useHistory} from 'react-router-native';
import axios from '../axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios('/user').then(res => setUsers(res.data));
  }, []);
  const history = useHistory();
  return (
    <View>
      <Text
        style={{
          marginLeft: 3,
          marginTop: 10,
          fontWeight: '700',
          color: 'green',
        }}>
        All Users
      </Text>
      {users &&
        users.map(user => (
          <View
            key={user._id}
            style={{
              display: 'flex',
              paddingLeft: 10,
              marginTop: 6,
              marginBottom: 6,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar.Image
              size={35}
              source={{
                uri: `${user.pic}`,
              }}
            />
            <Text style={{marginLeft: 6}}>{user.name}</Text>
          </View>
        ))}
      <Button onPress={() => history.push('/')}>Go Back</Button>
    </View>
  );
};

export default Home;
