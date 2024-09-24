import { Home } from './pages/Home';
import { Header } from './components';
import {
  ChakraProvider,
  Container,
} from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
      <Header />
      <Container height="100%" maxW="1400px" paddingX="2rem" bgColor="white">
        <Home />
      </Container>
    </ChakraProvider>
  )
}

export default App
