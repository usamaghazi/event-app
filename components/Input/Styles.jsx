import styled from 'styled-components/native'

export const Label = styled.Text({
    fontWeight: 'bold', 
    marginTop: '12px'
})



export const InputText = styled.TextInput(props=>({
    borderWidth: '1px', 
    borderColor: '#ccc', 
    padding: '8px', 
    borderRadius: '6px', 
    marginTop: '4px', 
    paddingTop: '12px',
    paddingBottom:'12px',
    paddingLeft:'10px',
    marginTop:'8px',

    ...(props.isInValid && {
        borderColor:'red'
    })
}))

// export const TexInput = styled.TextInput(props=>{
//     let styles = {
//     borderWidth: 1, 
//     borderColor: '#ccc', 
//     padding: 8, 
//     borderRadius: 6,  
//     paddingVertical: 12,
//     paddingLeft:10,
//     marginTop:8
//     }
//     if(props.isInValid){
//         styles.borderColor = 'red'
//     }

//     return styles
// })