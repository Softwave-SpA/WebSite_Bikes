import ReCAPTCHA from 'react-google-recaptcha';

const MyForm = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = async () => {
    if (!captchaValue) {
      alert('Por favor, completa el reCAPTCHA');
      return;
    }

    try {
      await axios.post('/server/mail/send', { cart, captcha: captchaValue });
      alert('Correo enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  return (
    <form>
      <ReCAPTCHA
        sitekey="TU_SITE_KEY"
        onChange={(value) => setCaptchaValue(value)}
      />
      <button onClick={handleSubmit}>Enviar</button>
    </form>
  );
};

export default MyForm;