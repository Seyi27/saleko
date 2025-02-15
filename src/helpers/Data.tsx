import { img1, img2, img3, img4, img5, img6 } from "../assets/images";

export const negotiableData = [
  {
    id: 1,
    name: "Smartphone X",
    description: "A flagship smartphone with cutting-edge technology.",
    price: "799.99",
    image: [img1, img2, img3, img4, img5],
    category: "Electronics",
    subCategory: ["Mobile Phones", "Smart Devices"],
    sizes: ["Standard"],
    date: "2024-12-01",
    rating: 4.8,
    bestseller: true,
  },
  {
    id: 2,
    name: "Gaming Laptop Z",
    description: "A high-performance laptop for gaming enthusiasts.",
    price: "1299.99",
    image: [img3, img5, img2, img1],
    category: "Computers",
    subCategory: ["Laptops", "Gaming"],
    sizes: ["15-inch", "17-inch"],
    date: "2024-11-20",
    rating: 4.7,
    bestseller: true,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description: "Compact earbuds with superior sound quality.",
    price: "99.99",
    image: [img6, img4, img2, img1],
    category: "Audio",
    subCategory: ["Accessories", "Wearables"],
    sizes: ["One Size"],
    date: "2024-12-05",
    rating: 4.6,
    bestseller: false,
  },
  {
    id: 4,
    name: "Smartwatch Pro",
    description: "A feature-packed smartwatch for your daily needs.",
    price: "199.99",
    image: [img3, img5, img2, img1],
    category: "Wearables",
    subCategory: ["Watches", "Smart Devices"],
    sizes: ["Small", "Medium", "Large"],
    date: "2024-12-03",
    rating: 4.5,
    bestseller: true,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    description: "Portable speaker with rich bass and long battery life.",
    price: "49.99",
    image: [img5, img2, img1, img1, img6],
    category: "Audio",
    subCategory: ["Speakers", "Accessories"],
    sizes: ["Standard"],
    date: "2024-12-06",
    rating: 4.4,
    bestseller: false,
  },
  {
    id: 6,
    name: "4K Television",
    description: "Ultra HD TV with vibrant picture quality.",
    price: "999.99",
    image: [img3, img3, img4, img1, img2],
    category: "Home Electronics",
    subCategory: ["Television", "Entertainment"],
    sizes: ["55-inch", "65-inch", "75-inch"],
    date: "2024-11-15",
    rating: 4.8,
    bestseller: true,
  },
  {
    id: 7,
    name: "Noise-Cancelling Headphones",
    description: "Experience immersive sound with noise cancellation.",
    price: "199.99",
    image: [img3, img5, img2, img1],
    category: "Audio",
    subCategory: ["Headphones", "Accessories"],
    sizes: ["One Size"],
    date: "2024-11-25",
    rating: 4.7,
    bestseller: true,
  },
  {
    id: 8,
    name: "Fitness Tracker",
    description: "Track your fitness goals with accuracy.",
    price: "49.99",
    image: [img5, img2, img1, img1, img6],
    category: "Wearables",
    subCategory: ["Health", "Accessories"],
    sizes: ["Small", "Medium", "Large"],
    date: "2024-12-02",
    rating: 4.3,
    bestseller: false,
  },
  {
    id: 9,
    name: "Gaming Console",
    description: "Next-gen gaming console for an immersive experience.",
    price: "499.99",
    image: [img3, img3, img4, img1, img2],
    category: "Gaming",
    subCategory: ["Consoles", "Entertainment"],
    sizes: ["Standard"],
    date: "2024-12-10",
    rating: 4.9,
    bestseller: true,
  },
  {
    id: 10,
    name: "Electric Scooter",
    description: "Eco-friendly scooter for urban commuting.",
    price: "299.99",
    image: [img5, img2, img1, img1, img6],
    category: "Transportation",
    subCategory: ["Electric Vehicles", "Commuting"],
    sizes: ["Standard"],
    date: "2024-11-30",
    rating: 4.6,
    bestseller: true,
  },
  {
    id: 11,
    name: "Drone X",
    description:
      "High-performance drone with a 4K camera for aerial photography.",
    price: "599.99",
    image: [img5, img4, img3, img2, img1],
    category: "Electronics",
    subCategory: ["Cameras", "Aerial Devices"],
    sizes: ["Standard"],
    date: "2024-12-12",
    rating: 4.7,
    bestseller: true,
  },
  {
    id: 12,
    name: "Digital Camera",
    description:
      "Compact digital camera with optical zoom and high resolution.",
    price: "299.99",
    image: [img3, img2, img6, img2, img5],
    category: "Photography",
    subCategory: ["Cameras", "Accessories"],
    sizes: ["Standard"],
    date: "2024-11-18",
    rating: 4.5,
    bestseller: false,
  },
  {
    id: 13,
    name: "Smart Refrigerator",
    description: "Revolutionize your kitchen with smart technology.",
    price: "1499.99",
    image: [img6, img2, img1, img4, img5],
    category: "Home Appliances",
    subCategory: ["Refrigerators", "Smart Home"],
    sizes: ["Standard"],
    date: "2024-12-04",
    rating: 4.9,
    bestseller: true,
  },
  {
    id: 14,
    name: "Electric Kettle",
    description: "Fast-boil electric kettle with a sleek design.",
    price: "49.99",
    image: [img4, img2, img2, img4, img6],
    category: "Kitchen Appliances",
    subCategory: ["Kettles", "Home Essentials"],
    sizes: ["One Size"],
    date: "2024-11-22",
    rating: 4.4,
    bestseller: false,
  },
  {
    id: 15,
    name: "Air Purifier",
    description: "Breathe fresh air with advanced purification technology.",
    price: "199.99",
    image: [img5, img2, img2, img4, img6],
    category: "Home Appliances",
    subCategory: ["Air Quality", "Smart Home"],
    sizes: ["Standard"],
    date: "2024-11-29",
    rating: 4.6,
    bestseller: true,
  },
  {
    id: 16,
    name: "Running Shoes",
    description: "Comfortable and durable running shoes for athletes.",
    price: "89.99",
    image: [img1, img2, img3, img6, img6],
    category: "Footwear",
    subCategory: ["Sports", "Men's Footwear"],
    sizes: ["8", "9", "10", "11"],
    date: "2024-12-07",
    rating: 4.3,
    bestseller: false,
  },
  {
    id: 17,
    name: "Leather Backpack",
    description: "Stylish leather backpack for work or travel.",
    price: "149.99",
    image: [img5, img2, img2, img4, img6],
    category: "Bags",
    subCategory: ["Travel", "Accessories"],
    sizes: ["Standard"],
    date: "2024-12-01",
    rating: 4.5,
    bestseller: true,
  },
  {
    id: 18,
    name: "Electric Toothbrush",
    description: "Smart electric toothbrush with multiple cleaning modes.",
    price: "59.99",
    image: [img1, img2, img3, img4, img5],
    category: "Health",
    subCategory: ["Dental Care", "Smart Devices"],
    sizes: ["One Size"],
    date: "2024-11-27",
    rating: 4.4,
    bestseller: false,
  },
  {
    id: 19,
    name: "Yoga Mat",
    description: "Eco-friendly yoga mat with excellent grip and cushioning.",
    price: "29.99",
    image: [img4, img2, img2, img4, img5],
    category: "Fitness",
    subCategory: ["Exercise", "Accessories"],
    sizes: ["Standard"],
    date: "2024-12-03",
    rating: 4.2,
    bestseller: false,
  },
  {
    id: 20,
    name: "Luxury Watch",
    description: "Elegant luxury watch with a timeless design.",
    price: "999.99",
    image: [img5, img3, img1, img4, img6],
    category: "Accessories",
    subCategory: ["Watches", "Luxury"],
    sizes: ["Standard"],
    date: "2024-12-14",
    rating: 4.8,
    bestseller: true,
  },
];

// export const productData = [
//   {
//     name: "Wireless Earbuds",
//     rating: 2.5,
//     description:
//       "High-quality wireless earbuds with noise cancellation and long battery life.",
//     price: "19,000",
//     former_price: "100,000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Smartphone Stand",
//     rating: 4.2,
//     description:
//       "Adjustable and foldable stand for smartphones and tablets, perfect for desk use.",
//     price: "20,000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Stainless Steel Water Bottle",
//     rating: 4.8,
//     description:
//       "Eco-friendly stainless steel water bottle with double-wall insulation.",
//     price: "12,000",
//     former_price: "50,000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Bluetooth Speaker",
//     rating: 4.6,
//     description:
//       "Compact and portable Bluetooth speaker with deep bass and crisp sound.",
//     price: "39.95",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Gaming Mouse",
//     rating: 4.3,
//     description:
//       "Ergonomic gaming mouse with customizable buttons and RGB lighting.",
//     price: "29,000.99",
//     former_price: "30,000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Yoga Mat",
//     rating: 4.7,
//     description:
//       "Non-slip yoga mat with extra cushioning and durability for all practices.",
//     price: "25.0",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "LED Desk Lamp",
//     rating: 4.4,
//     description:
//       "Energy-efficient LED desk lamp with adjustable brightness and color temperature.",
//     price: "18,000.75",
//     former_price: "30,000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Noise-Cancelling Headphones",
//     rating: 4.9,
//     description:
//       "Over-ear noise-cancelling headphones with superior sound quality and comfort.",
//     price: "89.99",
//     former_price: "30,000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Fitness Tracker",
//     rating: 4.1,
//     description:
//       "Wearable fitness tracker with heart rate monitor, step counter, and sleep tracking.",
//     price: "59.99",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Coffee Maker",
//     rating: 4.5,
//     description:
//       "Programmable coffee maker with a built-in grinder and customizable brew strength.",
//     price: "99.0",
//     former_price: "50,000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Wireless Charger",
//     rating: 4.3,
//     description:
//       "Fast wireless charger compatible with all Qi-enabled devices.",
//     price: "19.99",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Laptop Backpack",
//     rating: 4.6,
//     description:
//       "Water-resistant laptop backpack with multiple compartments and USB charging port.",
//     price: "35.0",
//     former_price: "130,000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Digital Alarm Clock",
//     rating: 4.2,
//     description:
//       "LED digital alarm clock with adjustable brightness and dual alarm settings.",
//     price: "17.5",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Smart Thermostat",
//     rating: 4.8,
//     description:
//       "Wi-Fi-enabled smart thermostat with remote control and energy-saving features.",
//     price: "129.99",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Electric Kettle",
//     rating: 4.5,
//     description:
//       "Stainless steel electric kettle with auto shut-off and fast boiling technology.",
//     price: "27.99",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Kitchen Knife Set",
//     rating: 4.7,
//     description:
//       "Professional-grade stainless steel knife set with ergonomic handles.",
//     price: "19000",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Portable Power Bank",
//     rating: 4.4,
//     description:
//       "High-capacity portable power bank with fast charging and dual USB ports.",
//     price: "24.95",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Action Camera",
//     rating: 4.6,
//     description:
//       "Waterproof action camera with 4K recording and wide-angle lens.",
//     price: "89.0",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Cordless Vacuum Cleaner",
//     rating: 4.7,
//     description:
//       "Lightweight and powerful cordless vacuum cleaner with HEPA filtration.",
//     price: "129.99",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
//   {
//     name: "Electric Toothbrush",
//     rating: 4.5,
//     description:
//       "Rechargeable electric toothbrush with multiple cleaning modes.",
//     price: "39.95",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
//   },
// ];

export const productData = [
  {
    id: 1,
    name: "Smartphone X",
    description: "A flagship smartphone with cutting-edge technology.",
    price: "799.99",
    image: [img1, img2, img3, img4, img5],
    category: "Electronics",
    subCategory: ["Mobile Phones", "Smart Devices"],
    sizes: ["Standard"],
    date: "2024-12-01",
    rating: 4.8,
    bestseller: true,
  },
  {
    id: 2,
    name: "Gaming Laptop Z",
    description: "A high-performance laptop for gaming enthusiasts.",
    price: "1299.99",
    former_price: "1499.99",
    image: [img3, img5, img2, img1],
    category: "Computers",
    subCategory: ["Laptops", "Gaming"],
    sizes: ["15-inch", "17-inch"],
    date: "2024-11-20",
    rating: 4.7,
    bestseller: true,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description: "Compact earbuds with superior sound quality.",
    price: "99.99",
    image: [img6, img4, img2, img1],
    category: "Audio",
    subCategory: ["Accessories", "Wearables"],
    sizes: ["One Size"],
    date: "2024-12-05",
    rating: 4.6,
    bestseller: false,
  },
  {
    id: 4,
    name: "Smartwatch Pro",
    description: "A feature-packed smartwatch for your daily needs.",
    price: "199.99",
    image: [img3, img5, img2, img1],
    category: "Wearables",
    subCategory: ["Watches", "Smart Devices"],
    sizes: ["Small", "Medium", "Large"],
    date: "2024-12-03",
    rating: 4.5,
    bestseller: true,
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    description: "Portable speaker with rich bass and long battery life.",
    price: "49.99",
    former_price: "69.99",
    image: [img5, img2, img1, img1, img6],
    category: "Audio",
    subCategory: ["Speakers", "Accessories"],
    sizes: ["Standard"],
    date: "2024-12-06",
    rating: 4.4,
    bestseller: false,
  },
  {
    id: 6,
    name: "4K Television",
    description: "Ultra HD TV with vibrant picture quality.",
    price: "999.99",
    image: [img3, img3, img4, img1, img2],
    category: "Home Electronics",
    subCategory: ["Television", "Entertainment"],
    sizes: ["55-inch", "65-inch", "75-inch"],
    date: "2024-11-15",
    rating: 4.8,
    bestseller: true,
  },
  {
    id: 7,
    name: "Noise-Cancelling Headphones",
    description: "Experience immersive sound with noise cancellation.",
    price: "199.99",
    former_price: "249.99",
    image: [img3, img5, img2, img1],
    category: "Audio",
    subCategory: ["Headphones", "Accessories"],
    sizes: ["One Size"],
    date: "2024-11-25",
    rating: 4.7,
    bestseller: true,
  },
  {
    id: 8,
    name: "Fitness Tracker",
    description: "Track your fitness goals with accuracy.",
    price: "49.99",
    image: [img5, img2, img1, img1, img6],
    category: "Wearables",
    subCategory: ["Health", "Accessories"],
    sizes: ["Small", "Medium", "Large"],
    date: "2024-12-02",
    rating: 4.3,
    bestseller: false,
  },
  {
    id: 9,
    name: "Gaming Console",
    description: "Next-gen gaming console for an immersive experience.",
    price: "499.99",
    former_price: "599.99",
    image: [img3, img3, img4, img1, img2],
    category: "Gaming",
    subCategory: ["Consoles", "Entertainment"],
    sizes: ["Standard"],
    date: "2024-12-10",
    rating: 4.9,
    bestseller: true,
  },
  {
    id: 10,
    name: "Electric Scooter",
    description: "Eco-friendly scooter for urban commuting.",
    price: "299.99",
    image: [img5, img2, img1, img1, img6],
    category: "Transportation",
    subCategory: ["Electric Vehicles", "Commuting"],
    sizes: ["Standard"],
    date: "2024-11-30",
    rating: 4.6,
    bestseller: true,
  },
  {
    id: 11,
    name: "Drone X",
    description:
      "High-performance drone with a 4K camera for aerial photography.",
    price: "599.99",
    former_price: "699.99",
    image: [img5, img4, img3, img2, img1],
    category: "Electronics",
    subCategory: ["Cameras", "Aerial Devices"],
    sizes: ["Standard"],
    date: "2024-12-12",
    rating: 4.7,
    bestseller: true,
  },
  {
    id: 12,
    name: "Digital Camera",
    description:
      "Compact digital camera with optical zoom and high resolution.",
    price: "299.99",
    image: [img3, img2, img6, img2, img5],
    category: "Photography",
    subCategory: ["Cameras", "Accessories"],
    sizes: ["Standard"],
    date: "2024-11-18",
    rating: 4.5,
    bestseller: false,
  },
  {
    id: 13,
    name: "Smart Refrigerator",
    description: "Revolutionize your kitchen with smart technology.",
    price: "1499.99",
    former_price: "1799.99",
    image: [img6, img2, img1, img4, img5],
    category: "Home Appliances",
    subCategory: ["Refrigerators", "Smart Home"],
    sizes: ["Standard"],
    date: "2024-12-04",
    rating: 4.9,
    bestseller: true,
  },
  {
    id: 14,
    name: "Electric Kettle",
    description: "Fast-boil electric kettle with a sleek design.",
    price: "49.99",
    image: [img4, img2, img2, img4, img6],
    category: "Kitchen Appliances",
    subCategory: ["Kettles", "Home Essentials"],
    sizes: ["One Size"],
    date: "2024-11-22",
    rating: 4.4,
    bestseller: false,
  },
  {
    id: 15,
    name: "Air Purifier",
    description: "Breathe fresh air with advanced purification technology.",
    price: "199.99",
    former_price: "229.99",
    image: [img5, img2, img2, img4, img6],
    category: "Home Appliances",
    subCategory: ["Air Quality", "Smart Home"],
    sizes: ["Standard"],
    date: "2024-11-29",
    rating: 4.6,
    bestseller: true,
  },
  {
    id: 16,
    name: "Running Shoes",
    description: "Comfortable and durable running shoes for athletes.",
    price: "89.99",
    image: [img1, img2, img3, img6, img6],
    category: "Footwear",
    subCategory: ["Sports", "Men's Footwear"],
    sizes: ["8", "9", "10", "11"],
    date: "2024-12-07",
    rating: 4.3,
    bestseller: false,
  },
  {
    id: 17,
    name: "Leather Backpack",
    description: "Stylish leather backpack for work or travel.",
    price: "149.99",
    image: [img5, img2, img2, img4, img6],
    category: "Bags",
    subCategory: ["Travel", "Accessories"],
    sizes: ["Standard"],
    date: "2024-12-01",
    rating: 4.5,
    bestseller: true,
  },
  {
    id: 18,
    name: "Electric Toothbrush",
    description: "Smart electric toothbrush with multiple cleaning modes.",
    price: "59.99",
    former_price: "79.99",
    image: [img1, img2, img3, img4, img5],
    category: "Health",
    subCategory: ["Dental Care", "Smart Devices"],
    sizes: ["One Size"],
    date: "2024-11-27",
    rating: 4.4,
    bestseller: false,
  },
  {
    id: 19,
    name: "Yoga Mat",
    description: "Eco-friendly yoga mat with excellent grip and cushioning.",
    price: "29.99",
    image: [img4, img2, img2, img4, img5],
    category: "Fitness",
    subCategory: ["Exercise", "Accessories"],
    sizes: ["Standard"],
    date: "2024-12-03",
    rating: 4.2,
    bestseller: false,
  },
  {
    id: 20,
    name: "Luxury Watch",
    description: "Elegant luxury watch with a timeless design.",
    price: "999.99",
    former_price: "1199.99",
    image: [img5, img3, img1, img4, img6],
    category: "Accessories",
    subCategory: ["Watches", "Luxury"],
    sizes: ["Standard"],
    date: "2024-12-14",
    rating: 4.8,
    bestseller: true,
  },

  {
    id: 21,
    name: "Luxury Watch",
    description: "Elegant luxury watch with a timeless design.",
    price: "999.99",
    image: [img5, img3, img1, img4, img6],
    category: "Accessories",
    subCategory: ["Watches", "Luxury"],
    sizes: ["Standard"],
    date: "2024-12-14",
    rating: 4.8,
    bestseller: true,
  },

  {
    id: 22,
    name: "Luxury Watch",
    description: "Elegant luxury watch with a timeless design.",
    price: "999.99",
    image: [img5, img3, img1, img4, img6],
    category: "Accessories",
    subCategory: ["Watches", "Luxury"],
    sizes: ["Standard"],
    date: "2024-12-14",
    rating: 4.8,
    bestseller: true,
  },
];

export const bestSellerData = [
  {
    id: 1,
    name: "Wireless Earbuds",
    rating: 2.5,
    description:
      "High-quality wireless earbuds with noise cancellation and long battery life.",
    price: "19,000",
    former_price: "100,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-31T23:59:59",
  },
  {
    id: 2,
    name: "Smartphone Stand",
    rating: 4.2,
    description:
      "Adjustable and foldable stand for smartphones and tablets, perfect for desk use.",
    price: "20,000",
    former_price: "80,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-29T23:59:59",
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    rating: 4.8,
    description:
      "Eco-friendly stainless steel water bottle with double-wall insulation.",
    price: "12,000",
    former_price: "50,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-27T23:59:59",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    rating: 4.6,
    description:
      "Compact and portable Bluetooth speaker with deep bass and crisp sound.",
    price: "39,000.95",
    former_price: "40,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-25T23:59:59",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    rating: 4.3,
    description:
      "Ergonomic gaming mouse with customizable buttons and RGB lighting.",
    price: "29,000.99",
    former_price: "30,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-23T23:59:59",
  },
  {
    id: 6,
    name: "Yoga Mat",
    rating: 4.7,
    description:
      "Non-slip yoga mat with extra cushioning and durability for all practices.",
    price: "2,500.0",
    former_price: "10,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-21T23:59:59",
  },
  {
    id: 7,
    name: "LED Desk Lamp",
    rating: 4.4,
    description:
      "Energy-efficient LED desk lamp with adjustable brightness and color temperature.",
    price: "18,000.75",
    former_price: "30,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-19T23:59:59",
  },
  {
    id: 8,
    name: "Noise-Cancelling Headphones",
    rating: 4.9,
    description:
      "Over-ear noise-cancelling headphones with superior sound quality and comfort.",
    price: "89.99",
    former_price: "30,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-17T23:59:59",
  },
  {
    id: 9,
    name: "Fitness Tracker",
    rating: 4.1,
    description:
      "Wearable fitness tracker with heart rate monitor, step counter, and sleep tracking.",
    price: "59,000.99",
    former_price: "100,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-15T23:59:59",
  },
  {
    id: 10,
    name: "Coffee Maker",
    rating: 4.5,
    description:
      "Programmable coffee maker with a built-in grinder and customizable brew strength.",
    price: "99,000.0",
    former_price: "150,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-15T23:59:59",
  },
  {
    id: 11,
    name: "Wireless Charger",
    rating: 4.3,
    description:
      "Fast wireless charger compatible with all Qi-enabled devices.",
    price: "15,000.99",
    former_price: "20,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-13T23:59:59",
  },
  {
    id: 12,
    name: "Laptop Backpack",
    rating: 4.6,
    description:
      "Water-resistant laptop backpack with multiple compartments and USB charging port.",
    price: "35,000.0",
    former_price: "130,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-11T23:59:59",
  },
  {
    id: 13,
    name: "Digital Alarm Clock",
    rating: 4.2,
    description:
      "LED digital alarm clock with adjustable brightness and dual alarm settings.",
    price: "17,000.5",
    former_price: "20,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-09T23:59:59",
  },
  {
    id: 14,
    name: "Smart Thermostat",
    rating: 4.8,
    description:
      "Wi-Fi-enabled smart thermostat with remote control and energy-saving features.",
    price: "129,000.99",
    former_price: "200,000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXvFGX8_ADclqgSMV4-j4bPGfUVQN-Ipjp7l7cDbaxoqIoXc3lp552Tg&s",
    targetDate: "2025-01-07T23:59:59",
  },
];


export const storeData = [
  {
    name: "Mike stores",
    orders: "10,000",
  },
  {
    name: "Book stores",
    orders: "100",
  },
  {
    name: "Cookie stores",
    orders: "6,000",
  },
  {
    name: "Jersey stores",
    orders: "10",
  },
  {
    name: "Milk stores",
    orders: "2,000",
  },
  {
    name: "Mimi stores",
    orders: "10,000",
  },
  {
    name: "Caleb stores",
    orders: "10,000",
  },
  {
    name: "Matthew stores",
    orders: "10,000",
  },
  {
    name: "kofo stores",
    orders: "10,000",
  },
];





export const features = [
  {
    feature:
      "Durable leather is easily cleanable so you can keep your look fresh.",
  },
  {
    feature:
      "Water-repellent finish and internal membrane help keep your feet dry.",
  },
  { feature: "Toe piece with star pattern adds durability." },
  { feature: "Synthetic insulation helps keep you warm." },
  {
    feature:
      "Originally designed for performance hoops, the Air unit delivers lightweight cushioning.",
  },
  {
    feature:
      "Plush tongue wraps over the ankle to help keep out the moisture and cold.",
  },
  {
    feature:
      "Rubber outsole with aggressive traction pattern adds durable grip.",
  },
  {
    feature:
      "Durable leather is easily cleanable so you can keep your look fresh.",
  },
];

export const productReviews = [
  {
    title: "Amazing Product!",
    rating: 5,
    review:
      "This product exceeded my expectations. The quality is top-notch, and it works perfectly!",
    date: "2024-12-01",
    person: "Alice Johnson",
  },
  {
    title: "Good Value for Money",
    rating: 4,
    review:
      "The product is worth the price. A few minor issues, but overall, I'm satisfied.",
    date: "2024-11-25",
    person: "Michael Smith",
  },
  {
    title: "Not as Expected",
    rating: 2,
    review:
      "The product didn't match the description. Disappointed with the quality.",
    date: "2024-11-20",
    person: "Karen Williams",
  },
  {
    title: "Highly Recommend!",
    rating: 5,
    review:
      "Fantastic product! I would definitely recommend this to my friends and family.",
    date: "2024-11-18",
    person: "James Brown",
  },
  {
    title: "Decent Purchase",
    rating: 3,
    review: "It works okay but has some flaws. Could be improved.",
    date: "2024-11-15",
    person: "Patricia Garcia",
  },
  {
    title: "Terrible Experience",
    rating: 1,
    review:
      "This was a waste of money. Poor build quality and bad customer service.",
    date: "2024-11-10",
    person: "Robert Martinez",
  },
  {
    title: "Satisfactory",
    rating: 4,
    review:
      "The product does its job well. Delivery was quick, and the packaging was good.",
    date: "2024-11-05",
    person: "Linda Anderson",
  },
  {
    title: "Exceptional Quality",
    rating: 5,
    review:
      "The quality is outstanding! I've been using it for a week, and it's perfect.",
    date: "2024-11-01",
    person: "David Thomas",
  },
  {
    title: "Wouldn't Buy Again",
    rating: 2,
    review:
      "The product broke within a few days of use. Not satisfied with the durability.",
    date: "2024-10-28",
    person: "Barbara Lee",
  },
  {
    title: "Best Purchase Ever",
    rating: 5,
    review:
      "Absolutely love this! It’s the best thing I’ve bought this year.",
    date: "2024-10-20",
    person: "John Harris",
  },
];