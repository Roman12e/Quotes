import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { setLanguage, setSpeed, setTheme } from '../storeRedux/store';


export const useSettings = () => {
    const speed = useSelector(state => state.speed)
    const theme = useSelector(state => state.theme)
    const language = useSelector(state => state.language)

    useEffect(() => {
        const fetchDataSettings = async () => {
            const lang = await AsyncStorage.getItem('selectedLang')
            const speed = await AsyncStorage.getItem('selectedSpeed')
            const theme = await AsyncStorage.getItem('selectedTheme')
            setLanguage(lang)
            setSpeed(speed)
            setTheme(theme)
        }
        fetchDataSettings()
    }, [])

    const value = useMemo(() => ({ language, speed, theme }), [language, speed, theme])
    return value
}
