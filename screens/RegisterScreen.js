import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from "../services/firebaseAuth";

export default function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Clear the form upon successful registration
                navigation.navigate('Dashboard')
                setEmail('');
                setPassword('');
                setError(null);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });
    }

    const goToLogin = ()=>{
        navigation.navigate('Login')
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Register</Text>
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
            <Button title="Register" onPress={handleRegister} />
            {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
            <Text onPress={goToLogin} style={{ marginVertical: 10 }}>Already have an account? Login here</Text>
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
