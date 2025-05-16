import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient';
import { Snackbar } from 'react-native-paper';

export const LinearGradientContainer = styled(LinearGradient).attrs({
    colors: ['#020024','#6775de','#0023ff']
})`
flex: 1;
justify-content:center;
align-items: center;
margin:0px;
`;

export const ProfileImage = styled.View`
height: 110px;
width: 110px;
border-radius: 55px;
background-color: #d2d3cf;
margin-bottom: 20px;
justify-content: flex-end;
align-items: center;
`;

export const UploadingImage = styled.View`
flex:1;
background-color:grey;
position:absolute;
height: 110px;
width: 110px;
border-radius: 55px;
opacity:0.6;
justify-content:center;
align-items:center;
`;

export const UploadArea = styled.View`
position: absolute;
    bottom: -2px;
    right: -2px;
    width: 35px;
    height: 35px;
    background-color: #e6f621;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`;

export const NameInput = styled.TextInput`
background-color: white;
width: 280px;
margin-bottom :${props => props.hasError ? '1px' : '10px'};
border-radius: 20px;
padding-vertical: 13px;
padding-horizontal: 15px;
height: 45px;
border-width: ${props => props.hasError ? '1.5px': '0px'};
border-color: ${props => props.hasError ? 'red': 'transparent'}
`;

export const ErrorText = styled.Text`
color:red;
margin-bottom: 5px;
`;

export const EmailInput = styled.TextInput`
  background-color: white;
  width: 280px;
  margin-bottom: ${props => (props.errorEmptyEmail || props.errorValidEmail) ? '1px' : '10px'};
  border-radius: 20px;
  padding-vertical: 13px;
  padding-horizontal: 15px;
  height: 45px;
  border-width: ${props => (props.errorEmptyEmail || props.errorValidEmail) ? '1.5px' : '0px'};
  border-color: ${props => (props.errorEmptyEmail || props.errorValidEmail) ? 'red' : 'transparent'};
`;

export const PasswordInput = styled.TextInput`
background-color: white;
width: 280px;
margin-bottom :${props => props.hasError ? '1px' : '10px'};
border-radius: 20px;
padding-vertical: 13px;
padding-horizontal: 15px;
height: 45px;
border-width: ${props => props.hasError ? '1.5px': '0px'};
border-color: ${props => props.hasError ? 'red': 'transparent'}
`;

export const ConfirmPasswordInput = styled.TextInput`
background-color: white;
width: 280px;
margin-bottom :${props => props.hasError ? '1px' : '10px'};
border-radius: 20px;
padding-vertical: 13px;
padding-horizontal: 15px;
height: 45px;
border-width: ${props => props.hasError ? '1.5px': '0px'};
border-color: ${props => props.hasError ? 'red': 'transparent'}
`;

export const RegisterButton = styled.TouchableOpacity`
width: 280px;
    height: 50px;
    background-color: #c2d106;
    margin-top: 10px;
    border-radius: 20px;
    justify-content: center;
`;

export const RegisterButtonText = styled.Text`
text-align: center;
color: white;
font-size: 18px;
`;

export const ErrorSnackBar = styled(Snackbar)`
position: absolute;
  bottom: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
  width: 70%;
  align-self: center;
  border-radius: 30px;
`;