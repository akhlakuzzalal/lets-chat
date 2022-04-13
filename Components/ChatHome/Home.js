/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-native';
import {fetchAllUser} from '../../redux/Slices/usersSlice';
import {SocketContext} from '../Context/ControlContext';

const Home = () => {
  const firebase = useContext(SocketContext);
  const {user} = firebase[0];

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);
  const history = useHistory();
  return (
    <View>
      {firebase && user?.email ? (
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
              <Link key={user._id} to="/single">
                <View
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
              </Link>
            ))}
          <Button onPress={() => history.push('/login')}>Go Back</Button>
        </View>
      ) : (
        <View>
          {!firebase && <Text>Please Wait</Text>}
          <Text>You are not Loged in yet</Text>
          <Button onPress={() => history.push('/login')}>Plese log In</Button>
        </View>
      )}
    </View>
  );
};

export default Home;
