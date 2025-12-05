import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useRef } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useSettings } from '@/app/src/hooks/useSettings';
import { i18n } from '@/app/src/i18n';

import { ChangeLang } from './bottomSheet/changeLang';
import { ChangeSpeedTyping } from './bottomSheet/changeSpeed';
import { ChangeTheme } from './bottomSheet/changeTheme';



const SettingsScreen = () => {
    const { language, speed, theme } = useSettings()
    i18n.locale = language

    const bottomSheetSpeed = useRef(null)
    const bottomSheetTheme = useRef(null)
    const bottomSheetLang = useRef(null)

    const openSpeed = () => bottomSheetSpeed.current?.expand()
    const openTheme = () => bottomSheetTheme.current?.expand()
    const openLang = () => bottomSheetLang.current?.expand()

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: theme === 'light' ? 'white' : 'black',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}>
            <View style={{ flex: 1, paddingHorizontal: '5%', marginTop: '10%' }}>
                <Text style={theme === 'light' ? styles.headerNameLight : styles.headerNameDark}>{i18n.t('settings')}</Text>
                <View style={{ marginTop: '8%', gap: 15 }}>
                    <TouchableOpacity
                        onPress={openLang}
                        style={styles.utilsContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            <View style={styles.square}>
                                <Ionicons name="language" size={24} color="#7C8EA2" />
                            </View>
                            <Text style={theme === 'light' ? styles.utilsTitleLight : styles.utilsTitleDark}>{i18n.t('language')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Text style={theme === 'light' ? styles.selectedUtilsLight : styles.selectedUtilsDark}>
                                {language === 'en' ? 'English U.S.' : 'Русский'}
                            </Text>
                            <FontAwesome6 name="chevron-right" size={18} color="#C0C1C4" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openTheme}
                        style={styles.utilsContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            <View style={styles.square}>
                                <MaterialCommunityIcons name="palette-outline" size={26} color="#7C8EA2" />
                            </View>
                            <Text style={theme === 'light' ? styles.utilsTitleLight : styles.utilsTitleDark}>{i18n.t('theme')[0]}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Text style={theme === 'light' ? styles.selectedUtilsLight : styles.selectedUtilsDark}>{i18n.t(theme)}</Text>
                            <FontAwesome6 name="chevron-right" size={18} color="#C0C1C4" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={openSpeed}
                        style={styles.utilsContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                            <View style={styles.square}>
                                <MaterialIcons name="speed" size={26} color="#7C8EA2" />
                            </View>
                            <Text style={theme === 'light' ? styles.utilsTitleLight : styles.utilsTitleDark}>{i18n.t('typing')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <Text style={theme === 'light' ? styles.selectedUtilsLight : styles.selectedUtilsDark}>x{speed}</Text>
                            <FontAwesome6 name="chevron-right" size={18} color="#C0C1C4" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ChangeSpeedTyping ref={bottomSheetSpeed} usedSpeed={speed} theme={theme} />
            <ChangeTheme ref={bottomSheetTheme} usedTheme={theme} theme={theme} />
            <ChangeLang ref={bottomSheetLang} usedLang={language} theme={theme} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    headerNameLight: {
        fontSize: 32,
        fontWeight: '600'
    },
    headerNameDark: {
        fontSize: 32,
        fontWeight: '600',
        color: 'white'
    },
    square: {
        width: 45,
        height: 45,
        backgroundColor: '#faf8f8ff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    utilsTitleLight: {
        fontSize: Platform.OS === 'android' ? 17 : 18.5,
        fontWeight: '500'
    },
    utilsTitleDark: {
        fontSize: Platform.OS === 'android' ? 17 : 18.5,
        fontWeight: '500',
        color: 'white'
    },
    utilsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    selectedUtilsLight: {
        fontSize: Platform.OS === 'android' ? 16 : 17,
        color: '#59697A',
        fontWeight: '500'
    },
    selectedUtilsDark: {
        fontSize: Platform.OS === 'android' ? 16 : 17,
        color: '#D1D1D1',
        fontWeight: '500'
    }
})


export default SettingsScreen;