import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { View } from 'react-native';
import { SITE_KEY } from './constants';

const cleanGstaticRecaptchaScript = () => {
  const script = document.querySelector(
    'script[src^="https://www.gstatic.com/recaptcha/releases"]'
  );

  if (script) {
    script.remove();
  }
};

const removeDefaultBadge = () => {
  const nodeBadge = document.querySelector('.grecaptcha-badge');
  if (nodeBadge && nodeBadge.parentNode) {
    document.body.removeChild(nodeBadge.parentNode);
  }
};

const cleanCustomBadge = (customBadge) => {
  if (!customBadge) {
    return;
  }

  while (customBadge.lastChild) {
    customBadge.lastChild.remove();
  }
};

const cleanBadge = (container) => {
  if (!container) {
    removeDefaultBadge();

    return;
  }

  const customBadge =
    typeof container === 'string' ? document.getElementById(container) : container;

  cleanCustomBadge(customBadge);
};

const cleanGoogleRecaptcha = (scriptId, container) => {
  // remove badge
  cleanBadge(container);

  // remove old config from window
  // eslint-disable-next-line no-underscore-dangle
  window.___grecaptcha_cfg = undefined;

  // remove script
  const script = document.querySelector(`#${scriptId}`);
  if (script) {
    script.remove();
  }

  cleanGstaticRecaptchaScript();
};

/**
 * Function to generate the src for the script tag
 *
 * @param param0
 * @returns
 */
const generateGoogleRecaptchaSrc = ({ useRecaptchaNet, useEnterprise }) => {
  const hostName = useRecaptchaNet ? 'recaptcha.net' : 'google.com';
  const script = useEnterprise ? 'enterprise.js' : 'api.js';

  return `https://www.${hostName}/recaptcha/${script}`;
};

export const isScriptInjected = (scriptId) => !!document.querySelector(`#${scriptId}`);

/**
 * Function to inject the google recaptcha script
 *
 * @param param0
 * @returns
 */
const injectGoogleReCaptchaScript = ({
  reCaptchaKey,
  language,
  onLoad,
  useRecaptchaNet = true,
  useEnterprise = false,
  scriptProps: { nonce = '', defer = false, async = false, id = '', appendTo = undefined } = {},
}) => {
  const scriptId = id || 'google-recaptcha-v3';

  // Script has already been injected, just call onLoad and does othing else
  if (isScriptInjected(scriptId)) {
    onLoad();

    return;
  }

  /**
   * Generate the js script
   */
  const googleRecaptchaSrc = generateGoogleRecaptchaSrc({
    useEnterprise,
    useRecaptchaNet,
  });
  const js = document.createElement('script');
  js.id = scriptId;
  js.src = `${googleRecaptchaSrc}?render=${reCaptchaKey}${language ? `&hl=${language}` : ''}`;

  if (nonce) {
    js.nonce = nonce;
  }

  js.defer = !!defer;
  js.async = !!async;
  js.onload = onLoad;

  /**
   * Append it to the body // head
   */
  const elementToInjectScript =
    appendTo === 'body' ? document.body : document.getElementsByTagName('head')[0];

  elementToInjectScript.appendChild(js);
};

const RecaptchaWrapper = forwardRef((_, $ref) => {
  const $recaptcha = useRef();

  const [greCaptchaInstance, setGreCaptchaInstance] = useState(null);

  const reCaptchaKey = SITE_KEY;
  const useEnterprise = false;
  const useRecaptchaNet = true;
  const language = 'en';

  useEffect(() => {
    const scriptProps = {};
    const scriptId = scriptProps?.id || 'google-recaptcha-v3';

    const onLoad = () => {
      if (!window || !window.grecaptcha) {
        console.warn(`script not available`);

        return;
      }

      const grecaptcha = useEnterprise ? window.grecaptcha.enterprise : window.grecaptcha;

      grecaptcha.ready(() => {
        setGreCaptchaInstance(grecaptcha);
      });
    };

    const onError = () => {
      console.warn('Error loading google recaptcha script');
    };

    injectGoogleReCaptchaScript({
      reCaptchaKey,
      useEnterprise,
      useRecaptchaNet,
      scriptProps,
      language,
      onLoad,
      onError,
    });

    return () => {
      cleanGoogleRecaptcha(scriptId);
    };
  }, [useEnterprise, useRecaptchaNet, language, reCaptchaKey]);

  const executeRecaptcha = useCallback(async () => {
    if (!greCaptchaInstance || !greCaptchaInstance.execute) {
      throw new Error('Google Recaptcha has not been loaded');
    }

    const result = await greCaptchaInstance.execute(reCaptchaKey, {
      action: 'submit',
    });

    return result;
  }, [greCaptchaInstance, reCaptchaKey]);

  useImperativeHandle(
    $ref,
    () => ({
      getToken: executeRecaptcha,
    }),
    [executeRecaptcha]
  );

  return <View ref={$recaptcha} />;
});

export default RecaptchaWrapper;
