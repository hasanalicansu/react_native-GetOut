import React, {Component} from 'react';
import {GetFriends, DeleteFriends} from '../redux/action';
import {connect} from 'react-redux';
import _, {map} from 'lodash';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  RefreshControl,
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {Button, Fab} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

(width = Dimensions.get('window').width),
  (height = Dimensions.get('window').height);
class Friends extends Component {
  state = {modalVisible: false, modelData: []};
  componentDidMount() {
    this.props.GetFriends();
  }

  setModalVisible = (visible, data) => {
    this.state.modelData.pop(), this.state.modelData.push(data);
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        {modalVisible == true ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
              }}>
              <View
                style={{
                  margin: 20,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 35,

                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <View
                  style={{
                    marginBottom: 15,
                    backgroundColor: '#F7F9F9',
                    elevation: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                    <Image
                      style={{
                        marginLeft: 20,
                        alignSelf: 'center',
                        width: 50,
                        height: 50,
                      }}
                      source={require('./image/profilePhoto.png')}></Image>
                  </View>
                  <View style={{flexDirection: 'column', marginLeft: 15}}>
                    <Text
                      style={{
                        color: '#00A6FF',
                        fontSize: 15,
                        margin: 5,
                        fontWeight: 'bold',
                      }}>
                      {this.state.modelData[0].isim}
                      {' @'}
                      {this.state.modelData[0].userName}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        width: 300,
                        margin: 8,
                        color: '#343F4B',
                        fontSize: 15,
                      }}>
                      {this.state.modelData[0].text}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableHighlight
                    style={{
                      backgroundColor: 'red',
                      width: '30%',
                      borderRadius: 10,
                      padding: 10,
                      elevation: 2,
                    }}
                    onPress={() => {
                      this.props.DeleteFriends(this.state.modelData[0].uid),
                        this.props.GetFriends();
                      this.setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>SİL</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      width: '30%',
                      borderRadius: 10,
                      padding: 10,
                      elevation: 2,
                      backgroundColor: '#2196F3',
                    }}
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>DÖN</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        ) : null}

        {this.props.friends == 0 ? (
          
            <View
              style={{
                flex:2,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection:"column"
              }}>
              <Text style={{color:"#E67E22",fontWeight:"900",fontSize:20,textAlign:"center"}}>Merhaba haydi arkadaşlarını bulalım</Text>
              <Text style={{color:"#E67E22",fontWeight:"900",fontSize:25,textAlign:"center",marginTop:20}}>altta bulunan ekle butonuna basarak arkadaşlarını bulabilirsin</Text>
            </View>
          
        ) : (
          <FlatList
            data={this.props.friends}
            renderItem={({item}) => (
              <View style={{marginTop: 15}}>
                <View style={{marginBottom: 10, alignSelf: 'center'}}>
                  {item[0].durum == true ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(true, item[0]);
                      }}
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        flexDirection: 'column',
                        backgroundColor: '#50D2C2',
                        width: width * 0.9,
                        paddingVertical: 25,
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          marginLeft: 15,
                        }}>
                        <Image
                          style={{
                            marginLeft: 20,
                            alignSelf: 'center',
                            width: 50,
                            height: 50,
                          }}
                          source={require('./image/profilePhoto.png')}></Image>
                        <View style={{marginLeft: 15, marginTop: 5}}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#F6F8F8',
                              fontSize: 16,
                            }}>
                            {item[0].isim}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          alignSelf: 'center',
                          marginTop: 15,
                          marginHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            color: '#F6F8F8',
                            fontSize: 16,
                            fontWeight: '500',
                          }}>
                          {item[0].text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(true, item[0]);
                      }}
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        flexDirection: 'column',
                        backgroundColor: '#FF85AD',
                        width: width * 0.9,
                        paddingVertical: 25,
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          marginLeft: 15,
                        }}>
                        <Image
                          style={{
                            marginLeft: 20,
                            alignSelf: 'center',
                            width: 50,
                            height: 50,
                          }}
                          source={require('./image/profilePhoto.png')}></Image>
                        <View style={{marginLeft: 15, marginTop: 5}}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#F6F8F8',
                              fontSize: 16,
                            }}>
                            {item[0].isim}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          alignSelf: 'center',
                          marginTop: 15,
                          marginHorizontal: 15,
                        }}>
                        <Text
                          style={{
                            color: '#F6F8F8',
                            fontSize: 16,
                            fontWeight: '500',
                          }}>
                          {item[0].text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        <View style={{flex: 1}}>
          <Fab
            containerStyle={{}}
            style={{backgroundColor: '#AED6F1'}}
            position="bottomRight"
            onPress={() => this.props.GetFriends()}>
            <Image
              style={{
                marginLeft: 0,
                alignSelf: 'center',
                width: 20,
                height: 20,
              }}
              source={require('./image/refresh.png')}></Image>
          </Fab>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({getFriendsResponse}) => {
  const friends = getFriendsResponse;
  return {friends};
};
export default connect(mapStateToProps, {GetFriends, DeleteFriends})(Friends);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
