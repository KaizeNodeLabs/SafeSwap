
![SAFESWAP LOGO_ON RICH BLACK](https://github.com/user-attachments/assets/8260378d-07dd-4309-b7e0-da42247fa21c)
# SafeSwap
# Web Marketplace with Escrow Contracts on Stellar

Welcome to the **Web Marketplace with Escrow Contracts**, a decentralized platform for buying and selling products with escrowed payments. Powered by Stellar and integrated with the **Trustless Work API**, this marketplace offers a secure and trustless environment for transactions across various product categories.

## 🚀 Features

- **Escrow-Based Transactions**: Funds are securely held in Stellar escrow contracts, ensuring both buyer and seller satisfaction.
- **Diverse Product Categories**: Supports a wide variety of products and services.
- **Trustless Transactions**: With the Trustless Work API, no central authority controls the escrow process; smart contracts handle all interactions.
- **Blockchain-Powered**: Built on the Stellar blockchain, providing fast, low-cost, and transparent transactions.
- **User-Friendly Interface**: Simple and intuitive UI designed for a seamless marketplace experience.

## 🛠️ Technology Stack

- **Frontend**: HTML, CSS, JavaScript, TypeScript
- **Backend**: TBD
- **Blockchain**: Stellar Network for handling decentralized, escrow-based transactions
- **API**: Trustless Work API for managing the creation of the Smart Contracts
- **Database**: TBD

## 🔑 Key Components

1. **Escrow Contracts on Stellar**:
   - Utilizes Stellar’s multi-signature and escrow capabilities to ensure funds are securely held until both parties agree to complete the transaction.
   - The smart contract manages the funds automatically, releasing payment only when both the buyer and seller meet the contract conditions.

2. **Trustless Work API Integration**:
   - The Trustless Work API is used to manage contract interactions, initiate transactions, and handle workflow automations for the escrow process.

3. **Product Marketplace**:
   - A user-friendly platform where sellers can list products, and buyers can browse and make purchases.
   - Categories for a wide variety of products, from physical items to digital goods.

## 📄 Usage

### Prerequisites
- TBD

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/SafeSwap.git
   cd SafeSwap
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

Available Commands:
- `npm run web:dev` - Start development server
- `npm run web:build` - Create production build
- `npm run web:start` - Start production server
- `npm run web:lint` - Run Biome linter

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Documentation

For detailed frontend documentation, see the [README.md](frontend/README.md) file.

### How It Works

1. **Listing a Product**: Sellers can create listings for products. Each listing includes information such as price, description, and images.
2. **Making a Purchase**: Buyers can select a product and initiate a purchase. Funds are transferred to an escrow account on the Stellar blockchain.
3. **Escrow Release**: Upon completion of the agreed-upon conditions, the Trustless Work API triggers the release of funds to the seller’s Stellar account.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.


## 🧑‍💻 Authors

- [danielcdz](https://github.com/danielcdz)
- Contributions from the open-source community and OnlyDust

