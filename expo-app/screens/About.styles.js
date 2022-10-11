import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#E5E5E5",
        height: '100%',
        width: '100%'
    },
    header: {
        position: "absolute",
        width: 379,
        height: 70,
        left: 11,

        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 50,
        lineHeight: 70,
        /* identical to box height, or 140% */
        display: "flex",
        alignItems: "center",

        color: "#000000",

        border: "1px solid #000000"

    },
    textbox: {
        position: "absolute",
        width: 340,
        height: 100,
        left: 15,
        top: 189,

        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 20,
        lineHeight: 25,
        /* or 120% */
        display: "flex",
        alignItems: "center",

        color: "#000000"
    },
    rectangle1: {
        position: "absolute",
        width: 300,
        height: 13,
        left: 0,
        top: 140,

        backgroundColor: "#999999"
    },
    ellipse1: {
        position: "absolute",
        width: 13,
        height: 13,
        left: 310,
        top: 140,

        backgroundColor: "#999999",
        borderRadius: 50
    }
});