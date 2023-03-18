import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { StyleConstants } from "~/utils/theme/constants";
import { useTheme } from "~/utils/theme/ThemeManager";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MobileNumberFlagModalType = {
  isFlex?: boolean;
  openThemeModal: boolean;
  onCloseThemeModal: () => void;
  children: React.ReactElement;
  parentPaddingEnabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  modalPositionStyle?: StyleProp<ViewStyle>;
};

const device = Dimensions.get("window");

const ThemeModal = ({
  isFlex = false,
  openThemeModal,
  onCloseThemeModal,
  children,
  containerStyle,
  modalPositionStyle,
  parentPaddingEnabled = true,
}: MobileNumberFlagModalType) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const modalViewParentContainer = () => {
    if (isFlex) {
      return {
        paddingTop: device.height - (device.height - (insets.top + 65)),
      };
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openThemeModal}
      onRequestClose={onCloseThemeModal}
    >
      <View
        style={[
          styles.modalView,
          {
            // We can override justifyContent value
            justifyContent: "flex-end",
            height: 190,
            ...modalViewParentContainer(),
          },
          modalPositionStyle,
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onCloseThemeModal}
          style={[
            styles.overlay,
            {
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          ]}
        />
        <View
          style={[
            styles.contentContainer,
            {
              ...(isFlex && { flex: 1 }),
              backgroundColor: "#fff",
              paddingHorizontal: parentPaddingEnabled
                ? StyleConstants.Spacing.M
                : 0,
            },
            containerStyle,
          ]}
        >
          <TouchableOpacity
            style={styles.modalHandlerNotch}
            activeOpacity={0.7}
            onPress={onCloseThemeModal}
          />
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    justifyContent: "flex-end",
    borderRadius: 12,
    paddingTop: StyleConstants.Spacing.M,
  },
  modalHandlerNotch: {
    backgroundColor: "#DCE0EB",
    height: 5,
    width: 60,
    borderRadius: 100,
    position: "absolute",
    top: 8,
    alignSelf: "center",
  },
});
export default ThemeModal;
