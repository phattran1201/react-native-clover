
# @haroldtran/react-native-clover

Clover SDK  [Github](https://github.com/clover/clover-android-sdk) --- [Docs Github](https://clover.github.io/clover-android-sdk/clover-android-sdk/index.html) --- [Dev Docs](https://docs.clover.com/dev/docs/integrate-with-clover-android-sdk)

Maintained and enhanced by [@phattran1201](https://github.com/phattran1201)


<div align="center">

[![npm][npm]][npm-URL] [![Android][Android]][Android-URL] [![Kotlin][Kotlin]][Kotlin-URL] [![React-Native][React-Native]][React-Native-URL]

</div>

## Getting started

`$ yarn add @haroldtran/react-native-clover`

## Usage
```javascript
import Clover, { useScanner } from '@haroldtran/react-native-clover';

// Hook to register and listen to connected Clover scanner, tested on flex and mini gen 2
useScanner(callback, enabled);

Clover.authenticate(forceValidateToken: Boolean = false, timeout: Number = 10000) => ({
  success: Boolean,
  authToken: String,
  errorMessage: String,
})

Clover.getMerchant().then({ data } => { ... });

Clover.enableCustomerMode();
Clover.disableCustomerMode();

Clover.print(String imagePath).then(...);
/**
 * Print Payment Option
 *
 * orderId: string - Required
 * paymentId: string - Required
 * flags: array - optional, array of PrintJob flags
 **/
Clover.printPayment(option);

// Use this in situations where you are not ensured to have account access permission, API 26+
Clover.startAccountChooserIfNeeded().then({ success: bool } => { ... });

// Register Scanner for listening to CLOVER.EVENT.BARCODE_SCANNER, tested on Flex and Mini Gen 2
Clover.registerScanner();
Clover.unregisterScanner();

Clover.isFlex();
Clover.isMini();
Clover.getSpaVersion();

// This should be called as early as possible during app load before calling any payment method
Clover.initializePaymentConnector(String raid);

/**
 * Sale Option
 *
 * amount: int - Required
 * externalPaymentId: string - Required, unless generateExternalPaymentId is true
 * externalReferenceId: string - optional, id that is passed to settlement file
 * printReceipt: bool - optional, auto print receipt without selection
 * generateExternalPaymentId: bool - optional, unless externalPaymentId is not provided, default false
 * cardEntryMethods: int - optional, see CARD_ENTRY_METHODS, defaults to MAG_STRIPE | ICC_CONTACT | NFC_CONTACTLESS
 * disableDuplicateChecking: bool -  optional, default false
 * disableRestartTransactionOnFail: bool - optional, default false
 * disablePrinting: bool - optional, default false
 * disableReceiptSelection: bool - optional, default false
 * signatureEntryLocation: string - optional, see DATA_ENTRY_LOCATION, defaults to merchant settings
 * signatureThreshold: int - optional, defaults to merchant settings
 * autoAcceptSignature: boolean - optional, whether to ask for signature confirmation, default true
 * tipAmount: int - optional, if TipMode is set to TIP_PROVIDED, this must be set
 * tippableAmount: int - optional, amount used to calculate tip
 * tipMode: string - optional, see TIP_MODE, defaults to merchant settings
 * tipSuggestions: array - optional, see [TipSuggestions](https://docs.clover.com/clover-platform/docs/using-per-transaction-settings#section--tips-)
 *     TipSuggestion {
 *        name: string,
 *        percentage: int,
 *     }
 */
/**
 * Sale Result
 *
 * success: bool
 * message: string
 * reason: string
 * payment: object
 */
Clover.sale(option).then(result => {});

/**
 * Refund Payment Option
 *
 * paymentId: string - required
 * orderId: string - required
 * printReceipt: bool - optional, auto print receipt without selection
 * amount: int - optional, for partial refunds
 * setFullRefund: boolean: optional, overrides amount
 */
/**
 * Refund Payment Result
 *
 * success: bool
 * message: string
 * reason: string
 * refund: object
 */
Clover.refundPayment(option).then(result => {});

/**
 * Manual Refund Option
 *
 * amount: int - required
 * externalPaymentId: string - required
 * printReceipt: bool - optional, auto print receipt without selection
 */
/**
 * Manual Refund Result
 *
 * success: bool
 * message: string
 * reason: string
 * credit: object
 */
Clover.manualRefund(option).then(result => {});

/**
 * Void Payment Option
 *
 * paymentId: string, required
 * orderId: string, required
 * voidReason: string, required, see VOID_REASON
 * printReceipt: bool - optional, auto print receipt without selection
 */
/**
 * Void Payment Result
 *
 * success: bool
 * message: string
 * reason: string
 * paymentId: string
 */
Clover.voidPayment(option).then(result => {});
```

## Contants

* `HARDWARE_SERIAL_NUMBER`
* [CARD_ENTRY_METHODS](https://docs.clover.com/clover-platform/docs/using-per-transaction-settings#section--other-functions-)
    * `MAG_STRIPE`
    * `ICC_CONTACT`
    * `NFC_CONTACTLESS`
    * `VAULTED_CARD`
    * `MANUAL`
    * `ALL`
* [DATA_ENTRY_LOCATION](https://clover.github.io/clover-android-sdk/com/clover/sdk/v3/payments/DataEntryLocation.html)
* [VOID_REASON](https://clover.github.io/clover-android-sdk/com/clover/sdk/v3/order/VoidReason.html)
* [TIP_MODE](https://clover.github.io/clover-android-sdk/com/clover/sdk/v3/payments/TipMode.html)
    * `NO_TIP`
    * `TIP_PROVIDED`
    * `ON_SCREEN_BEFORE_PAYMENT`
* [PRINT_JOB_FLAG](https://clover.github.io/clover-android-sdk/com/clover/sdk/v1/printer/job/PrintJob.html)
* `EVENT`
    * `BARCODE_SCANNER`

## Contributors

<table>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/phattran1201">
                    <img src="https://avatars.githubusercontent.com/u/36856455" width="100;" alt="phattran1201"/>
                    <br />
                    <sub><b>Harold Tran</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://bitbucket.org/infuse-team/">
                    <img src="https://avatars.githubusercontent.com/u/15880176" width="100;" alt="infuse-team"/>
                    <br />
                    <sub><b>Infuse Team</b></sub>
                </a>
            </td>
        </tr>
    </tbody>
</table>

## Troubleshooting

* If you aren't getting anything resolved when calling `getMerchant` try these following solutions:
  - Make sure that you are running this in an app that is registered on Clover.
  - Make sure you have account permission before running `getMerchant`. This can be an issue on Android 8.0+. See `startAccountChooserIfNeeded`.
  - If you've just uninstalled and reinstalled the app, it can take a while for the device to refresh the app's access. Restart the clover device to force a refresh.


<!-- Badge for README -->
[npm]: https://img.shields.io/npm/v/%40haroldtran%2Freact-native-clover?&style=for-the-badge&logo=npm&logoColor=red
[npm-URL]: https://www.npmjs.com/package/@haroldtran/react-native-clover
[iOS]: https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white
[iOS-URL]: https://www.apple.com/ios
[Android]: https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white
[Android-URL]: https://www.android.com/
[React-Native]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-Native-URL]: https://reactnative.dev/
[React-Native]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-Native-URL]: https://reactnative.dev/
[Swift]: https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white
[Swift-URL]: https://developer.apple.com/swift/
[Kotlin]: https://img.shields.io/badge/Kotlin-0095D5?&style=for-the-badge&logo=kotlin&logoColor=white
[Kotlin-URL]: https://kotlinlang.org/
[Logo]: https://img.shields.io/badge/React_Native_Multiple_Image_Picker-DF78C3?style=for-the-badge