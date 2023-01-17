import VirusIcon from '../components/Svg/virusIcon';
import * as Localization from 'expo-localization';

export const mapTaskSlug = {
  'covid-19-rapid-antigen-test': {
    icon: 'virus',
    displayName: Localization.locale.split('-')[0] === 'es' ? 'Prueba casera de COVID-19' : 'COVID-19 Self-Test',
    navigationName: 'Intrivo',
    ctaText: Localization.locale.split('-')[0] === 'es' ? 'Comience prueba' : 'Start a test',
  },
};
