import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        flexDirection:"column",
        justifyContent:'space-around',
        padding: 40
    },
    header: {
        backgroundColor: 'black',
        flexDirection:"row",
        justifyContent:'space-around'
    },
    row: {
        fontSize: 20,
        textAlign: "center",
        height: "15%"
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    text: {
        fontSize: 20,
        width: "60%",
        textAlign: "center",
        color: "white"
    },
    button: {
        width:100,
        height:50,
        alignItems: "center",
        backgroundColor: "#eb9e21",
        borderRadius: 25,
        padding: 10
    }
});