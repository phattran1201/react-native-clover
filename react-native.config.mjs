// react-native.config.mjs
export default {
  dependency: {
    platforms: {
      android: {
        packageImportPath:
          'import com.haroldtran.clover.bridge.RNCloverBridgePackage;',
        packageInstance: 'new RNCloverBridgePackage()',
      },
      ios: null,
    },
  },
};
