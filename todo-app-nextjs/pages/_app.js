import ColorModeProvider from '../context/ColorModeProvider';
import { ViewportProvider } from '../context/ViewportProvider';
import TodoListProvider from '../context/TodoListProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <ViewportProvider><ColorModeProvider><TodoListProvider><Component {...pageProps} /></TodoListProvider></ColorModeProvider></ViewportProvider>
}

export default MyApp
