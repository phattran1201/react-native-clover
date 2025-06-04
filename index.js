import { useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
const { RNCloverBridge } = NativeModules;
const Clover = {
    authenticate: (forceValidateToken = false, timeout = 10000) => RNCloverBridge?.authenticate(forceValidateToken, timeout),
    getMerchant: () => RNCloverBridge?.getMerchant(),
    getOrder: (orderId) => RNCloverBridge?.getOrder(orderId),
    getInventoryItems: () => RNCloverBridge?.getInventoryItems(),
    enableCustomerMode: () => RNCloverBridge?.enableCustomerMode(),
    disableCustomerMode: () => RNCloverBridge?.disableCustomerMode(),
    print: (imagePath) => RNCloverBridge?.print(imagePath),
    printPayment: (option) => RNCloverBridge?.printPayment(option),
    startAccountChooserIfNeeded: () => RNCloverBridge?.startAccountChooserIfNeeded(),
    registerScanner: () => RNCloverBridge?.registerScanner(),
    unregisterScanner: () => RNCloverBridge?.unregisterScanner(),
    // Payment Methods
    initializePaymentConnector: (raid) => RNCloverBridge?.initializePaymentConnector(raid),
    sale: (option) => RNCloverBridge?.sale(option),
    refundPayment: (option) => RNCloverBridge?.refundPayment(option),
    manualRefund: (option) => RNCloverBridge?.manualRefund(option),
    voidPayment: (option) => RNCloverBridge?.voidPayment(option),
    voidPaymentRefund: (option) => RNCloverBridge?.voidPaymentRefund(option),
    cancelSPA: () => RNCloverBridge?.cancelSPA(),
    // Constant Methods
    isFlex: () => RNCloverBridge?.isFlex(),
    isMini: () => RNCloverBridge?.isMini(),
    getSpaVersion: () => RNCloverBridge?.getSpaVersion(),
    // Enums/Constants
    HARDWARE_SERIAL_NUMBER: RNCloverBridge?.HARDWARE_SERIAL_NUMBER,
    CARD_ENTRY_METHOD: RNCloverBridge?.CARD_ENTRY_METHOD,
    DATA_ENTRY_LOCATION: RNCloverBridge?.DATA_ENTRY_LOCATION,
    VOID_REASON: RNCloverBridge?.VOID_REASON,
    TIP_MODE: RNCloverBridge?.TIP_MODE,
    PRINT_JOB_FLAG: RNCloverBridge?.PRINT_JOB_FLAG,
    EVENT: RNCloverBridge?.EVENT,
};
export default Clover;
/**
 * This hook provides a callback for barcode scanner events
 * @param callback Function that receives the scanned data
 * @param enabled Whether the scanner should be active
 */
export const useScanner = (callback, enabled = true) => {
    useEffect(() => {
        if (enabled && RNCloverBridge) {
            const eventEmitter = new NativeEventEmitter(RNCloverBridge);
            const listener = eventEmitter.addListener(RNCloverBridge?.EVENT.BARCODE_SCANNER, callback);
            RNCloverBridge?.registerScanner();
            return () => {
                listener.remove();
                RNCloverBridge?.unregisterScanner();
            };
        }
        return () => { };
    }, [enabled, callback]);
};
