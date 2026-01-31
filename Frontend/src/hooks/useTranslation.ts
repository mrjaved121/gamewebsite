import { useLanguage } from '../app/contexts/LanguageContext';

export function useTranslation() {
    const { t, language } = useLanguage();

    // The old game expects t('key', {param: 'value'}) style if possible.
    // The new t is just t(key). Let's enhance it slightly if needed, 
    // but for now, just return the existing t.

    return { t, language };
}
