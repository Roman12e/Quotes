import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from "react";
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Feather from '@expo/vector-icons/Feather';

import { setLanguage } from '@/app/src/storeRedux/store';


export const ChangeLang = React.forwardRef((props, ref) => {
    const snapPoints = useMemo(() => ['25%'], [])
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />
    )

    const dispath = useDispatch()

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
                <SafeAreaView style={{ flex: 1, gap: 20, justifyContent: 'center', paddingBottom: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                    <TouchableOpacity
                        onPress={() => dispath(setLanguage('ru'))}
                        style={styles.selectBtn}>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/russian.png')}
                                style={{ width: 34, height: 34 }}
                            />
                            <Text style={styles.selectText}>Русский</Text>
                        </View>
                        {props.usedLang === 'ru' ? <Feather name="check" size={24} color="black" /> : null}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => dispath(setLanguage('en'))}
                        style={styles.selectBtn}>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/usa.png')}
                                style={{ width: 34, height: 34 }}
                            />
                            <Text style={styles.selectText}>English U.S.</Text>
                        </View>
                        {props.usedLang === 'en' ? <Feather name="check" size={24} color="black" /> : null}
                    </TouchableOpacity>
                </SafeAreaView>
            </BottomSheetScrollView>
        </BottomSheet>
    )
})


const styles = StyleSheet.create({
    selectBtn: {
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        height: 65,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between'
    },
    selectText: {
        fontSize: Platform.OS === 'android' ? 18 : 20,
        fontWeight: '500',
        color: '#59697A'
    }
})



