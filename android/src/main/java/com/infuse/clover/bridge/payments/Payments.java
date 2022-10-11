package com.infuse.clover.bridge.payments;

import com.clover.sdk.v3.base.Reference;
import com.clover.sdk.v3.base.Tender;
import com.clover.sdk.v3.payments.CardTransaction;
import com.clover.sdk.v3.payments.Credit;
import com.clover.sdk.v3.payments.Payment;
import com.clover.sdk.v3.payments.Refund;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;

class Payments {
    // Bridge constants for Clover per-transaction settings.
    static final String CARD_ENTRY_METHODS = "cardEntryMethods";
    static final String DISABLE_DUPLICATE_CHECKING = "disableDuplicateChecking";
    static final String DISABLE_RESTART_TRANSACTION_ON_FAIL = "disableRestartTransactionOnFail";
    static final String DISABLE_PRINTING = "disablePrinting";
    static final String DISABLE_RECEIPT_SELECTION = "disableReceiptSelection";
    static final String SIGNATURE_THRESHOLD = "signatureThreshold";
    static final String SIGNATURE_ENTRY_LOCATION = "signatureEntryLocation";
    static final String AUTO_ACCEPT_SIGNATURE = "autoAcceptSignature";
    static final String TIP_AMOUNT = "tipAmount";
    static final String TIPPABLE_AMOUNT = "tippableAmount";
    static final String TIP_MODE = "tipMode";
    static final String TIP_SUGGESTIONS = "tipSuggestions";
    static final String SET_FULL_REFUND = "setFullRefund";
    static final String AMOUNT = "amount";
    static final String ORDER_ID = "orderId";
    static final String PAYMENT_ID = "paymentId";
    static final String REFUND_ID = "refundId";
    static final String VOID_REASON = "voidReason";
    static final String EXTERNAL_PAYMENT_ID = "externalPaymentId";
    static final String GENERATE_EXTERNAL_PAYMENT_ID = "generateExternalPaymentId";

    static WritableMap mapPayment(Payment payment) {
        WritableMap map = Arguments.createMap();
        map.putString("id", payment.getId());
        map.putString("externalPaymentId", payment.getExternalPaymentId());
        map.putInt("amount", payment.getAmount().intValue());
        map.putString("createdTime", payment.getCreatedTime().toString());

        map.putBoolean("offline", payment.getOffline());

        // Check for tip amount, flex/mini2 and station 2018 format differently
        // For some reason hasTipAmount returns true even when null
        int tipAmount = 0;
        if (payment.getTipAmount() != null) {
            tipAmount = payment.getTipAmount().intValue();
        }
        map.putInt("tipAmount", tipAmount);
        // clientCreatedTime seems to be null
        // modifiedTime seems to be null

        // Add in Tender
        map.putMap("tender", buildTenderMap(payment.getTender()));

        // Add in Order Ref
        map.putMap("order", buildReference(payment.getOrder()));

        WritableMap cardTransactionMap = Arguments.createMap();
        CardTransaction cardTransaction = payment.getCardTransaction();
        cardTransactionMap.putString("authCode", cardTransaction.getAuthCode());
        cardTransactionMap.putString("last4", cardTransaction.getLast4());
        cardTransactionMap.putString("first6", cardTransaction.getFirst6());
        cardTransactionMap.putString("cardHolderName", cardTransaction.getCardholderName());
        cardTransactionMap.putString("referenceId", cardTransaction.getReferenceId());
        cardTransactionMap.putString("transactionNo", cardTransaction.getTransactionNo());
        cardTransactionMap.putString("cardType", cardTransaction.getCardType().toString());
        cardTransactionMap.putString("type", cardTransaction.getType().toString());
        cardTransactionMap.putString("entryType", cardTransaction.getEntryType().toString());
        cardTransactionMap.putString("currency", cardTransaction.getCurrency());

        if (cardTransaction.getExtra() != null) {
            WritableMap transactionExtraMap = Arguments.createMap();
            Map<String, String> extraMap = cardTransaction.getExtra();
            if (extraMap.containsKey("applicationLabel")) {
                transactionExtraMap.putString("applicationLabel", extraMap.get("applicationLabel"));
            }
            if (extraMap.containsKey("authorizingNetworkName")) {
                transactionExtraMap.putString("authorizingNetworkName", extraMap.get("authorizingNetworkName"));
            }
            if (extraMap.containsKey("cvmResult")) {
                transactionExtraMap.putString("cvmResult", extraMap.get("cvmResult"));
            }
            if (extraMap.containsKey("applicationIdentifier")) {
                transactionExtraMap.putString("applicationIdentifier", extraMap.get("applicationIdentifier"));
            }
            cardTransactionMap.putMap("extra", transactionExtraMap);
        }

        map.putMap("cardTransaction", cardTransactionMap);

        return map;
    }

    static WritableMap mapRefund(Refund refund) {
        WritableMap map = Arguments.createMap();

        map.putString("id", refund.getId());
        map.putInt("amount", refund.getAmount().intValue());
        map.putString("createdTime", refund.getCreatedTime().toString());

        // Add in Payment Ref
        map.putMap("payment", buildReference(refund.getPayment()));

        return map;
    }

    static WritableMap mapCredit(Credit credit) {
        WritableMap map = Arguments.createMap();

        map.putString("id", credit.getId());
        map.putInt("amount", credit.getAmount().intValue());
        map.putString("createdTime", credit.getCreatedTime().toString());

        // Add in Order Ref
        map.putMap("order", buildReference(credit.getOrderRef()));

        // Add in Tender map
        map.putMap("tender", buildTenderMap(credit.getTender()));

        return map;
    }

    private static WritableMap buildTenderMap(Tender tender) {
        WritableMap map = Arguments.createMap();
        if (tender != null) {
            map.putString("id", tender.getId());
            map.putString("label", tender.getLabel());
        }
        return map;
    }

    private static WritableMap buildReference(Reference ref) {
        WritableMap map = Arguments.createMap();
        map.putString("id", ref.getId());
        return map;
    }

    private Payments() {
        throw new AssertionError();
    }
}
