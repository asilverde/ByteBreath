import { StyleSheet } from 'react-native';
import {moderateScale} from "../../utils/Scaling"

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
        justifyContent: 'space-between',
        alignItems: "flex-start",
    },
    line: {
        width: "75%",
        height: moderateScale(14),
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "black",
    },
    dot: {
        width: moderateScale(14),
        height: moderateScale(14),

        backgroundColor: "black",
        borderRadius: 50
    },
    header: {
        width: "95%",
        height: "8%",
        justifyContent: 'flex-start',
        paddingTop: "5%"
    },
    largeHeaderText: {
        fontSize: moderateScale(40),
        lineHeight: moderateScale(40),
        fontFamily: "PoppinsSemiBold"
    },
    smallHeaderText: {
        fontSize: moderateScale(25),
        lineHeight: moderateScale(40),
        fontFamily: "PoppinsSemiBold"
    },
    aboutText: {
        height: "15%",
        width: "85%",
        fontFamily: "PoppinsRegular",
        fontSize: moderateScale(18),
        lineHeight: moderateScale(30)
    },
});

export default styles;
