import { StyleSheet } from 'react-native';
import space from "../assets/backgrounds/space.jpg";

export default StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    track: {
        height: '3%',
        width: '80%',
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    command: {
        position: "absolute",
        width: 100,
        height: 50,
        left: 50,
        top: 30
    },
    score: {
        position: "absolute",
        width: 100,
        height: 50,
        left: 300,
        top: 30,
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
        color: '#777777'
    },
    button: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    touch: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 5
    }
});
