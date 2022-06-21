import ColorModeProvider from '../context/ColorModeProvider';
import { ViewportProvider } from '../context/ViewportProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <ViewportProvider><ColorModeProvider><Component {...pageProps} /></ColorModeProvider></ViewportProvider>
}

export default MyApp
