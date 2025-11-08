import { Button } from "@/components/button/button";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        gap: 16,
      }}
    >
      <Button />

      <Button />
    </View>
  );
}
