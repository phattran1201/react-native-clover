import { useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { RNCloverBridge } = NativeModules;

interface ObjectRef {
  id: String;
}

interface BridgeEvent {
  BARCODE_SCANNER: String;
}

interface TipSuggestion {
  name: String;
  percentage: Number;
}

interface Result {
  success: boolean;
}

interface Tender extends ObjectRef {
  label: String;
}

interface AuthenticationResult extends Result {
  errorMessage: String;
  authToken: String;
}

interface MerchantResult extends Result {
  statusMessage?: String;
  merchant: Merchant;
}

interface OrderResult extends Result {
  order: Order;
}

interface InventoryResult extends Result {
  statusMessage?: String;
  inventory: Inventory;
}

interface Inventory extends ObjectRef {
  name: String;
  quantity: Number;
  price: Number;
  sku: String;
  barcode: String;
  category: String;
  taxRate: Number;
  taxName: String;
  taxable: boolean;
}

interface Merchant extends ObjectRef {
  name: String;
  email: String;
  location: MerchantLocation;
}

interface Order extends ObjectRef {
  currency: String;
  total: Number;
  state: String;
  testMode: String;
  type: {
    id: String;
    label: String;
  };
}

interface MerchantLocation {
  country: String;
  city: String;
  region: String;
}

interface TransactionResult extends Result {
  reason?: String;
  message?: String;
}

interface Transaction {
  id: String;
  amount: Number;
  createdTime: String;
}

interface Payment extends Transaction {
  externalPaymentId: String;
  offline: boolean;
  tipAmount: Number;
  order: ObjectRef;
  tender: Tender;
}

interface Refund extends Transaction {
  payment: ObjectRef;
}

interface Credit extends Transaction {
  order: ObjectRef;
  tender: Tender;
}

interface CardEntryMethod {
  ICC_CONTACT: Number;
  MAG_STRIPE: Number;
  MANUAL: Number;
  NFC_CONTACTLESS: Number;
  VAULTED_CARD: Number;
  ALL: Number;
  /**
   * Custom method that matches Clover default of ICC_CONTACT, MAG_SWIPE, and NFC_CONTACTLESS
   */
  DEFAULT: Number;
}

interface DataEntryLocation {
  NONE: String;
  ON_PAPER: String;
  ON_SCREEN: String;
}

interface VoidReason {
  AUTH_CLOSED_NEW_CARD: String;
  DEVELOPER_PAY_PARTIAL_AUTH: String;
  DEVELOPER_PAY_TIP_ADJUST_FAILED: String;
  FAILED: String;
  GIFTCARD_LOAD_FAILED: String;
  NOT_APPROVED: String;
  REJECT_DUPLICATE: String;
  REJECT_OFFLINE: String;
  REJECT_PARTIAL_AUTH: String;
  REJECT_SIGNATURE: String;
  TRANSPORT_ERROR: String;
  USER_CANCEL: String;
  USER_CUSTOMER_CANCEL: String;
  USER_GIFTCARD_LOAD_CANCEL: String;
}

interface TipMode {
  NO_TIP: String;
  TIP_PROVIDED: String;
  ON_SCREEN_BEFORE_PAYMENT: String;
}

interface PrintJobFlag {
  FLAG_BILL: Number;
  FLAG_CUSTOMER: Number;
  FLAG_FORCE_SIGNATURE: Number;
  FLAG_MERCHANT: Number;
  FLAG_NO_SIGNATURE: Number;
  FLAG_NONE: Number;
  FLAG_REFUND: Number;
  FLAG_REPRINT: Number;
}

interface SaleOption {
  amount: Number;
  externalPaymentId?: String;
  generateExternalPaymentId?: boolean;
  cardEntryMethods?: Number;
  disableRestartTransactionOnFail?: boolean;
  disableDuplicateChecking?: boolean;
  disablePrinting?: boolean;
  disableReceiptSelection?: boolean;
  signatureEntryLocation?: String;
  signatureThreshold?: Number;
  autoAcceptSignature?: boolean;
  tipAmount?: Number;
  tippableAmount?: Number;
  tipMode?: String;
  tipSuggestions?: Array<TipSuggestion>;
  printReceipt?: boolean;
}

interface SaleResult extends TransactionResult {
  payment: Payment;
}

interface RefundPaymentOption {
  paymentId: String;
  orderId: String;
  amount?: Number;
  setFullRefund?: boolean;
  printReceipt?: boolean;
}

interface RefundPaymentResult extends TransactionResult {
  refund: Refund;
}

interface ManualRefundOption {
  amount: Number;
  externalPaymentId?: String;
  generateExternalPaymentId?: boolean;
  cardEntryMethods?: Number;
  disableRestartTransactionOnFail?: boolean;
  printReceipt?: boolean;
}

interface ManualRefundResult extends TransactionResult {
  credit: Credit;
}

interface VoidPaymentOption {
  paymentId: String;
  orderId: String;
  voidReason: String;
  printReceipt?: boolean;
}

interface VoidPaymentResult extends TransactionResult {
  paymentId: String;
}

interface VoidPaymentRefundOption {
  paymentId: String;
  orderId: String;
}

interface VoidPaymentRefundResult extends TransactionResult {
  paymentId: String;
  refundId: String;
}

interface PrintPaymentOption {
  orderId: String;
  paymentId: String;
  flags?: Array<Number>;
}

/**
 * Another blah test
 */
interface Clover {
  // General Methods ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Obtains authentication data from the Clover service.
   * @param {Boolean} [forceValidateToken = false] Flag to validate against API, increases latency, use only when needed.
   * @param {Number} [timeout = 10000] Timeout in milliseconds.
   * @returns {Promise} A promise that resolves to an AuthenticationResult.
   */
  authenticate: (forceValidateToken?: boolean, timeout?: Number) => Promise<AuthenticationResult>;
  /**
   * Obtains Merchant Info from the Clover service.
   * @returns {Promise} A promise that resolves to a MerchantResult.
   */
  getMerchant: () => Promise<MerchantResult>;
  getOrder: (orderId: String) => Promise<OrderResult>;
  getInventoryItems: () => Promise<InventoryResult>;
  enableCustomerMode: () => void;
  disableCustomerMode: () => void;
  print: (imagePath: String) => Promise<object>;
  printPayment: (option: PrintPaymentOption) => void;
  /**
   * Obtains required Android runtime permissions, only needed if targeting API > 25.
   * @returns {Promise<Result>} A promise that resolves to a Result.
   */
  startAccountChooserIfNeeded: () => Promise<Result>;
  /**
   * Registers the Clover barcode scanner BroadcastReceiver and registers the LifecycleEventListener for cleanup
   */
  registerScanner: () => void;
  /**
   * Unregisters the Barcode Event LifecycleEventListener
   */
  unregisterScanner: () => void;

  // Payment Methods ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Readies the Clover Bridge for sending payment requests to Clover device. Must be called before calling any payment method and should be
   * called as soon as possible.
   * @param {String} raid Remote Application Id. Obtained from Clover App dashboard.
   */
  initializePaymentConnector: (raid: String) => void;
  sale: (option: SaleOption) => Promise<SaleResult>;
  refundPayment: (option: RefundPaymentOption) => Promise<RefundPaymentResult>;
  manualRefund: (option: ManualRefundOption) => Promise<ManualRefundResult>;
  voidPayment: (option: VoidPaymentOption) => Promise<VoidPaymentResult>;
  voidPaymentRefund: (option: VoidPaymentRefundOption) => Promise<VoidPaymentRefundResult>;
  /**
   * Forces the SPA to close
   */
  cancelSPA: () => void;

  // Constant Methods //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  isFlex: () => boolean;
  isMini: () => boolean;
  getSpaVersion: () => String;

  // Enums/Constants ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Clover HSN
   */
  HARDWARE_SERIAL_NUMBER: String;
  CARD_ENTRY_METHOD: CardEntryMethod;
  /**
   * https://clover.github.io/clover-android-sdk/com/clover/sdk/v3/payments/DataEntryLocation.html
   */
  DATA_ENTRY_LOCATION: DataEntryLocation;
  /**
   * https://clover.github.io/clover-android-sdk/com/clover/sdk/v3/order/VoidReason.html
   */
  VOID_REASON: VoidReason;
  /**
   * https://clover.github.io/clover-android-sdk/com/clover/sdk/v3/payments/TipMode.html
   */
  TIP_MODE: TipMode;
  /**
   * https://clover.github.io/clover-android-sdk/com/clover/sdk/v1/printer/job/PrintJob.html
   */
  PRINT_JOB_FLAG: PrintJobFlag;
  /**
   * Bridge Emitted Events
   */
  EVENT: BridgeEvent;
};


const Clover: Clover = {
  authenticate: (forceValidateToken: Boolean = false, timeout: Number = 10000): Promise<AuthenticationResult> =>
    RNCloverBridge?.authenticate(forceValidateToken, timeout),
  getMerchant: (): Promise<MerchantResult> => RNCloverBridge?.getMerchant(),
  getOrder: (orderId: String): Promise<OrderResult> => RNCloverBridge?.getOrder(orderId),
  getInventoryItems: (): Promise<InventoryResult> => RNCloverBridge?.getInventoryItems(),
  enableCustomerMode: (): void => RNCloverBridge?.enableCustomerMode(),
  disableCustomerMode: (): void => RNCloverBridge?.disableCustomerMode(),
  print: (imagePath: String): Promise<object> => RNCloverBridge?.print(imagePath),
  printPayment: (option: PrintPaymentOption): void => RNCloverBridge?.printPayment(option),
  startAccountChooserIfNeeded: (): Promise<Result> => RNCloverBridge?.startAccountChooserIfNeeded(),
  registerScanner: (): void => RNCloverBridge?.registerScanner(),
  unregisterScanner: (): void => RNCloverBridge?.unregisterScanner(),

  // Payment Methods
  initializePaymentConnector: (raid: String): void => RNCloverBridge?.initializePaymentConnector(raid),
  sale: (option: SaleOption): Promise<SaleResult> => RNCloverBridge?.sale(option),
  refundPayment: (option: RefundPaymentOption): Promise<RefundPaymentResult> => RNCloverBridge?.refundPayment(option),
  manualRefund: (option: ManualRefundOption): Promise<ManualRefundResult> => RNCloverBridge?.manualRefund(option),
  voidPayment: (option: VoidPaymentOption): Promise<VoidPaymentResult> => RNCloverBridge?.voidPayment(option),
  voidPaymentRefund: (option: VoidPaymentRefundOption): Promise<VoidPaymentRefundResult> =>
    RNCloverBridge?.voidPaymentRefund(option),
  cancelSPA: (): void => RNCloverBridge?.cancelSPA(),

  // Constant Methods
  isFlex: (): boolean => RNCloverBridge?.isFlex(),
  isMini: (): boolean => RNCloverBridge?.isMini(),
  getSpaVersion: (): String => RNCloverBridge?.getSpaVersion(),

  // Enums/Constants
  HARDWARE_SERIAL_NUMBER: RNCloverBridge?.HARDWARE_SERIAL_NUMBER as String,
  CARD_ENTRY_METHOD: RNCloverBridge?.CARD_ENTRY_METHOD as CardEntryMethod,
  DATA_ENTRY_LOCATION: RNCloverBridge?.DATA_ENTRY_LOCATION as DataEntryLocation,
  VOID_REASON: RNCloverBridge?.VOID_REASON as VoidReason,
  TIP_MODE: RNCloverBridge?.TIP_MODE as TipMode,
  PRINT_JOB_FLAG: RNCloverBridge?.PRINT_JOB_FLAG as PrintJobFlag,
  EVENT: RNCloverBridge?.EVENT as BridgeEvent,
};
export default Clover;
export const useScanner = (callback: (data: String) => void, enabled = true) => {
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
  }, [enabled, callback]);
};
