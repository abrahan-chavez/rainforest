export const mockProducts = [{
  id: "prod_1",
  name: "Limited Edition Rainforrest T-Shirt",
  description: "Soft cotton t-shirt featuring the Rainforrest logo. Perfect for showing off your mining prowess.",
  priceUSD: 25,
  hashesRequired: 250000,
  image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
}, {
  id: "prod_2",
  name: "Crypto Mining Sticker Pack",
  description: "A set of 5 high-quality vinyl stickers with mining-themed designs.",
  priceUSD: 10,
  hashesRequired: 100000,
  image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
}, {
  id: "prod_3",
  name: "Rainforrest Coffee Mug",
  description: "Ceramic mug perfect for those long mining sessions. Holds 12oz of your favorite beverage.",
  priceUSD: 15,
  hashesRequired: 150000,
  image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
}, {
  id: "prod_4",
  name: "Proof-of-Work Hoodie",
  description: "Stay warm while you mine with this comfortable hoodie featuring a unique blockchain design.",
  priceUSD: 45,
  hashesRequired: 450000,
  image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
}, {
  id: "prod_5",
  name: "Mining Hardware Toolkit",
  description: "Essential tools for maintaining your mining rigs, includes screwdrivers, thermal paste, and cable ties.",
  priceUSD: 35,
  hashesRequired: 350000,
  image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
}, {
  id: "prod_6",
  name: "Blockchain Notebook",
  description: "Premium hardcover notebook for jotting down your crypto ideas and mining strategies.",
  priceUSD: 12,
  hashesRequired: 120000,
  image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
}];
export const mockOrders = [{
  id: "order_1234",
  productId: "prod_1",
  email: "user@example.com",
  address: "123 Mining St, Crypto City, CC 12345",
  status: "mining",
  progress: 65,
  stratumUrl: "stratum+tcp://mine.rainforrest.local:3333",
  workerName: "worker_1234"
}, {
  id: "order_5678",
  productId: "prod_3",
  email: "miner@example.com",
  address: "456 Blockchain Ave, Hash Town, HT 67890",
  status: "completed",
  progress: 100,
  stratumUrl: "stratum+tcp://mine.rainforrest.local:3333",
  workerName: "worker_5678"
}];