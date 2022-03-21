
import i18next from 'i18next';
import FilesystemBackend from 'i18next-fs-backend';
import middleware  from 'i18next-http-middleware';

i18next
    .use(middleware.LanguageDetector)
    .use(FilesystemBackend)
    .init({
        backend: {
            loadPath: '@locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: 'en',
        preload: ['en', 'fa']
    });

const i18nextMiddleware = middleware.handle(i18next)

export default i18nextMiddleware
