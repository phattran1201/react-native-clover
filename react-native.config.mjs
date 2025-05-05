// react-native.config.mjs
export default {
  dependency: {
    platforms: {
      android: {
        packageImportPath:
          'import com.infuse.clover.bridge.RNCloverBridgePackage;',
        packageInstance: 'new RNCloverBridgePackage()',
      },
      ios: null,
    },
  },
};
