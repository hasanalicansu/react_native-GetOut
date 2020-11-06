import React, {Component} from 'react';
import {
  SafeAreaView,
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
import {ImageBackground, Image} from 'react-native';
import {connect} from 'react-redux';
import {RegisterUser} from '../redux/action';

class Register extends Component {
  state = {
    email: '',
    password: '',
    isim: '',
    userName: '',
  };

  sendUser() {
    const {isim, userName, email, password} = this.state;
    this.props.RegisterUser({isim, userName, email, password});
  }

  renderButton() {
    {
      if (!this.props.loading) {
        return <Text style={{marginHorizontal: 50}}>Kayıt Ol</Text>;
      }
      return <Spinner color="#9B59B6" style={{marginHorizontal: 28}}></Spinner>;
    }
  }

  render() {
    return (
      <View>
        <ImageBackground
          style={{width: '100%', height: '100%', justifyContent: 'center'}}
          source={require('./image/loginBackground.jpg')}>
          <Image
            style={{
              marginTop: 80,
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
                <Label style={{color: '#E9F5FC'}}>İsim</Label>
                <Input
                  value={this.state.isim}
                  onChangeText={(val) => this.setState({isim: val})}
                />
              </Item>
              <Item stackedLabel>
                <Label style={{color: '#E9F5FC'}}>Kullanıcı Adı</Label>
                <Input
                  value={this.state.userName}
                  onChangeText={(val) => this.setState({userName: val})}
                />
              </Item>
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
          </Content>
        </ImageBackground>
      </View>
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

export default connect(mapStateToProps, {RegisterUser})(Register);
