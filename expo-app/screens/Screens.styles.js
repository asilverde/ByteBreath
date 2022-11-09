import { StyleSheet } from 'react-native';

const makeStyles = fontScale => StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        height: "90%",
        width: "100%",
        alignItems: "center",
    },
    row: {
        backgroundColor: "#E5E5E5",
        height: "5%",
        width: "100%",
        flexDirection:"row",
        justifyContent: 'flex-end',
        alignItems: "center",
    },
    partition: {
        flexDirection:"row", 
        justifyContent: 'space-evenly',
        alignItems: "flex-start",
    },
    title: {
        width: "75%",
        height: "30%",
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 70 / fontScale,
        lineHeight: 70 / fontScale,
        paddingTop: "10%",
    },
    body: {
        width: "50%",
        height: "40%",
        justifyContent: 'center',
    },
    bodyText: {
        fontSize: 32 / fontScale,
        lineHeight: 40 / fontScale,
    },
    begin: {
        width: "60%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#000000",
        borderRadius: 38,
    },
    beginText: {
        fontSize: 40 / fontScale,
        lineHeight:60 / fontScale,
        letterSpacing: 2,
        color: "white"
    },
    demo: {
        width: "50%", 
        alignItems: "center"
    },
    demoText: {
        fontSize: 18 / fontScale,
        lineHeight: 40 / fontScale,
        color: "gray"
    },
    line: {
        width: "75%",
        height: 15 / fontScale,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: "black",
    },
    dot: {
        width: 15 / fontScale,
        height: 15 / fontScale,

        backgroundColor: "black",
        borderRadius: 50
    },
    aboutHeader: {
        width: "85%",
        height: "8%",
        justifyContent: 'flex-start',
        paddingTop: "5%"
    },
    aboutHeaderText: {
        fontSize: 40 / fontScale,
        lineHeight: 40 / fontScale,
        fontFamily: "PoppinsSemiBold"
    },
    aboutText: {
        height: "15%",
        width: "85%",
        fontFamily: "PoppinsRegular",
        fontSize: 18 / fontScale,
        lineHeight: 25 / fontScale
    },
});

export default makeStyles;