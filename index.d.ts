export interface CloverReference {
    id?: string;
    name?: string;
}
export interface CloverTender {
    id: string;
    editable?: boolean;
    label?: string;
    opensCashDrawer?: boolean;
    supportsTipping?: boolean;
    enabled?: boolean;
    visible?: boolean;
    instructions?: string;
}
export interface CloverCardTransaction {
    cardType?: string;
    entryType?: string;
    first6?: string;
    last4?: string;
    authCode?: string;
    cardHolderName?: string;
    token?: string;
}
export interface CloverServiceChargeAmount {
    name?: string;
    amount?: number;
}
export interface CloverRefund {
    id: string;
    amount?: number;
    reason?: string;
    createdTime?: number;
}
export interface CloverAdditionalChargeAmount {
    name?: string;
    amount?: number;
}
export interface CloverPaymentTaxRate {
    name?: string;
    rate?: number;
    amount?: number;
}
export interface CloverLineItemPayment {
    id: string;
    name?: string;
    amount?: number;
}
export interface CloverVoidReasonDetails {
    code?: string;
    description?: string;
}
export interface CloverTransactionSettings {
    suppressOnScreenTips?: boolean;
}
export interface CloverAppTracking {
    packageName?: string;
    versionCode?: string;
}
export interface CloverCashAdvanceExtra {
    amount?: number;
}
export interface CloverTransactionInfo {
    transactionId?: string;
    approvalCode?: string;
}
export interface CloverSignatureDisclaimer {
    text?: string;
}
export interface CloverPurchaseCardL2 {
    taxAmount?: number;
}
export interface CloverPurchaseCardL3 {
    customerReferenceId?: string;
}
export interface CloverOceanGatewayInfo {
    gatewayId?: string;
}
export interface CloverTerminalManagementComponent {
    name?: string;
    version?: string;
}
export interface CloverPaymentEmiInfo {
    bank?: string;
    tenureMonths?: number;
}
export interface CloverCloseoutBatchInfo {
    batchId?: string;
    closedTime?: number;
}
export interface CloverFeatureMetrics {
    accessibilityModeUsed?: boolean;
}
export interface CloverPayment {
    id: string;
    order?: CloverReference;
    device?: CloverReference;
    tender?: CloverTender;
    amount: number;
    tipAmount?: number;
    taxAmount?: number;
    cashbackAmount?: number;
    cashTendered?: number;
    externalPaymentId?: string;
    externalReferenceId?: string;
    employee?: CloverReference;
    createdTime?: number;
    clientCreatedTime?: number;
    gatewayProcessingTime?: number;
    modifiedTime?: number;
    offline?: boolean;
    result?: string;
    cardTransaction?: CloverCardTransaction;
    serviceCharge?: CloverServiceChargeAmount;
    attributes?: Record<string, string>;
    additionalCharges?: CloverAdditionalChargeAmount[];
    taxRates?: CloverPaymentTaxRate[];
    refunds?: CloverRefund[];
    note?: string;
    lineItemPayments?: CloverLineItemPayment[];
    authorization?: CloverReference;
    voidPaymentRef?: CloverReference;
    voidReason?: string;
    voidReasonDetails?: CloverVoidReasonDetails;
    dccInfo?: any;
    transactionSettings?: CloverTransactionSettings;
    germanInfo?: any;
    appTracking?: CloverAppTracking;
    cashAdvanceExtra?: CloverCashAdvanceExtra;
    transactionInfo?: CloverTransactionInfo;
    signatureDisclaimer?: CloverSignatureDisclaimer;
    merchant?: CloverReference;
    increments?: any[];
    purchaseCardL2?: CloverPurchaseCardL2;
    purchaseCardL3?: CloverPurchaseCardL3;
    oceanGatewayInfo?: CloverOceanGatewayInfo;
    terminalManagementComponents?: CloverTerminalManagementComponent[];
    emiInfo?: CloverPaymentEmiInfo;
    closeoutBatchInfo?: CloverCloseoutBatchInfo;
    featureMetrics?: CloverFeatureMetrics;
}
export interface ObjectRef {
    id: string;
}
export interface BridgeEvent {
    BARCODE_SCANNER: string;
}
export interface TipSuggestion {
    name: string;
    percentage: number;
}
export interface Result {
    success: boolean;
}
export interface Tender extends ObjectRef {
    label: string;
}
export interface AuthenticationResult extends Result {
    errorMessage: string;
    authToken: string;
}
export interface MerchantResult extends Result {
    statusMessage?: string;
    merchant: Merchant;
}
export interface Merchant extends ObjectRef {
    name: string;
    email: string;
    location: MerchantLocation;
}
export interface MerchantLocation {
    country: string;
    city: string;
    region: string;
}
export interface TransactionResult extends Result {
    reason?: string;
    message?: string;
}
export interface Transaction {
    id: string;
    amount: number;
    createdTime: string;
}
export interface CardTransaction {
    authCode: string;
    cardHolderName: string;
    first6: string;
    last4: string;
    referenceId: string;
    transactionNo: string;
    cardType: string;
    type: string;
    entryType: string;
    currency: string;
    extra: {
        applicationLabel: string;
        authorizingNetworkName: string;
        cvmResult: string;
        applicationIdentifier: string;
    };
}
export interface Payment extends Transaction {
    externalPaymentId: string;
    externalReferenceId: string;
    offline: boolean;
    tipAmount: number;
    order: ObjectRef;
    tender: Tender;
    cardTransaction: CardTransaction;
    payment: CloverPayment;
}
export interface Refund extends Transaction {
    payment: ObjectRef;
}
export interface Credit extends Transaction {
    order: ObjectRef;
    tender: Tender;
}
export interface CardEntryMethod {
    ICC_CONTACT: number;
    MAG_STRIPE: number;
    MANUAL: number;
    NFC_CONTACTLESS: number;
    VAULTED_CARD: number;
    ALL: number;
    /**
     * Custom method that matches Clover default of ICC_CONTACT, MAG_SWIPE, and NFC_CONTACTLESS
     */
    DEFAULT: number;
}
export interface DataEntryLocation {
    NONE: string;
    ON_PAPER: string;
    ON_SCREEN: string;
}
export interface VoidReason {
    AUTH_CLOSED_NEW_CARD: string;
    DEVELOPER_PAY_PARTIAL_AUTH: string;
    DEVELOPER_PAY_TIP_ADJUST_FAILED: string;
    FAILED: string;
    GIFTCARD_LOAD_FAILED: string;
    NOT_APPROVED: string;
    REJECT_DUPLICATE: string;
    REJECT_OFFLINE: string;
    REJECT_PARTIAL_AUTH: string;
    REJECT_SIGNATURE: string;
    TRANSPORT_ERROR: string;
    USER_CANCEL: string;
    USER_CUSTOMER_CANCEL: string;
    USER_GIFTCARD_LOAD_CANCEL: string;
}
export interface TipMode {
    NO_TIP: string;
    TIP_PROVIDED: string;
    ON_SCREEN_BEFORE_PAYMENT: string;
}
export interface PrintJobFlag {
    FLAG_BILL: number;
    FLAG_CUSTOMER: number;
    FLAG_FORCE_SIGNATURE: number;
    FLAG_MERCHANT: number;
    FLAG_NO_SIGNATURE: number;
    FLAG_NONE: number;
    FLAG_REFUND: number;
    FLAG_REPRINT: number;
}
export interface SaleOption {
    amount: number;
    externalPaymentId?: string;
    generateExternalPaymentId?: boolean;
    externalReferenceId?: string;
    cardEntryMethods?: number;
    disableRestartTransactionOnFail?: boolean;
    disableDuplicateChecking?: boolean;
    disablePrinting?: boolean;
    disableReceiptSelection?: boolean;
    signatureEntryLocation?: string;
    signatureThreshold?: number;
    autoAcceptSignature?: boolean;
    tipAmount?: number;
    tippableAmount?: number;
    tipMode?: string;
    tipSuggestions?: Array<TipSuggestion>;
    printReceipt?: boolean;
}
export interface SaleResult extends TransactionResult {
    payment: Payment;
}
export interface RefundPaymentOption {
    paymentId: string;
    orderId: string;
    amount?: number;
    setFullRefund?: boolean;
    printReceipt?: boolean;
}
export interface RefundPaymentResult extends TransactionResult {
    refund: Refund;
}
export interface ManualRefundOption {
    amount: number;
    externalPaymentId?: string;
    generateExternalPaymentId?: boolean;
    cardEntryMethods?: number;
    disableRestartTransactionOnFail?: boolean;
    printReceipt?: boolean;
}
export interface ManualRefundResult extends TransactionResult {
    credit: Credit;
}
export interface VoidPaymentOption {
    paymentId: string;
    orderId: string;
    voidReason: string;
    printReceipt?: boolean;
}
export interface VoidPaymentResult extends TransactionResult {
    paymentId: string;
}
export interface VoidPaymentRefundOption {
    paymentId: string;
    orderId: string;
}
export interface VoidPaymentRefundResult extends TransactionResult {
    paymentId: string;
    refundId: string;
}
export interface PrintPaymentOption {
    orderId: string;
    paymentId: string;
    flags?: Array<number>;
}
export interface Inventory extends ObjectRef {
    name: string;
    quantity: number;
    price: number;
    sku: string;
    barcode: string;
    category: string;
    taxRate: number;
    taxName: string;
    taxable: boolean;
}
export interface Order extends ObjectRef {
    currency: string;
    total: number;
    state: string;
    testMode: string;
    type: {
        id: string;
        label: string;
    };
}
export interface OrderResult extends Result {
    order: Order;
}
export interface InventoryResult extends Result {
    statusMessage?: string;
    inventory: Inventory;
}
/**
 * Another blah test
 */
export interface IClover {
    /**
     * Obtains authentication data from the Clover service.
     * @param {boolean} [forceValidateToken = false] Flag to validate against API, increases latency, use only when needed.
     * @param {number} [timeout = 10000] Timeout in milliseconds.
     * @returns {Promise} A promise that resolves to an AuthenticationResult.
     */
    authenticate: (forceValidateToken?: boolean, timeout?: number) => Promise<AuthenticationResult>;
    /**
     * Obtains Merchant Info from the Clover service.
     * @returns {Promise} A promise that resolves to a MerchantResult.
     */
    getMerchant: () => Promise<MerchantResult>;
    getOrder: (orderId: string) => Promise<OrderResult>;
    getInventoryItems: () => Promise<InventoryResult>;
    enableCustomerMode: () => void;
    disableCustomerMode: () => void;
    print: (imagePath: string) => Promise<object>;
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
    /**
     * Readies the Clover Bridge for sending payment requests to Clover device. Must be called before calling any payment method and should be
     * called as soon as possible.
     * @param {string} raid Remote Application Id. Obtained from Clover App dashboard.
     */
    initializePaymentConnector: (raid: string) => void;
    sale: (option: SaleOption) => Promise<SaleResult>;
    refundPayment: (option: RefundPaymentOption) => Promise<RefundPaymentResult>;
    manualRefund: (option: ManualRefundOption) => Promise<ManualRefundResult>;
    voidPayment: (option: VoidPaymentOption) => Promise<VoidPaymentResult>;
    voidPaymentRefund: (option: VoidPaymentRefundOption) => Promise<VoidPaymentRefundResult>;
    /**
     * Forces the SPA to close
     */
    cancelSPA: () => void;
    isFlex: () => Boolean;
    isMini: () => Boolean;
    getSpaVersion: () => String;
    /**
     * Clover HSN
     */
    HARDWARE_SERIAL_NUMBER: string;
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
}
declare const Clover: IClover;
export default Clover;
/**
 * This hook provides a callback for barcode scanner events
 * @param callback Function that receives the scanned data
 * @param enabled Whether the scanner should be active
 */
export declare const useScanner: (callback: (data: string) => void, enabled?: boolean) => void;
