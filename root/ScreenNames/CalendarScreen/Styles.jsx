import styled from 'styled-components/native'

export const LoadingModal = styled.View({
    flex:1,
    backgroundColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
})

export const CalendarHeader = styled.View({
    paddingTop:15,
    paddingHorizontal:20,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
})

export const CalendarHeaderText = styled.Text({
    fontSize:26,
    fontWeight:'bold',
    color:'#86e371'
})

export const LogoutButton = styled.TouchableOpacity({
    paddingVertical:8,
})

export const LogoutButtonText = styled.Text({
    color:'#86e371',
    fontSize: 16,
    fontWeight:'bold',
})


export const CalendarContainer = styled.View({
    flex:1,
    paddingTop:30,
    paddingHorizontal:25,
    backgroundColor:'#fff',
})

export const DayContainer = styled.TouchableOpacity({
    width: 32,
    height: 'auto', 
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
    paddingBottom: 2,
})

export const DayText = styled.Text(props => ({
    fontSize: 14,
    textAlign: 'center',
    color: '#000',

    ...(props.isMarked && {
        color: '#5cde1b',
        fontWeight: 'bold',
    }),

    ...(!props.isCurrentMonth && {
        color: '#BBBBBB',
    }),

    ...(props.isSelected && {
    color: '#fff',
    backgroundColor: '#5cde1b',
    borderRadius: 12,
    overflow: 'hidden',
    width: 25,
    height: 25,
    textAlign: 'center',
    lineHeight: '24px',
    }),
}))

export const EventText = styled.Text({
    fontSize: 7, // Make it smaller to fit
    color: '#777',
    width: 32,
    textAlign: 'center',
    marginTop: 1,
})

export const MoreEventText = styled.Text({
    fontSize: 6,
    color: '#888',
    fontStyle: 'italic',
})