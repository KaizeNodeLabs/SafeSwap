import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

const categories = [
	{
		name: "Electronics",
		imageUrl:
			"https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Home & Kitchen",
		imageUrl:
			"https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Fashion",
		imageUrl:
			"https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Sports & Outdoors",
		imageUrl:
			"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Beauty & Health",
		imageUrl:
			"https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Toys & Games",
		imageUrl:
			"https://images.unsplash.com/photo-1516981879613-9f5da904015f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Automotive",
		imageUrl:
			"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
	{
		name: "Books & Media",
		imageUrl:
			"https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
	},
];

const products = [
	// Electronics
	{
		name: 'MacBook Pro 16"',
		description: "Apple M2 Pro chip, 16GB RAM, 512GB SSD, Space Gray",
		price: 2499.99,
		categoryName: "Electronics",
		images: [
			"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1494173853739-c21f58b16055?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "iPhone 15 Pro",
		description:
			"A17 Pro chip, 256GB storage, Titanium finish, Super Retina XDR display",
		price: 1099.99,
		categoryName: "Electronics",
		images: [
			"https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1589966468233-6befb2faa37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1512446816042-444d641267d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Samsung QLED 4K Smart TV",
		description: "65-inch QLED display, Quantum HDR, built-in voice assistants",
		price: 1299.99,
		categoryName: "Electronics",
		images: [
			"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Sony WH-1000XM5 Headphones",
		description:
			"Wireless noise-cancelling headphones with exceptional sound quality",
		price: 349.99,
		categoryName: "Electronics",
		images: [
			"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},

	// Home & Kitchen
	{
		name: "KitchenAid Stand Mixer",
		description: "5-quart tilt-head stand mixer with 10 speeds and dough hook",
		price: 379.99,
		categoryName: "Home & Kitchen",
		images: [
			"https://images.unsplash.com/photo-1617059063772-34532796cdb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1578738288760-05ce9be719d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Dyson V12 Cordless Vacuum",
		description:
			"Lightweight, powerful vacuum with HEPA filtration and up to 60 minutes of runtime",
		price: 499.99,
		categoryName: "Home & Kitchen",
		images: [
			"https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Modern Velvet Sofa",
		description:
			"3-seater velvet sofa with solid wood legs in mid-century modern design",
		price: 899.99,
		categoryName: "Home & Kitchen",
		images: [
			"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1558211583-d26f610c1eb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},

	// Fashion
	{
		name: "Men's Classic Oxford Shirt",
		description: "100% cotton, button-down collar, slim fit",
		price: 59.99,
		categoryName: "Fashion",
		images: [
			"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Women's Cashmere Sweater",
		description: "Soft 100% cashmere sweater with crew neck",
		price: 149.99,
		categoryName: "Fashion",
		images: [
			"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Leather Ankle Boots",
		description:
			"Genuine leather boots with zipper closure and memory foam insole",
		price: 129.99,
		categoryName: "Fashion",
		images: [
			"https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},

	// Sports & Outdoors
	{
		name: "Yoga Mat Premium",
		description:
			"Eco-friendly, non-slip yoga mat with carrying strap, 6mm thick",
		price: 78.99,
		categoryName: "Sports & Outdoors",
		images: [
			"https://images.unsplash.com/photo-1517637382994-f02da38c6728?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Mountain Bike",
		description:
			"Aluminum frame mountain bike with 21 speeds and front suspension",
		price: 599.99,
		categoryName: "Sports & Outdoors",
		images: [
			"https://images.unsplash.com/photo-1575585269294-7d28dd912db8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Camping Tent 4-Person",
		description: "Waterproof, easy setup tent with mesh windows and rainfly",
		price: 169.99,
		categoryName: "Sports & Outdoors",
		images: [
			"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},

	// Beauty & Health
	{
		name: "Vitamin C Serum",
		description: "Brightening serum with 20% vitamin C and hyaluronic acid",
		price: 34.99,
		categoryName: "Beauty & Health",
		images: [
			"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Smart Fitness Watch",
		description:
			"Water-resistant fitness tracker with heart rate monitor and sleep tracking",
		price: 129.99,
		categoryName: "Beauty & Health",
		images: [
			"https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1589966468233-6befb2faa37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1512446816042-444d641267d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Hair Care Set",
		description: "Shampoo, conditioner, and hair mask with argan oil",
		price: 45.99,
		categoryName: "Beauty & Health",
		images: [
			"https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1589966468233-6befb2faa37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1512446816042-444d641267d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},

	// Toys & Games
	{
		name: "Board Game Collection",
		description: "Set of 3 classic board games for family game night",
		price: 49.99,
		categoryName: "Toys & Games",
		images: [
			"https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Remote Control Car",
		description: "High-speed RC car with rechargeable battery",
		price: 69.99,
		categoryName: "Toys & Games",
		images: [
			"https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1589966468233-6befb2faa37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1512446816042-444d641267d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Building Blocks Set",
		description:
			"1000-piece creative building blocks compatible with major brands",
		price: 39.99,
		categoryName: "Toys & Games",
		images: [
			"https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1558060370-d644485927b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1516981879613-9f5da904015f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},

	// Automotive
	{
		name: "Car Phone Mount",
		description: "Universal dashboard mount with 360-degree rotation",
		price: 24.99,
		categoryName: "Automotive",
		images: [
			"https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1589966468233-6befb2faa37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1512446816042-444d641267d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Portable Car Vacuum",
		description:
			"Cordless handheld vacuum with strong suction for car interiors",
		price: 59.99,
		categoryName: "Automotive",
		images: [
			"https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1589966468233-6befb2faa37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1512446816042-444d641267d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Motorcycle Helmet",
		description: "DOT-approved full-face helmet with anti-fog visor",
		price: 189.99,
		categoryName: "Automotive",
		images: [
			"https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1589966468233-6befb2faa37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1512446816042-444d641267d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},

	// Books & Media
	{
		name: "Best-Selling Fiction Collection",
		description: "Set of 5 popular fiction novels from top authors",
		price: 79.99,
		categoryName: "Books & Media",
		images: [
			"https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Vinyl Record Player",
		description:
			"Modern turntable with built-in speakers and Bluetooth connectivity",
		price: 149.99,
		categoryName: "Books & Media",
		images: [
			"https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1525459819821-1c2d33189e23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1533575349875-5f372f88e25b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Classic Film Collection",
		description: "10 remastered classic films on Blu-ray",
		price: 99.99,
		categoryName: "Books & Media",
		images: [
			"https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},

	{
		name: "Wireless Earbuds",
		description:
			"True wireless earbuds with active noise cancellation and 24-hour battery life",
		price: 129.99,
		categoryName: "Electronics",
		images: [
			"https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1608156639585-b3a032e70778?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
	{
		name: "Smart Home Speaker",
		description:
			"Voice-controlled smart speaker with premium sound and virtual assistant",
		price: 199.99,
		categoryName: "Electronics",
		images: [
			"https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1589966468233-6befb2faa37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
			"https://images.unsplash.com/photo-1512446816042-444d641267d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		],
	},
];

async function main() {
	console.log("Start seeding...");

	// Create categories if they don't exist
	for (const category of categories) {
		const existingCategory = await prisma.category.findUnique({
			where: { name: category.name },
		});

		if (!existingCategory) {
			await prisma.category.create({
				data: category,
			});
			console.log(`Created category: ${category.name}`);
		} else {
			console.log(`Category already exists: ${category.name}`);
		}
	}

	// Create products and their images if they don't exist
	for (const product of products) {
		const slug = slugify(product.name, { lower: true });

		const category = await prisma.category.findUnique({
			where: { name: product.categoryName },
		});

		if (!category) {
			console.error(`Category not found: ${product.categoryName}`);
			continue;
		}

		const existingProduct = await prisma.product.findUnique({
			where: { slug },
		});

		if (!existingProduct) {
			// Create the product
			const createdProduct = await prisma.product.create({
				data: {
					name: product.name,
					slug,
					description: product.description,
					price: product.price,
					categoryId: category.id,
				},
			});

			console.log(`Created product: ${product.name}`);

			// Create product images
			for (const imageUrl of product.images) {
				await prisma.productImage.create({
					data: {
						imageUrl,
						productId: createdProduct.id,
					},
				});
			}

			console.log(
				`Added ${product.images.length} images for product: ${product.name}`,
			);
		} else {
			console.log(`Product already exists: ${product.name}`);

			const existingImages = await prisma.productImage.findMany({
				where: { productId: existingProduct.id },
			});

			if (existingImages.length === 0) {
				for (const imageUrl of product.images) {
					await prisma.productImage.create({
						data: {
							imageUrl,
							productId: existingProduct.id,
						},
					});
				}

				console.log(
					`Added ${product.images.length} images for existing product: ${product.name}`,
				);
			}
		}
	}

	console.log("Seeding finished.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
