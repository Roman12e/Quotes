import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Fontisto from '@expo/vector-icons/Fontisto';

import { i18n } from '@/app/src/i18n';

import { useSettings } from '@/app/src/hooks/useSettings';
import { setSpeed } from '@/app/src/storeRedux/store';


export const ChangeSpeedTyping = React.forwardRef((props, ref) => {
    const snapPoints = useMemo(() => ['50%'], [])
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />
    )

    const { language } = useSettings()
    i18n.locale = language

    const [quoteTitle, setQuoteTitle] = useState()
    const [quoteAuthor, setQuoteAuthor] = useState()
    const [isFetching, setIsFetching] = useState(false)

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    const dispath = useDispatch()

    useEffect(() => {
        setQuoteAuthor(i18n.t('author'))
        setQuoteTitle(i18n.t('quote'))
    }, [language])

    const typeQuote = async (speed) => {
        if (isFetching) return
        dispath(setSpeed(speed))
        setIsFetching(true)
        setQuoteTitle('')
        setQuoteAuthor('')

        const title = i18n.t('quote')
        const author = i18n.t('author')

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


    return (
        <BottomSheet
            ref={ref}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose={true}
            backgroundStyle={{ borderRadius: 40 }}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetScrollView contentContainerStyle={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, gap: 20, paddingVertical: 20 }}>
                    <View style={styles.quoteCont}>
                        <Fontisto name="quote-right" size={24} color="black" />
                        <Text style={styles.quoteTitle}>{quoteTitle}</Text>
                        <Text style={styles.quoteAuthor}>{quoteAuthor}</Text>
                    </View>
                    <View style={{ gap: 25, position: 'absolute', bottom: '8%', alignSelf: 'center' }}>
                        <Text
                            style={{
                                fontSize: Platform.OS === 'android' ? 15 : 16,
                                color: '#C0C1C4',
                                alignSelf: 'center'
                            }}>
                            {i18n.t('chooseSpeed')}
                        </Text>
                        <View style={{ flexDirection: 'row', gap: 10, alignSelf: 'center', paddingBottom: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                            <TouchableOpacity
                                onPress={() => typeQuote(1)}
                                style={styles.selectSpeed}>
                                <Text style={{ fontSize: 17, color: '#59697A', fontWeight: '500' }}>x1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => typeQuote(2)}
                                style={styles.selectSpeed}>
                                <Text style={{ fontSize: 17, color: '#59697A', fontWeight: '500' }}>x2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => typeQuote(3)}
                                style={styles.selectSpeed}>
                                <Text style={{ fontSize: 17, color: '#59697A', fontWeight: '500' }}>x3</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </BottomSheetScrollView>
        </BottomSheet>
    )
})


const styles = StyleSheet.create({
    quoteTitle: {
        fontSize: Platform.OS === 'android' ? 23 : 26,
        fontWeight: '400',
        marginBottom: 5,
        textAlign: 'left',
        lineHeight: 35
    },
    quoteAuthor: {
        fontSize: Platform.OS === 'android' ? 18 : 20,
        color: '#59697A'
    },
    quoteCont: {
        padding: 10,
        paddingHorizontal: 15,
        alignSelf: 'center',
        width: '90%',
        gap: 15
    },
    selectSpeed: {
        height: 45,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
})



