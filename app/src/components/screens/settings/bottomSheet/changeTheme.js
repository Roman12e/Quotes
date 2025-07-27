import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';

import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';

import { i18n } from '@/app/src/i18n';

import { useSettings } from '@/app/src/hooks/useSettings';
import { setTheme } from '@/app/src/storeRedux/store';


export const ChangeTheme = React.forwardRef((props, ref) => {
    const snapPoints = useMemo(() => ['80%'], [])
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />
    )

    const { language } = useSettings()
    const dispath = useDispatch()
    const theme = useColorScheme()

    const bounceValue = useRef(new Animated.Value(0)).current

    i18n.locale = language

    useEffect(() => { dispath(setTheme(theme)) }, [theme])

    useEffect(() => {
        const startBouncing = () => {
            bounceValue.setValue(0)
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ]).start(startBouncing)
        }
        startBouncing()
    }, [])

    const translateY = bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -15],
    })

    return (
        <BottomSheet
            ref={ref}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose={true}
            backgroundStyle={{ borderRadius: 40 }}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetScrollView contentContainerStyle={{ flex: 1, gap: 20, paddingVertical: 30 }}>
                <TouchableOpacity
                    onPress={() => dispath(setTheme('light'))}
                    activeOpacity={0.8}
                    style={styles.selectBtnLight}>
                    <Fontisto name="quote-right" size={24} color="black" />
                    <Text style={styles.quoteTitle}>{i18n.t('quote')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.quoteAuthor}>{i18n.t('author')}</Text>
                        {props.usedTheme === 'light' ? <Feather name="check" size={26} color="black" style={{ alignSelf: 'flex-end' }} /> : null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => dispath(setTheme('dark'))}
                    style={styles.selectBtnDark}>
                    <Fontisto name="quote-right" size={24} color="white" />
                    <Text style={[styles.quoteTitle, { color: 'white' }]}>{i18n.t('quote')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[styles.quoteAuthor, { color: '#D1D1D1' }]}>{i18n.t('author')}</Text>
                        {props.usedTheme === 'dark' ? <Feather name="check" size={24} color="white" style={{ alignSelf: 'flex-end' }} /> : null}
                    </View>
                </TouchableOpacity>
                <Animated.Text
                    style={{
                        transform: [{ translateY: translateY }],
                        fontSize: 16,
                        color: '#C0C1C4',
                        alignSelf: 'center',
                        marginTop: 30,
                        marginBottom: 15
                    }}>
                    {i18n.t('or')}
                </Animated.Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => dispath(setTheme(theme))}
                    style={styles.systemBtn}>
                    <Text style={{ fontSize: Platform.OS === 'android' ? 15 : 16, fontWeight: '500', color: '#59697A' }}>{i18n.t('theme')[1]}</Text>
                </TouchableOpacity>
            </BottomSheetScrollView>
        </BottomSheet>
    )
})


const styles = StyleSheet.create({
    selectBtnLight: {
        padding: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
        width: '90%',
        gap: 15
    },
    selectBtnDark: {
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: 'black',
        width: '95%',
        gap: 15
    },
    selectText: {
        fontSize: 22,
        fontWeight: '500',
        color: '#59697A'
    },
    quoteTitle: {
        fontSize: Platform.OS === 'android' ? 23 : 26,
        fontWeight: '400',
        marginBottom: 5,
        textAlign: 'left',
        lineHeight: 30,
    },
    quoteAuthor: {
        fontSize: Platform.OS === 'android' ? 18 : 20,
        color: '#59697A'
    },
    systemBtn: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        width: '40%',
        gap: 10
    }
})



