import React, {Component} from 'react';
import {View, FlatList, Text, SafeAreaView, Image} from 'react-native';
import {GetOnaylama, SendTrue, SendFalse, GetFriends} from '../redux/action';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Fab} from 'native-base';
class Onaylama extends Component {
  componentDidMount() {
    this.props.GetOnaylama();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.props.onaylamalar == "Herhangi bir istek bulunamadı" ? (
          <View style={{alignItems:"center",marginTop:20}}>
            <Text style={{fontSize:17}}>Arkadaşlık isteği bulunmamaktadır</Text>
          </View>
        ) : (
          <FlatList
            data={this.props.onaylamalar}
            renderItem={({item}) => (
              <SafeAreaView style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <View>
                        <Text style={{fontSize: 20, color: '#1C2833'}}>
                          {item.istekYollayanIsim}
                        </Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 17, color: '#2E4053'}}>
                          {'@'}
                          {item.istekYollayanUserName}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.SendTrue(item._id),
                          this.props.GetFriends()
                      }}
                      style={{
                        marginRight: 5,
                        backgroundColor: '#2E86C1',
                        padding: 5,
                        borderRadius: 5,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          color: '#F7F9F9',
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Onayla
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.props.SendFalse(item._id)}
                      style={{
                        backgroundColor: '#E74C3C',
                        padding: 5,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                      }}>
                      <Text
                        style={{
                          color: '#F7F9F9',
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Sil
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        <View style={{flex: 1}}>
          <Fab
            containerStyle={{}}
            style={{backgroundColor: '#AED6F1'}}
            position="bottomRight"
            onPress={() => this.props.GetOnaylama()}>
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

const mapStateToProps = ({onaylamaResponse}) => {
  let onaylamalar = {onaylamaResponse};
  onaylamalar = onaylamalar.onaylamaResponse;
  console.log(onaylamalar)
  return {onaylamalar};
};

export default connect(mapStateToProps, {
  GetOnaylama,
  SendTrue,
  SendFalse,
  GetFriends,
})(Onaylama);
