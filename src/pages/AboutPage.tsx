import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <main className="bg-white text-black">
      <div className="section-container pt-12 pb-16">
        <SectionHeader primaryText={t('aboutPage.title')} />
        
        <div className={`mt-8 space-y-12 ${isArabic ? 'text-right' : 'text-left'}`}>
            <section className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed">
                    {t('aboutPage.description')}
                </p>
            </section>
            
            <section className="grid md:grid-cols-2 gap-8">
                <div className="bg-[#F6F3F2] p-8 rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-[#6d2c13]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#6d2c13]">
                        {t('aboutPage.mission_title')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {t('aboutPage.mission_text')}
                    </p>
                </div>
                
                <div className="bg-[#F6F3F2] p-8 rounded-xl hover:shadow-md transition-shadow">
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-[#6d2c13]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#6d2c13]">
                        {t('aboutPage.vision_title')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {t('aboutPage.vision_text')}
                    </p>
                </div>
            </section>
        </div>
      </div>
    </main>
  );
}
