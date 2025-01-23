## Stellar Blockchain and Freighter Wallet and LOBSTR Integration Research.## 

#  Introduction to Stellar and Freighter Wallet

1.1 **Stellar Blockchain Overview**

Stellar is a decentralized network designed to facilitate cross-border payments, asset transfers, and financial services with minimal fees. It uses the Stellar Consensus Protocol (SCP) for fast and secure transactions.

**Key Features of Stellar:**

Asset Issuance: Create custom tokens (e.g., stablecoins, loyalty points).
Atomic Swaps: Perform trustless exchanges between assets.
Decentralized Finance (DeFi): Build financial tools and payment systems.
Stellar’s Role for Developers: Stellar provides APIs and SDKs that allow developers to interact with the network, enabling the creation of financial applications, decentralized apps (DApps), and more.

1.2 **Freighter Wallet Overview**

Freighter is a Stellar-compatible browser extension wallet for managing private keys, signing transactions, and interacting securely with Stellar-based applications.
Why Use Freighter:
Secure and user-friendly.
No need for server-side key management.
Open-source and supports seamless integration with web apps.

2. ## Research Objectives ##
Explore and analyze the official APIs and SDKs for Freighter.
Investigate user authentication using public keys.
Understand transaction signing workflows.
Identify and document best practices for securing private keys and sensitive data.

3. **Installation and Setup**
To use Stellar in your app, you'll follow these steps:
Install the Stellar SDK to interact with the Stellar network. It helps you create wallets, send/receive assets, and check balances.
Integrate Freighter for user wallet management. Freighter makes it easy for users to sign transactions from within your app using their Stellar accounts.
Create Wallets: Use the SDK to generate Stellar accounts for users or allow them to link their existing Freighter wallet.
Send Transactions: Build functions to send and receive assets like XLM or custom tokens through the Stellar network.

3.1 **Stellar SDK**
Stellar SDK Documentation
Official Resource:https://developers.stellar.org/docs
The Stellar SDK simplifies interaction with the Stellar blockchain, including:
Creating and managing transactions.
Submitting transactions to the Stellar network.

3.2  **Installation**

```npm install @stellar/freighter-api stellar-sdk```

3.3 **Freighter Wallet APIs**

Getting Started
To get started, you'll need both the Freighter extension and the API needed to integrate with it.

**3.3.1 Install the Freighter extension.**
​
You'll want a local version of the extension to test with.
Head over to the Chrome extension store and install Freighter into your browser.

3.1.2 Freighter API Documentation

`@OfficialResource`: *https://docs.freighter.app/docs/*

The Freighter API enables:
Retrieving the user's public key.
Signing Stellar transactions directly in the browser.
Handling transaction submission.

3.4 **Install Freighter API​**

```@Install the module using npm```: ```npm install @stellar/freighter-api```
Or
``npm install @stellar/freighter-api stellar-sdk``
or
`@Install the module using yarn`: ``yarn add @stellar/freighter-api``

For browser-based applications​

Install the packaged library via script tag using cdnjs, swapping in the desired version number for {version}:
NOTE: You must use version 1.1.2 or above
<script src="https://cdnjs.cloudflare.com/ajax/libs/stellar-freighter-api/{version}/index.min.js"></script>

4. ## Import the Library in Your Application##
   
After installation, import the library into your application:
(javascript) `import freighterApi from "@stellar/freighter-api"`;

 Or import specific modules as needed:
(javascript)

`import {
  isConnected,
  getAddress,
  signAuthEntry,
  signTransaction,
  signBlob,
} from "@stellar/freighter-api";`


## 4.1 Check if Freighter is Installed

To determine if the user has the Freighter extension installed, use the `isConnected()` method provided by the Freighter API.
### Example Code:

```javascript
const isAppConnected = await isConnected();

if (isAppConnected.isConnected) {
  alert("User has Freighter!");
} else {
  alert("Freighter is not installed!");
}
```

## 4.2 Verify User Authorization

To verify if the user has authorized your application to access their data, use the `isAllowed()` method provided by the Freighter API.

### Example Code:

```javascript
const isAppAllowed = await isAllowed();

if (isAppAllowed.isAllowed) {
  alert("User has allowed your app!");
} else {
  alert("User has not authorized your app!");
}
```



## 4.3 Request User Authorization

If the user has not authorized your application, you can prompt them to grant authorization using the `setAllowed()` method.

### Example Code:

```javascript
const isAppAllowed = await setAllowed();

if (isAppAllowed.isAllowed) {
  alert("Successfully added the app to Freighter's Allow List");
} else {
  alert("Authorization failed. Please try again.");
}
```


## 4.4 Retrieve User's Public Key

To interact with a user's Stellar account via Freighter, you need to retrieve their public key. Use the `requestAccess()` method to access the public key.

### Example Code:

```javascript
const retrievePublicKey = async () => {
  const accessObj = await requestAccess();
  if (accessObj.error) {
    return accessObj.error; // Return error message if access fails
  } else {
    return accessObj.address; // Return the user's public key
  }
};

// Example usage
const result = await retrievePublicKey();
console.log("User's Public Key:", result);
```



## 4.5 Get Network Information

Freighter allows you to query the network the user has configured (e.g., `TESTNET` or `PUBLIC`). Use the `getNetwork()` method to retrieve this information.

### Example Code:

```javascript
const retrieveNetwork = async () => {
  const networkObj = await getNetwork();
  if (networkObj.error) {
    return networkObj.error; // Return error message if network retrieval fails
  } else {
    return {
      network: networkObj.network, // Returns the network type (e.g., TESTNET or PUBLIC)
      networkPassphrase: networkObj.networkPassphrase, // Returns the network passphrase
    };
  }
};

// Example usage
const result = await retrieveNetwork();
console.log("Network Information:", result);
```
## 4.6 Sign Transactions

Freighter allows you to sign a transaction by providing the transaction XDR string, the network, and the user's address if necessary. Use the `signTransaction()` method for this purpose.

### Example Code:

```javascript
const userSignTransaction = async (xdr, network, signWith) => {
  const signedTransactionRes = await signTransaction(xdr, {
    network, // Specify the network (e.g., TESTNET or PUBLIC)
    address: signWith, // Optional: Specify the user's address
  });
  
  if (signedTransactionRes.error) {
    throw new Error(signedTransactionRes.error.message); // Handle errors
  } else {
    return signedTransactionRes.signedTxXdr; // Return the signed transaction XDR
  }
};

// Example usage
const xdr = ""; // Replace this with the transaction XDR string you want to sign
const userSignedTransaction = await userSignTransaction(xdr, "TESTNET");
console.log("Signed Transaction XDR:", userSignedTransaction);

```

## 4.7 Submit the Signed Transaction

Once a transaction is signed, you can submit it to the Stellar network using the Stellar SDK. This ensures the transaction is executed on the desired network.

### Example Code:

```javascript
import { Server, TransactionBuilder } from "stellar-sdk";

const userSignTransaction = async (xdr, network, signWith) => {
  const signedTransactionRes = await signTransaction(xdr, {
    network, // Specify the network (e.g., TESTNET or PUBLIC)
    address: signWith, // Optional: Specify the user's address
  });

  if (signedTransactionRes.error) {
    throw new Error(signedTransactionRes.error.message); // Handle errors
  } else {
    return signedTransactionRes.signedTxXdr; // Return the signed transaction XDR
  }
};

// Sign the transaction
const xdr = ""; // Replace this with the transaction XDR string to sign
const userSignedTransaction = await userSignTransaction(xdr, "TESTNET");

// Submit the signed transaction
const SERVER_URL = "https://horizon-testnet.stellar.org"; // Use the appropriate network URL
const server = new Server(SERVER_URL);

const transactionToSubmit = TransactionBuilder.fromXDR(
  userSignedTransaction,
  SERVER_URL
);

const response = await server.submitTransaction(transactionToSubmit);
console.log("Transaction Submitted Successfully:", response);

```

## 4.8 Monitor Wallet Changes

Freighter provides a `WatchWalletChanges` utility to monitor changes in the user's wallet, such as updates to the selected address or network. This is helpful for ensuring your application responds dynamically to user actions.

### Example Code:

```javascript
import { WatchWalletChanges } from "@stellar/freighter-api";

// Initialize the WatchWalletChanges class with an interval of 1000ms (1 second)
const Watcher = new WatchWalletChanges(1000);

// Start monitoring for wallet changes
Watcher.watch((watcherResults) => {
  document.querySelector("#address").innerHTML = watcherResults.address; // Update wallet address
  document.querySelector("#network").innerHTML = watcherResults.network; // Update network
  document.querySelector("#networkPassphrase").innerHTML =
    watcherResults.networkPassphrase; // Update network passphrase
});

// Stop monitoring after 30 seconds
setTimeout(() => {
  Watcher.stop();
}, 30000);
```


## 5.LOBSTR ##
LOBSTR is primarily a consumer-facing wallet without an API specifically for developer integration. However, as a developer, you can still enable your app to interact with the Stellar blockchain, which is compatible with LOBSTR, by leveraging Stellar’s ecosystem tools and ensuring compatibility with LOBSTR wallets.

## 5.1 Understand the Role of LOBSTR
LOBSTR is a wallet for managing Stellar assets. It supports Stellar accounts, key storage, payments, and other blockchain interactions. To integrate support for LOBSTR users:
Ensure your app supports Stellar accounts and transactions.
Allow users to input their Stellar public keys for interaction.

## 5.2 Set Up the Stellar SDK
The Stellar SDK is essential for interacting with the Stellar blockchain, which LOBSTR wallets operate on.


## 5.2.1 Install Stellar SDK

For Node.js applications:

```npm install stellar-sdk```

Import the Stellar SDK
```javascript
const { Server, Keypair, TransactionBuilder, Networks, Asset, Operation } = require('stellar-sdk');
// Connect to the Stellar Testnet or Mainnet
const server = new Server('https://horizon-testnet.stellar.org'); // Replace with Mainnet URL if necessary
```

## 5.2.2 . Retrieve Stellar Account Information

Allow users to provide their Stellar public key (available in their LOBSTR wallet). Use the Stellar Horizon API to fetch their account details.

```javascript
const publicKey = 'USER_PUBLIC_KEY'; // Replace with the user's Stellar public key
async function fetchAccountDetails(publicKey) {
  try {
    const account = await server.loadAccount(publicKey);
    console.log('Balances for account: ', account.balances);
  } catch (error) {
    console.error('Error fetching account details:', error);
  }
}
fetchAccountDetails(publicKey);

```

## 5.2.3. Enable Transactions

LOBSTR users can send payments or manage assets. Build a transaction interface in your app that generates valid Stellar transactions, which users can sign using their private keys stored in LOBSTR.
Example of Building a Payment Transaction:
```javascript
async function createPaymentTransaction(senderPublicKey, destinationPublicKey, amount) {
  try {
    const account = await server.loadAccount(senderPublicKey);
    const transaction = new TransactionBuilder(account, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: Networks.TESTNET, // Use `Networks.PUBLIC` for Mainnet
    })
   .addOperation(Operation.payment({
        destination: destinationPublicKey,
        asset: Asset.native(), // Lumens (XLM)
        amount: amount.toString(),
      }))
      .setTimeout(30)
      .build();
    console.log('Transaction created:', transaction);
    return transaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
  }
}
```


## 5.2.4. Use QR Codes for Easy Wallet Interaction
LOBSTR supports QR codes for payment requests. Generate QR codes for transactions in your app, allowing users to scan them with the LOBSTR app.

Example Using a QR Code Library:

bash
`npm install qrcode`
```javascript
const QRCode = require('qrcode');

const generateQRCode = (paymentRequest) => {
  const lobstrDeepLink = `stellar:${paymentRequest}`; // Use Stellar URIs
  QRCode.toDataURL(lobstrDeepLink, (err, url) => {
    if (err) {
      console.error('Error generating QR Code:', err);
    } else {
      console.log('QR Code URL:', url);
    }
  });
};
```
## 5.2.5 Integrate LOBSTR Deep Links

LOBSTR supports deep linking to open the app with prefilled transaction details. Format your links as follows:
stellar:<operation>?destination=<public_key>&amount=<amount>&memo=<memo>

Example:
`stellar:pay?destination=GDESTINATIONKEY&amount=10&memo=PaymentMemo`
Use this deep link format to direct LOBSTR users to execute transactions via the app.

## 5.2.6. Notify Users of Network Fees

Educate your users about Stellar’s minimal transaction fees, as they will need to have sufficient XLM to cover fees.
```javascript
async function notifyUserAboutFees(publicKey, transaction) {
  const baseFee = await server.fetchBaseFee(); // Fetch the base fee
  const operationCount = transaction.operations.length; // Count operations
  const totalFee = baseFee * operationCount; // Calculate total fee

  const balance = await checkBalance(publicKey); // Fetch account balance
  const minReserve = 1 + 0.5 * account.subentryCount; // Calculate minimum reserve
  
  if (balance < totalFee + minReserve) {
    alert(
      `Insufficient balance! Your account must maintain a reserve of ${minReserve} XLM and cover the transaction fee of ${(totalFee / 1e7).toFixed(7)} XLM.`
    );
    return false; // Insufficient funds
  }

  alert(`Transaction fee: ${(totalFee / 1e7).toFixed(7)} XLM. Ensure sufficient balance.`);
  return true; // Sufficient funds
}
}

```

## 6.  Security Best Practices

**Transaction Integrity:** 

Ensure transactions are unsigned when sent to Freighter for signing.
Validate transaction inputs (e.g., amounts, destination addresses) to avoid mistakes.
Secure Communication:


Use HTTPS for all API calls to the Stellar network.
Avoid exposing sensitive data (e.g., unsigned transaction data) in logs.
Freighter Wallet Prompts:


Always inform users about what actions they are signing. Include clear descriptions in the transaction memo.


**Verify Transactions:** Always verify that the transaction is correct before submitting it to the Stellar network. This can include checking amounts, destinations, and fees.

**Timeout and Retry:** Always include a timeout for transactions to prevent hanging or unwanted behavior. Implement retry logic if the network or wallet fails temporarily
Key Management:


Never store private keys or sensitive data on the server.
All signing operations should be conducted on the client side using Freighter.
    1. Testing:
Perform all testing on Stellar’s testnet to avoid unintentional mainnet operations.
    1. Data Minimization:


Only collect and store data necessary for transaction processing.

**Encryption**
Use end-to-end encryption (E2EE) to secure sensitive communication between the client and the backend.
Implement TLS/SSL for all communication channels to prevent man-in-the-middle (MITM) attacks.
   
**Constants** 
All constants should be dragged from the .env file 
Other security measures 

Enable multi-factor authentication (MFA) for enhanced account security.
Implement reCAPTCHA to prevent automated attacks.

Distribute disbursement responsibilities among multiple financial controllers.
Use the SDP wallet primarily as a hot wallet with limited funds.
Configure the approval flow to require two users for disbursements.

References
[Freighter Wallet Documentation](https://docs.freighter.app/docs/guide/usingFreighterWebApp)
[Stellar SDK Documentation](https://developers.stellar.org/)

## Resources that can be helpful for freighter(live implementation)

https://invoblox.com/blog/a-comprehensive-guide-to-build-a-stellar-d-app-from-scratch/
https://github.com/net2devcrypto/Soroban-NextJS-Vote-dApp-with-Freighter/tree/main/components
https://jamesbachini.com/soroban-tokens/
https://youtu.be/oF624m5b384?si=rxwbxi2CJZYvu8gK


## Resources that can be helpful for lobstr(live implementation)

https://github.com/Lobstrco/lobstr-browser-extension

https://github.com/Creit-Tech/Stellar-Wallets-Kit

