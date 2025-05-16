import styled from 'styled-components/native'

export const Button = styled.TouchableOpacity({
    backgroundColor:'#86e371',
    alignItems:'center',
    borderRadius:'20px',
    paddingVertical:'15px',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: '0.2px',
    shadowRadius: '4px',
    elevation: '5px',
})

export const ButtonText = styled.Text({
    color:'white',
    fontSize:14,
    fontWeight:'700'
})