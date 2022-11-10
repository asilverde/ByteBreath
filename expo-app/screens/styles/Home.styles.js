import { StyleSheet } from 'react-native';
import {scale, verticalScale, moderateScale} from "../../utils/Scaling"

const styles = StyleSheet.create({
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
        fontSize: moderateScale(70),
        lineHeight: moderateScale(70),
        paddingTop: "10%",
    },
    body: {
        width: "45%",
        height: "40%",
        justifyContent: 'center',
    },
    bodyText: {
        fontSize: moderateScale(32),
        lineHeight: moderateScale(40),
    },
    begin: {
        width: "60%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#000000",
        borderRadius: 38,
    },
    beginText: {
        fontSize: moderateScale(40),
        lineHeight: moderateScale(60),
        letterSpacing: 2,
        color: "white"
    },
    demo: {
        width: "50%", 
        alignItems: "center"
    },
    demoText: {
        fontSize: moderateScale(18),
        lineHeight: moderateScale(40),
        color: "gray"
    },
    line: {
        width: "75%",
        height: moderateScale(14),
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: "black",
    },
    dot: {
        width: moderateScale(14),
        height: moderateScale(14),

        backgroundColor: "black",
        borderRadius: 50
    },
});

export default styles;