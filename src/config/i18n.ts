import i18next from 'i18next';
import fsBackend from 'i18next-fs-backend';

i18next.use(fsBackend).init({
  lng: 'en',
  fallbackLng: 'en',
  backend: {
    loadPath: './src/locales/{{lng}}/common.json', // diretório onde os arquivos de idioma estão localizados
  },
});

export default i18next;
