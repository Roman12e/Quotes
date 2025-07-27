import { useEffect, useRef } from 'react';
import { Animated, Platform, StatusBar, StyleSheet, Text } from 'react-native';


export const Notifications = ({ setNotify, notify }) => {
    const translateY = useRef(new Animated.Value(0)).current
    const translateX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
        }).start()

        const timer = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: -100,
                duration: 600,
                useNativeDriver: true,
            }).start(() => setNotify([false, '']))
        }, 1500)
        return () => clearTimeout(timer)
    }, [translateY, setNotify])


    return (
        <Animated.View style={[
            styles.notifyCont,
            {
                transform: [
                    { translateY },
                    { scaleX: translateX }
                ]
            }]}>
            <Text style={{ fontSize: Platform.OS === 'android' ? 16 : 18, fontWeight: '500', color: '#59697A' }}>{notify[1]}</Text>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    notifyCont: {
        backgroundColor: 'white',
        width: '90%',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Platform.OS === 'android' ? 'black' : '#C0C1C4',
        elevation: 55,
        shadowOffset: { height: 6 },
        shadowOpacity: 0.8,
        position: 'absolute',
        zIndex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 0
    }
})
