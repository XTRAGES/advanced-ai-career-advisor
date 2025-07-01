import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const getLanguageLabel = () => {
    switch (i18n.language) {
      case 'sq': return 'Gjuhët';
      case 'de': return 'Sprachen';
      default: return 'Languages';
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-lg border border-indigo-500">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {getLanguageLabel()}
        </span>
        <span className="text-sm">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
        </span>
        <ChevronDown className="w-3 h-3" />
      </button>
      
      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
              i18n.language === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
            {i18n.language === language.code && (
              <span className="ml-auto text-blue-500 font-bold">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};