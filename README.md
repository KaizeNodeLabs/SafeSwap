
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

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui
- **Backend**: NestJS, GraphQL (Apollo Server), Prisma
- **Blockchain**: Stellar Network for handling decentralized, escrow-based transactions
- **API**: Trustless Work API for managing the creation of the Smart Contracts
- **Database**: PostgreSQL

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

- **Node.js** version 20 or higher
    - Refer to the [Node.js official documentation](https://nodejs.org/) to download and install the latest version.
    - To check your installed Node.js version:
        
        ```bash
        node -v
        ```
        
- **npm** version 10.9.2 or higher
    - Refer to the [npm official documentation](https://docs.npmjs.com/) for detailed instructions.
    - To check your installed npm version:
        
        ```bash
        npm -v
        ```
    - To globally install or update npm to version 10.9.2:
        
        ```bash
        npm install -g npm@10.9.2
        ```

        After updating, recheck the version using npm -v.

### Installation

1. **Clone the Repository**:
    
    ```bash
    git clone https://github.com/your-username/SafeSwap.git
    cd SafeSwap
    ```
    
2. **Install Dependencies**:
    - Install the global dependencies for the monorepo and its workspaces:
    
    ```bash
    npm install
    ```
    
    This will install all the necessary dependencies for the applications within the `apps/*` subdirectories.

---

### Available Commands

- `npm run dev` - Starts the development server of all applications.
- `npm run build` - Builds the production version of all applications.
- `npm run lint` - Runs the linter configured of all applications.

---

### Managing Dependencies and Running Specific Applications

### Adding Dependencies

If you need to add a dependency to any of the applications within the monorepo, you must navigate to the respective application directory and then install the dependency from there.
    
### Running Specific Applications

Run individual applications directly from the root directory:

1. **Frontend**:
    
    ```bash
    npm run dev:frontend
    ```
    
2. **backend**:
    
    ```bash
    npm run dev:backend
    ```
    
---

### Applications in the Monorepo

The monorepo contains the following applications:

1. **Frontend (Next.js)**
    - Description: The frontend application built with Next.js, providing the user interface for the project.
    - Path: apps/frontend
2. **Backend (Nest.js)**
    - Description: The backend application built with Nest.js, handling business logic and APIs to interact with the frontend and other services.
    - Path: apps/backend

---

## 📚 Documentation

For more details on each of the applications, please refer to the respective README files:

- [Frontend Documentation](apps/frontend/README.md)
- [Backend Documentation](apps/backend/README.md)

### How It Works

1. **Listing a Product**: Sellers can create listings for products. Each listing includes information such as price, description, and images.
2. **Making a Purchase**: Buyers can select a product and initiate a purchase. Funds are transferred to an escrow account on the Stellar blockchain.
3. **Escrow Release**: Upon completion of the agreed-upon conditions, the Trustless Work API triggers the release of funds to the seller’s Stellar account.

## 🤝 Contributing

We appreciate and welcome contributions! To get started, please review our [CONTRIBUTING GUIDELINES](docs/guidelines/CONTRIBUTION_GUIDELINES.md) and [GIT GUIDELINES](docs/guidelines/GIT_GUIDELINES.md) for detailed instructions on how to contribute effectively.

## 🧑‍💻 Authors

- [danielcdz](https://github.com/danielcdz)
- [derianrddev](https://github.com/derianrddev)
- Contributions from the open-source community and OnlyDust

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
