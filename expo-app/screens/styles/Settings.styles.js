import { StyleSheet } from 'react-native';
import {scale, verticalScale, moderateScale, baseHeight, baseWidth} from "../../utils/Scaling"

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
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    partition: {
        flexDirection:"row", 
        justifyContent: 'space-between',
        alignItems: "flex-end",
    },
    header: {
        width: "85%",
        height: "8%",
        justifyContent: 'flex-start',
        paddingTop: moderateScale(10)
    },
    headerText: {
        fontSize: moderateScale(40),
        lineHeight: moderateScale(40),
        fontFamily: "PoppinsSemiBold"
    },
    settingTitle: {
        width: "70%",
        fontSize: moderateScale(30),
        lineHeight: moderateScale(60),
        fontFamily: "PoppinsMedium"
    },
    currentDisplay: {
        fontSize: moderateScale(15),
        fontFamily: "PoppinsRegular"
    },
    settingsRow: {
        width: "80%",
        height: "100%",
        flexDirection:"row",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    optionButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: moderateScale(60),
        height: moderateScale(60),
        borderColor: "black",
        borderWidth: 0.5,
    },
    line: {
        width: "75%",
        height: moderateScale(13),
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "black",
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
    dot: {
        width: moderateScale(13),
        height: moderateScale(13),

        backgroundColor: "black",
        borderRadius: 50
    },
})

export default styles;