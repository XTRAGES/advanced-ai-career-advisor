import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Creator Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
              <span className="text-gray-300">{t('footer.madeWith')}</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-gray-300">{t('footer.by')}</span>
              <span className="font-bold text-white">Aldin Zendeli</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <a 
                href="mailto:aldinzendeli33@gmail.com" 
                className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
              >
                aldinzendeli33@gmail.com
              </a>
            </div>
          </div>

          {/* Application Info */}
          <div className="text-center">
            <h3 className="font-bold text-white mb-3">{t('footer.aboutApp')}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.appDescription')}
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-400">Professional</div>
                <div className="text-xs text-gray-500">{t('footer.grade')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-400">3</div>
                <div className="text-xs text-gray-500">{t('footer.languages')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">Advanced</div>
                <div className="text-xs text-gray-500">{t('footer.analysis')}</div>
              </div>
            </div>
          </div>

          {/* Contact & Project Info */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-white mb-3">{t('footer.connect')}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.connectDescription')}
            </p>
            <div className="flex items-center justify-center md:justify-end">
              <a 
                href="mailto:aldinzendeli33@gmail.com"
                className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center transition-colors group"
                title="Email"
              >
                <Mail className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="text-center">
            <div className="text-sm text-gray-400">
              © 2025 Advanced Career Advisor • Aldin Zendeli • All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};