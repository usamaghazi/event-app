import styled from 'styled-components/native'

export const EmailInput = styled.TextInput`
background-color: white;
width: 280px;
margin-bottom:${props => props.hasError ? '0px': '10px'};
border-radius: 20px;
padding-vertical: 13px;
padding-horizontal: 15px;
height: 45px;
border-width:${props => props.hasError ? '1.5px' : '0px'};
border-color: ${props => props.hasError ? 'red' : 'transparent'};
`;

export const ErrorMessage = styled.Text({
    color:'red',
    marginBottom:'5px'
})

export const PasswordInput = styled.TextInput`
background-color: white;
width: 280px;
border-radius: 20px;
padding-vertical: 13px;
padding-horizontal: 15px;
height: 45px;
border-width : ${props => props.hasError ? '1.5px' : '0px'};
border-color: ${props => props.hasError ? 'red' : 'tranparent'};
`;

export const LoginButton = styled.TouchableOpacity`
width: 280px;
height: 50px;
background-color: #aaf5c6;
margin-top: 20px;
border-radius: 20px;
justify-content: center;
`;

export const LoginText = styled.Text`
text-align: center;
color: white;
font-size:18px;
`;

export const Or = styled.Text`
color:white;
font-size: 16px;
margin-top:10px;
`;

export const CreateAccText = styled.Text`
color:white;
font-size:16px;
`;

export const BackgroundImage = styled.ImageBackground`
flex: 1;
justify-content: center;
align-items: center;
`;

export const SafeArea = styled.SafeAreaView`
flex: 1;
height: 100%;
width: 100%
`;
