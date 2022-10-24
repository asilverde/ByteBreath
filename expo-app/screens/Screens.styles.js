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
        top: 290,

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
        width: "45%", 
        height: "10%",
        left: 51,
        top: 530,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        borderRadius: 38
    },
    beginText: {
        /* begin */
        position: "absolute",
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 40,
        lineHeight: 70,
        /* or 175% */
        letterSpacing: 2,
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
    },
    ellipse: {
        position: "absolute",
        width: 13,
        height: 13,

        backgroundColor: "black",
        borderRadius: 50
    },
    demoStage: {
        width: "20%",
        height: "20%",
        left: 50,
        top: 100,

        display: 'flex',
        justifyContent: 'center',
        color: "#000000"
    },
    demoVisual: {
        width: "20%",
        height: "20%",
        left: 75,
        top: 300,

        display: 'flex',
        justifyContent: 'center',
        color: "#000000"
    },
    demoEllipse: {
        position: "absolute",
        width: 40,
        height: 40,
        top: 0,

        backgroundColor: "white",
        borderRadius: 50,
        borderColor: "black",
        borderWidth: 2
    },
    demoTextBox: {
        position: "absolute",
        width: "50%", 
        height: "10%",
        left: 85,
        top: 580,
    },
    demoText: {
        /* begin */

        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 60,
        /* or 175% */
        color: "gray"

    },
});