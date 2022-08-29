import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        flex: 1,
        maxHeight: "15%",
        width: "100%",
        backgroundColor: 'black',
        flexDirection:"row",
        alignItems: 'center',
        justifyContent:'flex-end',
    },
    container: {
        flex: 2,
        backgroundColor: 'black',
        alignItems: 'center',
        flexDirection:"column"
    },
    row: {
        flex: 1,
        maxHeight: "15%",
        width: "100%",
        backgroundColor: 'white',
        flexDirection:"row",
        alignItems: 'center'
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
        justifyContent: "center",
        backgroundColor: "#eb9e21",
        borderRadius: 25,
        padding: 10
    },
    smallButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width:40,
        height:40,
        backgroundColor: "#eb9e21",
        borderRadius: 25
    }
});