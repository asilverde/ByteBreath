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
    horizontalLine: {
        height: '2%',
        width: '65%',
        borderRadius: 40,
        backgroundColor: "white"
    },
    verticalLine: {
        height: '62%',
        width: '4%',
        borderRadius: 40,
        backgroundColor: "white"
    },
    command: {
        position: "absolute",
        width: 100,
        height: 50,
        left: 70,
        top: 40
    },
    score: {
        position: "absolute",
        width: 100,
        height: 50,
        left: 260,
        top: 40,
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
