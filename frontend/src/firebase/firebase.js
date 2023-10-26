// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkBloK4n2_MQf68VlfCllOiCjFdUhtBxE",
  authDomain: "chat-app-6a1b0.firebaseapp.com",
  projectId: "chat-app-6a1b0",
  storageBucket: "chat-app-6a1b0.appspot.com",
  messagingSenderId: "724622925027",
  appId: "1:724622925027:web:07944714dc4d8af06539d6",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
