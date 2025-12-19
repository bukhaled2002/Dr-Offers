import SectionHeader from '@/components/ui/SectionHeader';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="bg-white text-black min-h-screen overflow-hidden">
      <div className="section-container pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader primaryText={t('contactPage.title')} />
        </motion.div>
        
        <div className={`mt-12 grid lg:grid-cols-2 gap-16 ${isArabic ? 'text-right' : 'text-left'}`}>
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#6d2c13] mb-4">{t('contactPage.get_in_touch')}</h2>
              <p className="text-gray-600 text-lg">
                {t('contactPage.description')}
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Phone size={24} />, title: t('contactPage.phone'), content: '+966 55 446 9058', dir: 'ltr' },
                { icon: <Mail size={24} />, title: t('contactPage.email'), content: 'info@droffers.com' },
                { icon: <MapPin size={24} />, title: t('contactPage.address'), content: t('contactPage.address_text') }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className={`flex items-start gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-12 h-12 bg-[#F6F3F2] rounded-full flex items-center justify-center shrink-0 text-[#6d2c13]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600" dir={item.dir}>{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#F6F3F2] p-8 md:p-10 rounded-2xl shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('contactPage.form_name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6d2c13] focus:border-transparent transition-all outline-none"
                    placeholder={t('contactPage.form_name_placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('contactPage.form_email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6d2c13] focus:border-transparent transition-all outline-none"
                    placeholder={t('contactPage.form_email_placeholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('contactPage.form_subject')}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6d2c13] focus:border-transparent transition-all outline-none"
                  placeholder={t('contactPage.form_subject_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('contactPage.form_message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#6d2c13] focus:border-transparent transition-all outline-none resize-none"
                  placeholder={t('contactPage.form_message_placeholder')}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#6d2c13] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#5a2410] transition-colors"
              >
                <Send size={20} />
                {t('contactPage.form_submit')}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
