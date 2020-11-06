import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Fab,
} from 'native-base';
import _ from 'lodash';
import {SearchUser,AddFriend} from '../redux/action';
import {connect} from 'react-redux';
import {FlatList, Image} from 'react-native';

class Settings extends Component {
  state = {name: ''};
  render() {
    return (
      
      <View style={{flex: 1,marginTop:30}} >
        <Item>
          <Input
            placeholder="ARAMA"
            value={this.state.name}
            onChangeText={(val) => this.setState({name: val})}
          />
        </Item>
        <View style={{alignItems:"center"}}>
        <Text style={{alignItems:"center",fontSize:17,marginTop:5}}>Arkadaşınızın ismini veya kullanıcı adını giriniz</Text>
        </View>
        
          <View style={{flex:1}}>
            <FlatList
              data={this.props.users}
              renderItem={(item) => (
                <View
                  style={{
                    elevation: 10,
                    alignSelf: 'center',
                    width: '90%',
                    padding: 20,
                    marginBottom: 20,
                    backgroundColor: 'white',
                    marginTop: 10,
                    borderRadius: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{flexDirection: 'column', alignSelf: 'center'}}>
                      <Image
                        style={{
                          alignSelf: 'center',
                          width: 50,
                          height: 50,
                        }}
                        source={require('./image/profilePhoto.png')}></Image>
                    </View>
                    <Text
                      style={{
                        color: '#00A6FF',
                        fontSize: 15,
                        margin: 5,

                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      {' '}
                      {item.item.isim} {"@"+item.item.userName}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: '#5DADE2',
                        borderRadius: 25,
                      }}>
                      <Text
                        onPress={() => {this.props.AddFriend(item.item._id)}}
                        style={{
                          alignSelf: 'center',
                          marginLeft: 11,
                          color: 'white',
                          fontSize: 15,
                        }}>
                        ekle
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Button
            style={{alignSelf: 'center'}}
            onPress={() => this.props.SearchUser(this.state.name)}>
            <Text>Search</Text>
          </Button>
        </View>
      </View>
      
    );
  }
}

const mapStateToProps = ({searchResponse}) => {
  const users =searchResponse;
  return {users};
};

export default connect(mapStateToProps, {SearchUser,AddFriend})(Settings);
