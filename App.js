import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native';


const App = () => {
  return (
    <NativeRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <Main />
    </NativeRouter>
  )
}

export default App;