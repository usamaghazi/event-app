import styled from 'styled-components/native'

export const Container = styled.View({
      flex: 1, 
      padding: 16, 
      backgroundColor: '#fff'
})

export const Label = styled.Text({
    fontWeight: 'bold', 
    marginTop: 12 
})

export const RowContainer = styled.View({
    flexDirection:'row',
    marginTop:7
})

export const TextArea = styled.View(props=>({
    borderWidth: 1, 
    borderColor: '#ccc', 
    paddingVertical:12,
    paddingHorizontal:8,  
    marginTop: 4,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius:6, 
    width:'80%',
    borderRightWidth: 0,
    paddingLeft:10,

    ...(props.dateTimeError && {
      borderColor:'red'
    })
}))

export const Icons = styled.TouchableOpacity({
      borderWidth: '1px', 
    borderColor: '#ccc', 
    paddingVertical:12 , 
    borderTopRightRadius: '6px',
    borderBottomRightRadius:'6px', 
    marginTop: '4px',
    backgroundColor:'#999b9c',
    width:'20%',
    borderLeftWidth: '0px',
    alignItems:'center'
})

export const PickerWrapper = styled.View(props=>({
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    marginVertical: 8,
    
    ...(props.inValideEventType && {
      borderColor:'red'
    })
}))