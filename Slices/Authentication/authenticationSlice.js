import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         updateProfile,
         signOut
 } from 'firebase/auth'
import { auth } from '../../Firebase/firebase'

export const signOutUser = createAsyncThunk('auth/signOutUser', async(_,{ rejectWithValue })=>{
try {
    await signOut(auth)
    return null
} catch (error) {
    return rejectWithValue(error.message)
}
})

export const signUp = createAsyncThunk('auth/signUpUser',async(
    {
        fullName,
        email,
        password},{ rejectWithValue})=>{
        try {
            console.log('Starting')
            const userCrediential = await createUserWithEmailAndPassword(auth,email,password)
            console.log(userCrediential)
            const user = userCrediential.user
            

           await updateProfile(user,{
                displayName: fullName
            })
            
            return {
                uuid:user.uid,
                email: user.email,
                displayName: user.displayName
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    })


export const signIn = createAsyncThunk('auth/signInUser',async(
    {
        email,
        password
    },
    { rejectWithValue }
)=>{

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // console.log('Responceeee',userCredential.user)
        const user = userCredential.user 

        return {
            uuid: user.uid,
            email: user.email,
            displayName: user.displayName
        }
    } catch (error) {
        console.log('errorrr body',error.code)
        return rejectWithValue(error.message)
    }
})



const initialState = {
    user:null,
    loading:false,
    signUperror:null,
    signInerror:null,
    signOutError:null
}

const authenticationSlice = createSlice({
    name:'authentication',
    initialState,
    reducers:{
        errNullonUmount : (state) => {
            state.signUperror = null
            state.signInerror = null
        },
        signOutComplete: (state)=> {
            state.user = null
            state.signUperror = null
            state.loading = false
            state.signInerror = null
            state.signOutError = null
        }
    },
    extraReducers: builder => {
        builder.addCase(signUp.pending, (state)=>{
            console.log('Loading')               
            state.user = null
            state.loading = true
            state.signUperror = null
            state.signInerror = null
            state.signOutError = null
        })
        .addCase(signUp.fulfilled, (state, action)=>{
            console.log('Fulfill...',action.payload)
            state.loading = false
            state.user = action.payload
            state.signUperror = null
            state.signInerror = null
            state.signOutError = null
        })
        .addCase(signUp.rejected, (state, action) => {
            console.log(action.payload)
                state.loading = false
                state.user = null
                state.signUperror = action.payload
                state.signInerror = null
                state.signOutError = null
        })
        .addCase(signIn.pending, state => {
            console.log('Loading For Sign In')
            state.loading = true
            state.user = null
            state.signUperror = null
            state.signInerror = null
            state.signOutError = null
        })
        .addCase(signIn.fulfilled, (state, action)=> {
            console.log(action.payload)
            state.loading = false
            state.user = action.payload
            state.signUperror = null
            state.signInerror = null
            state.signOutError = null
        })
        .addCase(signIn.rejected, (state, action)=> {
           console.log(action.payload) 
            state.loading = false
            state.user = null
            state.signUperror = null
            state.signInerror = action.payload
            state.signOutError = null
        })
        .addCase(signOutUser.pending, state => {
            state.loading = true
            state.user = null
            state.signInerror = null
            state.signUperror = null
            state.signOutError = null
        })
        .addCase(signOutUser.fulfilled, state => {
            state.loading = false
            state.user = null
            state.signInerror = null
            state.signUperror = null
            state.signOutError = null
        })
        .addCase(signOutUser.rejected, (state,action) => {
            state.loading = false
            state.user = null
            state.signInerror = null
            state.signUperror = null
            state.signOutError = action.payload
        })
        // .addCase(signOutUser.fulfilled, state => {
        //     state.loading = false
        //     state.user = null
        // })
        // .addCase(signOutUser.rejected , (state) => {
        //     state.loading = false
        // })
    }
})

export const { errNullonUmount,signOutComplete } = authenticationSlice.actions
export default authenticationSlice.reducer














// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   updateProfile 
// } from 'firebase/auth'
// import { auth } from '../Firebase/firebase'
// import { getFirestore, doc, setDoc } from 'firebase/firestore'

// // Async thunk for sign up
// export const signUpUser = createAsyncThunk(
//   'auth/signUpUser',
//   async ({ 
//     email, 
//     password, 
//     fullName, 
//     profilePictureUrl 
//   }: {
//     email: string, 
//     password: string, 
//     fullName: string, 
//     profilePictureUrl?: string
//   }, { rejectWithValue }) => {
//     try {
//       // Create user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth, 
//         email, 
//         password
//       );
//       const user = userCredential.user;

//       // Update profile with additional information
//       await updateProfile(user, {
//         displayName: fullName,
//         photoURL: profilePictureUrl
//       });

//       // Optional: Store additional user info in Firestore
//       const db = getFirestore();
//       await setDoc(doc(db, 'users', user.uid), {
//         uid: user.uid,
//         email: user.email,
//         displayName: fullName,
//         photoURL: profilePictureUrl,
//         createdAt: new Date()
//       });

//       // Return user information
//       return {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL
//       };
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // Async thunk for sign in
// export const signInUser = createAsyncThunk(
//   'auth/signInUser',
//   async ({ 
//     email, 
//     password 
//   }: { 
//     email: string, 
//     password: string 
//   }, { rejectWithValue }) => {
//     try {
//       // Sign in user
//       const userCredential = await signInWithEmailAndPassword(
//         auth, 
//         email, 
//         password
//       );
//       const user = userCredential.user;

//       // Return user information
//       return {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL
//       };
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // Authentication Slice
// const authenticationSlice = createSlice({
//   name: 'authentication',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     // Optional: logout reducer
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     }
//   },
//   extraReducers: (builder) => {
//     // Sign Up Reducers
//     builder.addCase(signUpUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(signUpUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     })
//     .addCase(signUpUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.user = null;
//     })
    
//     // Sign In Reducers
//     .addCase(signInUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(signInUser.fulfilled, (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     })
//     .addCase(signInUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.user = null;
//     });
//   }
// });

// export const { logout } = authenticationSlice.actions;
// export default authenticationSlice.reducer;





















// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { signUpUser, signInUser } from './authSlice';

// const AuthComponent = () => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');

//   const handleSignUp = () => {
//     dispatch(signUpUser({
//       email, 
//       password, 
//       fullName,
//       profilePictureUrl: 'optional_url_here'
//     }));
//   };

//   const handleSignIn = () => {
//     dispatch(signInUser({ email, password }));
//   };

//   // Render your form here
// };