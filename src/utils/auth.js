import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import { clearUser, setUser } from '../redux/usersSlice'

export const handleGoogleSignIn = async dispatch => {
  try {
    const result = await signInWithPopup(auth, googleProvider)

    dispatch(
      setUser({
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        emailVerified: result.user.emailVerified,
        photoURL: result.user.photoURL,
        providerId: result.user.providerId
      })
    )

    console.log('User signed in:', result.user)
  } catch (error) {
    console.error('Error during sign-in:', error)
  }
}

export const handleSignOut = async dispatch => {
  try {
    await signOut(auth)
    dispatch(clearUser())
    console.log('User signed out')
  } catch (error) {
    console.error('Error during sign-out:', error)
  }
}

// export const handleFacebookLogin = async () => {
//   try {
//     // Trigger the Facebook login popup
//     const result = await signInWithPopup(auth, facebookProvider)

//     // Get the Facebook Access Token
//     const credential = facebookProvider.credentialFromResult(result)
//     const token = credential.accessToken

//     // Get the logged-in user's info
//     const user = result.user

//     // Log user and token for debugging purposes
//     console.log('User Info: ', user)
//     console.log('Token: ', token)
//   } catch (error) {
//     // Handle Errors here.
//     console.error('Error during login: ', error)
//   }
// }
