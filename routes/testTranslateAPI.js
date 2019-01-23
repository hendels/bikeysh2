// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'bikeyshtranslati-1547455958564';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// The text to translate
// const text = 'cześć!';
// The target language
const target = 'eng';

// Translates some text into Russian
exports.translateAPI = (text, targetLanguage, translated) => {
    translate
  .translate(text, targetLanguage)
  .then(results => {
    const translation = results[0];
    console.log(`Text: ${text}`);

    return translated(translation);
  })
  .catch(err => {
    console.error('ERROR:', err);
    return 'can not translate! some error.'
  });

}