import { useEffect, useRef } from 'react';
import { Animated, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';


export const TutorNotification = ({ setTutorNotify }) => {
    const translateY = useRef(new Animated.Value(0)).current
    const translateX = useRef(new Animated.Value(0)).current

    const dispath = useDispatch()

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
        }).start()
    }, [translateY, setTutorNotify])

    const closeNotify = () => {
        Animated.timing(translateY, {
            toValue: -300,
            duration: 600,
            useNativeDriver: true,
        }).start(() => dispath(setTutorNotify(true)))
    }


    return (
        <Animated.View style={[
            styles.notifyCont,
            {
                transform: [
                    { translateY },
                    { scaleX: translateX }
                ]
            }]}>
            <View>
                <Text style={{ fontSize: Platform.OS === 'android' ? 16 : 18, fontWeight: '500', color: '#59697A' }}>
                    Swipe left to access the settings.
                    Hold your finger on the text to copy it.
                </Text>
            </View>
            <View style={{ width: '100%', backgroundColor: '#ECECEC', height: 3, borderRadius: 10 }} />
            <View style={{ gap: 5 }}>
                <Text style={{ fontSize: Platform.OS === 'android' ? 16 : 18, fontWeight: '500', color: '#59697A' }}>
                    Проведите пальцем влево, чтобы попасть в настройки.
                    Удерживайте палец на тексте, чтобы скопировать его.
                </Text>
            </View>
            <TouchableOpacity
                onPress={closeNotify}
                style={styles.btnOk}>
                <Text style={styles.titleOk}>Get it</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    notifyCont: {
        backgroundColor: 'white',
        width: '90%',
        paddingHorizontal: 18,
        paddingVertical: 18,
        borderRadius: 15,
        justifyContent: 'center',
        shadowColor: Platform.OS === 'android' ? 'black' : '#C0C1C4',
        elevation: 55,
        shadowOffset: { height: 6 },
        shadowOpacity: 0.8,
        position: 'absolute',
        zIndex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 0,
        gap: 10
    },
    btnOk: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        width: 200,
        height: 40,
        borderRadius: 15
    },
    titleOk: {
        color: '#59697A',
        fontSize: Platform.OS === 'android' ? 15.5 : 16.5,
        fontWeight: '500'
    }
})
