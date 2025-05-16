import styled from 'styled-components/native'

export const EventHeaderContainer = styled.View`
    padding-top:15px;
    padding-horizontal:20px;
    background-color:#fff;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
 `;

 export const EventHeaderText = styled.Text({
    fontSize:26,
    fontWeight:'bold',
    color:'#86e371'
 })

 export const CreateButton = styled.TouchableOpacity({
    paddingHorizontal:12,
    paddingVertical:8,
    borderRadius:10,
    backgroundColor:'#fff',
 })

 export const ButtonText = styled.Text({
    color:'#86e371',
    fontSize: 16,
    fontWeight:'bold',
 })

 export const LogoutButton = styled.TouchableOpacity({
    paddingVertical:8,
 })

 export const NoEvent = styled.View({
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
 })

 export const  NoEventText = styled.Text({
    fontSize:26,
    fontWeight:'bold',
    color:'#e2e6e0',
    fontStyle: 'italic',
 })

 export const LoadingModal = styled.View({
    flex:1,
    backgroundColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center'
 })