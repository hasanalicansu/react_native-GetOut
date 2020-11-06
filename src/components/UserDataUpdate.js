import React, {Component} from 'react';
import {UserDataUpdateAction, UserDataGetAction} from '../redux/action';
import {connect} from 'react-redux';
import {Image, Text, View, Switch, Alert, ScrollView} from 'react-native';
import {Textarea, Button} from 'native-base';

class UserDataUpdate extends Component {
  state = {
    switchValue: true,
    note: '',
  };
  componentDidMount() {
    this.props.UserDataGetAction();
  }
  update() {
    if (this.state.note === '') {
      Alert.alert(
        'BOŞ ALAN',
        'Note ekleyiniz',
        [{text: 'OK', onPress: () => null}],
        {cancelable: false},
      );
    } else {
      this.props.UserDataUpdateAction(this.state.note, this.state.switchValue);
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{marginTop: 40, flexDirection: 'column'}}>
            <View style={{flexDirection: 'row',justifyContent:"space-around",marginTop:20}}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 150,
                  height: 150,
                }}
                source={require('./image/profilePhoto.png')}></Image>

              <View style={{marginTop: 15}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    alignSelf: "flex-start",
                    color: '#580024',
                  }}>
                  {this.props.userData.isim}
                </Text>
                <View style={{ width:160,alignSelf: 'flex-start'}}>
                  <Text numberOfLines={5} style={{alignSelf: 'flex-start'}}>
                    {this.props.userData.text}
                  </Text>
                </View>

                {this.props.userData.durum == true ? (
                  <Text style={{alignSelf: 'flex-start', color: 'green'}}>
                    Dışarı çıkıyorum
                  </Text>
                ) : (
                  <Text style={{alignSelf: 'flex-start', color: 'red'}}>
                    Dışarı çıkmıyorum
                  </Text>
                )}
              </View>
            </View>

            <View
              style={{
                marginTop: 80,
                width: 300,
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 16,
                  fontWeight: '900',

                  color: '#BA4A00',
                }}>
                DIŞARI ÇIKACAK MISIN
              </Text>
              <Switch
                //trackColor={{false: '#767577', true: '#81b0ff'}}
                //thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#E74C3C"
                onValueChange={() => {
                  this.state.switchValue == true
                    ? this.setState({switchValue: false})
                    : this.setState({switchValue: true});
                }}
                value={this.state.switchValue == true ? true : false}
              />
            </View>
            <View style={{alignSelf: 'center', marginTop: 20}}>
              <Textarea
                style={{width: 300}}
                rowSpan={5}
                onChangeText={(note) => {
                  this.setState({note});
                }}
                //value={this.state.note}
                bordered
                placeholder="NOT EKLE"
              />
            </View>
            <View style={{flex: 1, marginTop: 30, alignSelf: 'center'}}>
              <Button
                onPress={() => {
                  this.update();
                }}>
                <Text style={{color: '#FFFFFF', marginHorizontal: 20}}>
                  GÜNCELLE
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({userUpdateResponse}) => {
  const userData = userUpdateResponse;
  return {
    userData,
  };
};

export default connect(mapStateToProps, {
  UserDataUpdateAction,
  UserDataGetAction,
})(UserDataUpdate);
