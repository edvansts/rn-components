import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
}

export function Button({ children, onPress }: ButtonProps) {
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);
  const rippleX = useSharedValue(0);
  const rippleY = useSharedValue(0);

  const buttonRef = React.useRef<View>(null);

  const calculateTouchPosition = (absoluteX: number, absoluteY: number) => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const touchX = absoluteX - pageX;
        const touchY = absoluteY - pageY;
        console.log("Touch position within button:", touchX, touchY);

        rippleX.value = touchX;
        rippleY.value = touchY;
      });
    }
  };

  const gesture = Gesture.Tap()
    .maxDuration(2000)
    .onTouchesDown((event) => {
      runOnJS(calculateTouchPosition)(
        event.allTouches[0].absoluteX,
        event.allTouches[0].absoluteY
      );

      rippleScale.value = 0;
      rippleOpacity.value = 0.5;
      rippleScale.value = withTiming(10, { duration: 1000 });
    })
    .onTouchesUp(() => {
      console.log("Button released");
      if (onPress) {
        scheduleOnRN(onPress);
      }
    })
    .onFinalize(() => {
      rippleOpacity.value = withTiming(0, { duration: 250 });
    });

  const fillableElementStyle = useAnimatedStyle(() => {
    const baseSize = 32; // Small starting circle

    return {
      position: "absolute",
      width: baseSize,
      height: baseSize,
      borderRadius: baseSize / 2,
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      top: rippleY.value - baseSize / 2,
      left: rippleX.value - baseSize / 2,
      transform: [{ scale: rippleScale.value }],
      opacity: rippleOpacity.value,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.button} ref={buttonRef}>
        <Animated.View style={fillableElementStyle} />
        <Text>{children}</Text>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#003cffff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    minHeight: 120,
    overflow: "hidden",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
