import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    track: {
        height: '3%',
        width: '80%',
        borderRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 100,
        color: 'white'
    },
    button: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    touch: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: "white",
        borderWidth: 5
    }
});
