# 🎯 Custom Button Component

Um componente de botão customizado para React Native com efeito ripple animado, construído com React Native Reanimated e Gesture Handler.


https://github.com/user-attachments/assets/a7df8a0b-e503-4e46-95bc-c60ece43d1ef



## ✨ Características

- 🎨 **Efeito Ripple**: Animação que inicia no ponto exato do toque
- 🎯 **Adaptável**: A animação se ajusta dinamicamente ao tamanho do botão
- 🔒 **Limitado**: Animação respeitando as bordas do componente
- ⚡ **Performance**: Utiliza React Native Reanimated para animações fluidas
- 🎭 **Acessível**: Suporte completo a gestos e feedback visual

## 📦 Dependências

```json
{
  "react-native-reanimated": "^3.x.x",
  "react-native-gesture-handler": "^2.x.x"
}
```

## 🚀 Instalação

Certifique-se de ter as dependências instaladas e configuradas:

```bash
npm install react-native-reanimated react-native-gesture-handler
```

## 🏃‍♂️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- React Native CLI ou Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### 1. Clone e instale dependências

```bash
git clone <repository-url>
cd rn-components
npm install
```

### 2. Para iOS

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

### 3. Para Android

```bash
npx react-native run-android
```

### 4. Com Expo (se aplicável)

```bash
npx expo start
```

### 🔍 Testando o componente

Após rodar o projeto, você pode testar o botão customizado:

1. Abra o app no simulador/dispositivo
2. Toque no botão para ver o efeito ripple
3. Observe como a animação começa no ponto exato do toque
4. Teste em diferentes posições do botão

## 🎮 Uso Básico

```tsx
import { Button } from "./components/button/button";

export default function App() {
  const handlePress = () => {
    console.log("Botão pressionado!");
  };

  return <Button onPress={handlePress}>Clique aqui</Button>;
}
```

## 🔬 Como Funciona

### 1. Detecção do Toque

```tsx
const gesture = Gesture.Tap().onTouchesDown((event) => {
  // Captura posição absoluta do toque
  const touchX = event.allTouches[0].absoluteX;
  const touchY = event.allTouches[0].absoluteY;
});
```

### 2. Cálculo da Posição Relativa

```tsx
const calculateTouchPosition = (absoluteX: number, absoluteY: number) => {
  buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
    const touchX = absoluteX - pageX;
    const touchY = absoluteY - pageY;

    rippleX.value = touchX;
    rippleY.value = touchY;
  });
};
```

### 3. Animação do Ripple

```tsx
const fillableElementStyle = useAnimatedStyle(() => {
  return {
    transform: [
      { translateX: rippleX.value - baseSize / 2 },
      { translateY: rippleY.value - baseSize / 2 },
      { scale: rippleScale.value },
    ],
    opacity: rippleOpacity.value,
  };
});
```

## 📄 Licença

MIT License

---

Feito com ❤️ usando React Native
