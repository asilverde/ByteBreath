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
        width: "80%",
        height: "30%",
        left: 50,
        top: 120,

        display: 'flex',
        justifyContent: 'center',
        color: "#000000"
    },
    titleText: {
        paddingTop: 30,
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 80,
        lineHeight: 70,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    bodyBox: {
        boxSizing: "border-box",

        position: "absolute",
        width: "75%",
        height: "50%",
        left: 50,
        top: 310,

        color: "#D9D9D9"
    },
    bodyText: {
        position: "absolute",
        left: "10%",
        right: "15%",
        top: "5%",
        bottom: "10%",
        paddingTop: 10,

        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 36,
        lineHeight: 38,
        /* or 125% */
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        letterSpacing: "0.5em"

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
        width: 100,
        height: 50,
        left: 50,
        top: 160,

        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 30,
        lineHeight: 60,
        /* identical to box height, or 200% */
        display: "flex",

        color: "#999999"
    },
    settingsCurrent: {
        /* style */

        position: "absolute",
        width: 100,
        height: 60,
        left: 250,
        top: 160,

        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: 20,
        lineHeight: 60,
        /* identical to box height, or 200% */
        display: "flex",

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
        top: 210,

        backgroundColor: "#999999",
    }
});