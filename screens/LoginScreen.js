import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import auth from "../services/firebaseAuth";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const checkIfLoggedIn = () => {
        onAuthStateChanged(auth, (user)=>{
            if(user) {
                navigation.navigate('Dashboard')
            }
        })
    }

    useEffect(()=>{
        checkIfLoggedIn()
    },[])

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Dashboard')
                // Clear the form upon successful registration
                setEmail('');
                setPassword('');
                setError(null);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    }

    const goToRegister = ()=>{
        navigation.navigate('Register')
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.textInput}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={styles.textInput}
            />
            <Button title="Login" onPress={handleLogin} />
            {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
            <Text onPress={goToRegister} style={{ marginVertical: 10 }}>Create have an account? Register here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: "grey",
        width: 200,
        marginVertical: 10,
        paddingHorizontal: 8,
    }
});
