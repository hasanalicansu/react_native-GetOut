import React, {Component} from 'react';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  View,
  Spinner,
} from 'native-base';
import {ImageBackground, Image,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {loginUser,loginWithToken} from '../redux/action';
import AsyncStorage from '@react-native-community/async-storage';


class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  sendUser() {
    const {email, password} = this.state;
    this.props.loginUser({email, password});
  }

  tokenSorgu=async()=>{
    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {
      return userToken
    } else {
      return null
    }
  }

  async componentDidMount (){
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.loginWithToken(token)
    } else {
      null
    }
  }

  renderButton() {
    {
      if (!this.props.loading) {
        return <Text style={{marginHorizontal: 50}}>GİRİŞ</Text>;
      }
      return <Spinner color="#9B59B6" style={{marginHorizontal: 15}}></Spinner>;
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <ImageBackground
            style={{width: '100%', height: '100%', justifyContent: 'center'}}
            source={require('./image/loginBackground.jpg')}>
            <Image
              style={{
                marginTop: 50,
                marginBottom: 10,
                alignSelf: 'center',
                width: 150,
                height: 150,
                tintColor: '#DBF3FF',
              }}
              source={require('./image/user.png')}></Image>

            <Content style={{width: 300, alignSelf: 'center', marginTop: 0}}>
              <Form>
                <Item stackedLabel>
                  <Label style={{color: '#E9F5FC'}}>E-Mail</Label>
                  <Input
                    value={this.state.email}
                    onChangeText={(val) => this.setState({email: val})}
                  />
                </Item>
                <Item stackedLabel>
                  <Label style={{color: '#E9F5FC'}}>Password</Label>
                  <Input
                    value={this.state.password}
                    onChangeText={(val) => this.setState({password: val})}
                    secureTextEntry={true}
                  />
                </Item>
              </Form>
              <Button
                onPress={() => this.sendUser()}
                style={{marginTop: 30, alignSelf: 'center'}}
                bordered
                light>
                {this.renderButton()}
              </Button>
              <Button
                onPress={() => {this.props.navigation.navigate("Register")}}
                style={{marginTop: 30, alignSelf: 'center'}}
                bordered
                light>
                <Text>Kayıt Ol</Text>
              </Button>
           
            </Content>
           
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}





const mapStateToProps = ({loginResponse}) => {
  const {loading, currentUser} = loginResponse;
  return {
    loading,
    currentUser,
  };
};

export default connect(mapStateToProps, {loginUser,loginWithToken})(LoginPage);
