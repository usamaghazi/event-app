import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    events:[],
    editIndex:null,
    // events:[{
    //     id: new Date().toString(),
    //     name:'Bilal',
    //     description: 'Meeting of Project',
    //     dateTime: new Date().toLocaleString(),
    //     documentUri:"file:///data/user/0/host.exp.exponent/cache/DocumentPicker/93b16d9d-81cd-476e-90cd-a0fcd62fbf58.pdf",
    //     eventType: 'Meeting'
    // },
    // {
    //     id: new Date().toString(),
    //     name:'Usman',
    //     description: 'Arrangment of Swimming Gala',
    //     dateTime: new Date().toLocaleString(),
    //     documentUri:"file:///data/user/0/host.exp.exponent/cache/DocumentPicker/93b16d9d-81cd-476e-90cd-a0fcd62fbf58.pdf",
    //     eventType: 'Swimming Gala'
    // },
    // {
    //     id: new Date().toString(),
    //     name:'Haris',
    //     description: 'Walima at Taj Marquee',
    //     dateTime: new Date().toLocaleString(),
    //     documentUri:"file:///data/user/0/host.exp.exponent/cache/DocumentPicker/93b16d9d-81cd-476e-90cd-a0fcd62fbf58.pdf",
    //     eventType: 'Marriage'
    // }],
    loading: false
}

const eventSlice = createSlice({
    name:'event',
    initialState,
    reducers:{
        addEvent:(state, action) => {
                state.events.push(action.payload)
        },
        selectedEditIndex:(state,action) => {
            state.editIndex = action.payload
        },
        selectedDeleteIndex:(state,action) => {
            state.deleteIndex = action.payload
            console.log('Delete Index-----', state.deleteIndex)
        },
        editEvent: (state,action) => {
            state.events[state.editIndex] = action.payload
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter(item=>{
                return action.payload !== item.id
            })   
        }
    }
})

export const { addEvent,selectedEditIndex, editEvent, deleteEvent } = eventSlice.actions
export default eventSlice.reducer