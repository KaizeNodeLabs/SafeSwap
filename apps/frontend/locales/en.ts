import { milestones } from "@/components/seller/mock/milestones.mock";

export const en = {
	common: {
		profile: "Profile",
		myProducts: "My Products",
		transactions: "Transactions",
		settings: "Settings",
		darkMode: "Dark mode",
		language: "Language",
		userMenu: "User Menu",
		connectWallet: "Connect Wallet",
		notifications: "Notifications",
		buy: "Buy Now",
		search: "Search",
		shipTo: "Ship to",
		wallet: {
			title: "Connect Your Wallet",
			description: "Choose a wallet to enable secure transactions on SafeSwap.",
			connect: "Connecting to",
		},

		cart: {
			title: "Shopping Cart",
			empty: "No items in cart",
			total: "Total",
			proceedToCheckout: "Proceed to Checkout",
			removeItem: "Remove item",
			updateQuantity: "Update quantity",
			quantityIncrease: "Increase quantity",
			quantityDecrease: "Decrease quantity",
		},

		footer: {
			builtOn: "Built on Stellar",
			marketplace: "Marketplace",
		},

		notFound: {
			title: "Product Not Found",
			description:
				"Sorry, we couldn't find the product you're looking for. It might have been removed or doesn't exist.",
			browseMarketplace: "Browse Marketplace",
			goHome: "Go Home",
		},

		addProduct: {
			title: "Add New Product",
			name: "Product Name",
			namePlace: "Enter product name",
			description: "Description",
			descriptionPlace: "Enter product description",
			price: "Price",
			pricePlace: "0.00",
			category: "Category",
			categoryPlace: "Select a category",
			categories: {
				electronics: "Electronics",
				furniture: "Furniture",
				appliances: "Appliances",
				sports: "Sports",
			},
			imageUpload: "Image Upload",
			close: "Close",
			save: "Save",
		},

		filters: {
			title: "Filters",
			priceRange: "Price Range",
			categories: {
				title: "Categories",
				electronics: "Electronics",
				furniture: "Furniture",
				appliances: "Appliances",
				sports: "Sports",
			},
		},

		noProducts: {
			title: "No products found",
			description:
				"We couldn't find any products matching your current filters. Try adjusting your search or filters.",
			clearFilters: "Clear all filters",
		},

		features: {
			title: "Built for the Future of Finance",
			subtitle:
				"Leveraging the power of Stellar blockchain to provide a secure, efficient, and truly decentralized trading experience.",
			items: {
				smartContract: {
					title: "Smart Contract Escrow",
					description:
						"Automated protection with Stellar smart contracts. Trustless Work API abstracts the complexities of smart contract configuration. It leverages the blockchain to ensure transactions are secure and transparent, providing fairness without bias in the marketplace. Read more on",
					link: "Trustless Work",
				},
				lightning: {
					title: "Lightning Settlement",
					description: "3-5 second finality on Stellar network",
				},
				nonCustodial: {
					title: "Non-Custodial Trading",
					description: "Keep full control of your assets",
				},
				multiAsset: {
					title: "Multi-Asset Support",
					description: "Trade any Stellar-based token",
				},
				dao: {
					title: "DAO Governance",
					description: "Community-driven protocol decisions",
				},
				analytics: {
					title: "Real-Time Analytics",
					description: "Advanced trading metrics & insights",
				},
			},
		},

		hero: {
			networkStatus: "Live on Stellar Network",
			title: {
				part1: "The Future of",
				part2: "Secure Trading",
			},
			description:
				"Experience trustless trading with built-in Stellar escrow protection. Your gateway to secure, decentralized commerce.",
			exploreButton: "Explore Marketplace",
			stats: {
				status: "Network Status",
				statusValue: "Active",
				volume: "24h Volume",
				volumeValue: "$1.2M",
				gas: "Gas",
				gasValue: "0.001 XLM",
			},
		},

		stats: {
			totalVolume: {
				label: "Total Volume",
				value: "$10M+",
				subtext: "Across all markets",
				change: "+25% this month",
			},
			activeTraders: {
				label: "Active Traders",
				value: "50K+",
				subtext: "Verified users",
				change: "+12% this week",
			},
			successfulTrades: {
				label: "Successful Trades",
				value: "100K+",
				subtext: "With 0 disputes",
				change: "99.9% success rate",
			},
		},

		product: {
			title: "Product",
			category: "Category",
			quantity: "Quantity",
			description: "Description",
			reviews: "/ 5",
			buttons: {
				buy: "Buy Now",
				share: "Share",
				increase: "Increase quantity",
				decrease: "Decrease quantity",
			},
		},
		seller: {
			title: "Ready to start selling?",
			description:
				"Join SafeSwap and reach thousands of potential buyers today!",
			btn_label: "Become a seller",
		},

		createProduct: {
			title: "Sell Product",
			save: "Save",
			formTitle: "Title",
			formDesc: "Description",
			formPrice: "Price",
			formCate: "Category",
			formNoption: "No options found.",
			formUpto: "Images (up to 4)",
		},

		productList: {
			addProduct: "Add Product",
			buy: "Buy Now",
			chatWithSeller: "Chat with Seller",
			currency: "$",
		},

		products: {
			categories: {
				electronics: "Electronics",
				furniture: "Furniture",
				appliances: "Appliances",
				sports: "Sports",
			},
			items: {
				macbook: {
					name: "MacBook Pro 14",
					description: "The new MacBook Pro 14-inch with the M1 Pro chip.",
				},
				galaxy: {
					name: "Samsung Galaxy S24 FE",
					description: "The new Samsung Galaxy S24 FE with 5G support.",
				},
				chair: {
					name: "Ergonomic Chair",
					description: "Ergonomic chair for your home office.",
				},
				coffee: {
					name: "Coffee Maker",
					description: "Coffee maker with built-in grinder.",
				},
				shoes: {
					name: "Running Shoes",
					description: "Running shoes for your daily workout.",
				},
				earbuds: {
					name: "Wireless Earbuds",
					description: "Wireless earbuds with active noise cancellation.",
				},
			},
		},
		featuredProducts: {
			items: {
				"1": { name: "MacBook Pro 14" },
				"2": { name: "Samsung Galaxy S24 FE" },
				"3": { name: "Ergonomic Chair" },
				"4": { name: "Coffee Maker" },
				"5": { name: "Running Shoes" },
				"6": { name: "Wireless Earbuds" },
			},
		},
		featuredProductsTitle: {
			title: "Featured Products",
		},
	},

	marketplace: {
		filters: "Filters",
		priceRange: "Price Range",
		categories: "Categories",
		addToCart: "Add to Cart",
		chatWithSeller: "Chat with Seller",
	},

	ExploreCategories: {
		title: "Explore Categories",
		verTodas: "View All",
	},
	advantagesOfSafeSwap: {
		title: "Powered by Stellar and Trustless Work",
		subtitle:
			"Ensuring secure and transparent transactions with blockchain technology",
		items: {
			trustlessWork: {
				title: "Automated Escrow Protection",
				description:
					"Trustless Work API the complexity of smart contracts, leveraging Stellar to ensure secure, unbiased, and transparent transactions.",
				link: "https://www.trustlesswork.com/",
				buttonName: "Trustless Work",
			},
			introToStellar: {
				title: "Instant Payments with Minimal Fees",
				description:
					"Built on Stellar, SafeSwap enables near-instant transactions with negligible fees, making cross-border payments seamless.",
				link: "https://www.stellar.org/learn/intro-to-stellar",
				buttonName: "Intro to Stellar",
			},
			powerOfStellar: {
				title: "Global Trust & Fairness",
				description:
					"Using Stellar's decentralized ledger, SafeSwap ensures fair transactions without intermediaries, providing equal access for all users.",
				link: "https://www.stellar.org/learn/the-power-of-stellar",
				buttonName: "Power of Stellar",
			},
		},
	},
	howSafeSwapWorks: {
		title: "How SafeSwap Works",
		step1: {
			title: "Browse & Select Products",
			description:
				"Explore our wide range of products and choose what you like.",
		},
		step2: {
			title: "Secure Payment with Escrow",
			description: "Pay safely using our Blockchain-powered escrow system.",
		},
		step3: {
			title: "Receive Your Product Safely",
			description:
				"Get your product delivered and release the payment when satisfied.",
		},
	},

	sellerOnboarding: {
		title: "Start Selling on SafeSwap",
		description:
			"Join our decentralized marketplace and start selling with Stellar escrow. Secure, fast and no storefront needed.",
		form: {
			email: "Email",
			emailPlaceholder: "email@gmail.com",
			wallet: "Stellar Wallet Address",
			walletPlaceholder: "GDDG...P5E7",
			telegram: "Telegram Username (Optional)",
			telegramPlaceholder: "@username",
			country: "Country",
			countryPlaceholder: "Select your country",
			terms: "I agree to the terms and conditions",
			termsDescription:
				"By checking this box, you agree to our Terms of Service and Privacy Policy.",
			submitButton: "Start Selling",
		},
		errors: {
			email: "Email must be in a valid format.",
			wallet:
				"Stellar wallet address must start with 'G' and be 56 characters long.",
			telegram: "Telegram username should start with '@'.",
			country: "Country must be selected before submission.",
			terms: "Checkbox must be checked before submitting.",
		},
	},

	saleDetails: {
		title: "Sale Details",
		copied: "Copied!",
		copyId: "Copy Sale ID",
		print: "Print",
		email: "Email",
		saleId: "Sale ID",
		buyerAddress: "Buyer Address",
		status: "Status",
		dateTime: "Date & Time",
		financialDetails: "Financial Details",
		amount: "Amount",
		fees: "Fees",
		balance: "Balance",
		signRelease: "Sign Release",
		chat: "Chat",
		milestones: "Milestones",
	},

	chat: {
		placeholder: "Write your message...",
	},

	milestones: {
		approve: "Approve",
		complete: "Complete",
		approved: "Approved",
		completed: "Completed",
		pending: "Pending",
		forReview: "For Review",
	},


	shopping: {
		title: "My Shopping",
		tabs: {
			all: "All",
			pending: "Pending",
			ondispute: "On Dispute",
			forreview: "For Review",
			approved: "Approved",
		},
		table: {
			date: "Shopping Date",
			product: "Product Name",
			id: "Shopping ID",
			price: "Price",
			seller: "Seller",
			status: "Escrow Status",
			actions: "Actions",
		},
		orderDetails: {
			title: "Order Details",
			productLabel: "Product",
			idLabel: "Shopping ID",
			dateLabel: "Date",
			priceLabel: "Price",
			sellerLabel: "Seller",
			statusLabel: "Status",
		},
		search: "Search products...",
		total: "Total Shopping",
		buttons: {
			startDispute: "Start dispute",
			approve: "Approve",
			viewDetails: "View Details",
		},
		currency: "$",
      pay: "Pay",
		openDispute: "Open Dispute",
		markAsReceived: "Mark as Received",
		send: "Send",
		typeMessageHero: "Type your message here",
		escrowStatus: {
			pending: "Pending",
			onDispute: "On Dispute",
			forReview: "For Review",
			approved: "Approved",
     },
   },

	Sales: {
		title: "My Sales",
		searchPlaceholder: "Search sales...",
		filters: {
			all: "All",
			pending: "Pending",
			onDispute: "On Dispute",
			forReview: "For Review",
			approved: "Approved",
		},
		table: {
			shoppingDate: "Shopping Date",
			productName: "Product Name",
			shoppingId: "Shopping ID",
			price: "Price",
			buyer: "Buyer",
			escrowStatus: "Escrow Status",
		},
		status: {
			approved: "Approved",
			pending: "Pending",
			onDispute: "On Dispute",
			forReview: "For Review",
		},
		milestones: {
			title: "Milestones",
			date: "Date",
			name: "Name",
			status: "Status",
			actions: "Actions",
			complete: "Complete",
			orderPlaced: "Order Placed",
			paymentConfirmed: "Payment Confirmed",
			productShipped: "Product Shipped",
			deliveryExpected: "Delivery Expected",
		},
		total: "Total Shopping",
		Sales: {
			title: "My Sales",
			searchPlaceholder: "Search sales...",
			filters: {
				all: "All",
				pending: "Pending",
				onDispute: "On Dispute",
				forReview: "For Review",
				approved: "Approved",
			},
			table: {
				shoppingDate: "Shopping Date",
				productName: "Product Name",
				shoppingId: "Shopping ID",
				price: "Price",
				buyer: "Buyer",
				escrowStatus: "Escrow Status",
			},
			status: {
				approved: "Approved",
				pending: "Pending",
				onDispute: "On Dispute",
				forReview: "For Review",
			},
			milestones: {
				title: "Milestones",
				date: "Date",
				name: "Name",
				status: "Status",
				actions: "Actions",
				complete: "Complete",

				items: {
					orderPlaced: "Order Placed",
					paymentConfirmed: "Payment Confirmed",
					productShipped: "Product Shipped",
					deliveryExpected: "Delivery Expected",
				},
			},
			total: "Total Shopping",
		},
	},

	testimonials: {
		title: "What Our Users Say",
	},
	filters: {
		title: " Filter",
		header: "Filters",
		condition: "Condition",
		sortBy: {
			suggested: "Suggested",
			distance: "Distance: Nearest first",
			dateListed: "Date listed: Newest first",
			highPrice: "Price: Highest first",
			lowPrice: "Price: Lowest first",
		},
		dateListed: {
			all: "All",
			last24Hours: "Last 24 hours",
			last7Days: "Last 7 days",
			last30Days: "Last 30 days",
		},
		price: {
			minPrice: "Min price",
			maxPrice: "Max price",
		},
		deliveryMethod: {
			all: "All",
			localPickUp: "Local Pickup",
			delivery: "Shipping",
		},
		button: {
			reset: "Reset",
			applyFilters: "Apply Filters",
		},
		conditions: {
			new: "New",
			likeNew: "like New",
			good: "Good",
			fair: "Fair",
		},
	},

	// Add more sections as needed
};
