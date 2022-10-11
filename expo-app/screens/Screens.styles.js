import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        backgroundColor: "#E5E5E5",
        height: '10%',
        width: '100%',
        backgroundColor: "blue"
    },
    container: {
        backgroundColor: "#E5E5E5",
        height: '100%',
        width: '100%'
    },
    row: {
        boxSizing: "border-box",

        position: "absolute",
        width: 250,
        height: 100,
        left: 50,
        top: 200,

        flexDirection:"row",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    row2: {
        boxSizing: "border-box",

        position: "absolute",
        width: 250,
        height: 100,
        left: 50,
        top: 400,

        flexDirection:"row",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    titleBox: {
        position: "absolute",
        width: 383,
        height: 150,
        left: 51,
        top: 152,

        display: 'flex',
        justifyContent: 'center',
        color: "#000000"
    },
    titleText: {
        paddingTop: 20,
        width: 383,
        height: 150,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 80,
        lineHeight: 60,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    bodyBox: {
        boxSizing: "border-box",

        position: "absolute",
        width: 280,
        height: 300,
        left: 51,
        top: 310,

        background: "#D9D9D9"
    },
    bodyText: {
        position: "absolute",
        left: 26,
        right: 45,
        top: 36,
        bottom: 36,

        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 40,
        lineHeight: 40,
        /* or 125% */
        display: "flex",
        alignItems: "center",
        letterSpacing: 1,
        transform: [{ translateY: -30 }],
        color: "#000000"

    },
    beginButton: {
        position: "absolute",
        width: 180, 
        height: 65,
        left: 51,
        top: 550,

        backgroundColor: "#000000",
        borderRadius: 38
    },
    beginText: {
        /* begin */
        position: "absolute",

        width: 161,
        height: 60,
        left: 40,
        top: -5,

        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 40,
        lineHeight: 70,
        /* or 175% */
        display: "flex",
        alignItems: "center",
        letterSpacing: 1,

        color: "white"

    },
    settingsHeader: {
        position: "absolute",
        width: 379,
        height: 70,
        left: 40,
        top: 70,

        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 50,
        lineHeight: 70,
        /* identical to box height, or 140% */
        display: "flex",
        alignItems: "center",

        color: "#000000",

        border: "1px solid #000000"
    },
    settingsStyle: {
        /* style */

        position: "absolute",
        width: 83,
        height: 60,
        left: 50,
        top: 162,

        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 30,
        lineHeight: 60,
        /* identical to box height, or 200% */
        display: "flex",
        alignItems: "center",

        color: "#999999"
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
        width:60,
        height:60,
        borderColor: "black",
        borderWidth: 1,
    },
    rectangle1: {
        position: "absolute",
        width: 300,
        height: 13,
        left: 0,
        top: 140,

        backgroundColor: "#999999"
    },
    line1: {
        position: "absolute",
        width: 310,
        height: 3,
        left: 30,
        top: 290,

        backgroundColor: "#999999",
    }
});