import Fontisto from '@expo/vector-icons/Fontisto';
import { setStringAsync } from 'expo-clipboard';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { useSettings } from '@/app/src/hooks/useSettings';

import { i18n } from '../../../i18n';
import { Notifications } from '../../ui/notifications';
import { TutorNotification } from '../../ui/tutorial';

import { setIsRegister } from '@/app/src/storeRedux/store';
import { quotesEn } from '../../../../data/quotesEn';
import { quotesRu } from '../../../../data/quotesRu';


const QuoteScreen = () => {
    const [quoteTitle, setQuoteTitle] = useState('')
    const [quoteAuthor, setQuoteAuthor] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [notify, setNotify] = useState([false, ''])

    const isRegister = useSelector(state => state.isRegister)

    const bounceValue = useRef(new Animated.Value(0)).current
    const { language, speed, theme } = useSettings()

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    i18n.locale = language

    useEffect(() => { getRandomQuote() }, [])

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

    const getRandomQuote = async () => {
        if (isFetching) return
        setIsFetching(true)
        setQuoteTitle('')
        setQuoteAuthor('')

        const randomNum = Math.floor(Math.random() * quotesEn.length)
        const quoteData = language === 'en' ? quotesEn[randomNum] : quotesRu[randomNum]
        const title = quoteData.quoteText
        const author = quoteData.quoteAuthor ? quoteData.quoteAuthor : (language === 'en' ? 'Wise man' : 'Мудрый человек')

        for (let index = 0; index < title.length; index++) {
            await delay(50 / speed)
            setQuoteTitle(prev => prev + title[index])
        }

        for (let index = 0; index < author.length; index++) {
            await delay(50 / speed)
            setQuoteAuthor(prev => prev + author[index])
        }
        setIsFetching(false)
    }

    const onCopy = async () => {
        await setStringAsync(quoteTitle + '\n' + '- ' + quoteAuthor)
        if (!notify[0]) {
            setNotify([true, i18n.t('notify')])
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme === 'light' ? 'white' : 'black',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}>
            {notify[0] && <Notifications setNotify={setNotify} notify={notify} />}
            {isRegister ? null : <TutorNotification setTutorNotify={setIsRegister} tutorNotify={isRegister} />}
            <View style={{ flex: 1, width: '90%' }}>
                <View style={{ marginTop: '20%' }}>
                    <Fontisto name="quote-right" size={32} color={theme === 'light' ? "black" : 'white'} />
                    <Pressable onLongPress={onCopy} style={{ marginTop: '5%' }}>
                        <Text
                            style={theme === 'light' ? styles.quoteTitleLight : styles.quoteTitleDark}>
                            {quoteTitle}
                        </Text>
                        <Text
                            style={theme === 'light' ? styles.quoteAuthorLight : styles.quoteAuthorDark}>
                            {quoteAuthor}
                        </Text>
                    </Pressable>
                </View>
                <View
                    onTouchStart={getRandomQuote}
                    style={styles.touchArea}>
                    <Animated.Text
                        style={{
                            transform: [{ translateY: translateY }],
                            fontSize: 16,
                            color: '#C0C1C4'
                        }}>
                        {i18n.t('tap')}
                    </Animated.Text>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    quoteTitleLight: {
        fontSize: Platform.OS === 'android' ? 28 : 30,
        fontWeight: '400',
        marginBottom: 15,
        textAlign: 'left',
        lineHeight: Platform.OS === 'android' ? 40 : 45
    },
    quoteAuthorLight: {
        fontSize: Platform.OS === 'android' ? 20 : 22,
        color: '#59697A'
    },
    quoteTitleDark: {
        fontSize: Platform.OS === 'android' ? 28 : 30,
        fontWeight: '400',
        marginBottom: 15,
        color: 'white',
        textAlign: 'left',
        lineHeight: Platform.OS === 'android' ? 40 : 45
    },
    quoteAuthorDark: {
        fontSize: Platform.OS === 'android' ? 20 : 22,
        color: '#D1D1D1'
    },
    touchArea: {
        position: 'absolute',
        bottom: '10%',
        width: '85%',
        height: '20%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center'
    }
})

export default QuoteScreen;
