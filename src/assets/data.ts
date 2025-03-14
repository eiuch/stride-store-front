
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number; // For discounted items
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  sizes: number[];
  colors: string[];
  description?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Air Max 97",
    brand: "Nike",
    price: 12990,
    oldPrice: 15990,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9089e11a-1168-48ae-add0-a05dadfb2134/air-max-97-mens-shoes-LJmK45.png",
    category: "running",
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["black", "white", "gray"],
    description: "The Nike Air Max 97 keeps a sneaker icon going strong with the same design details that made it famous: water-ripple lines, reflective piping and full-length Max Air cushioning."
  },
  {
    id: 2,
    name: "Ultraboost 22",
    brand: "Adidas",
    price: 14990,
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
    category: "running",
    isFeatured: true,
    rating: 4.9,
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    colors: ["black", "white", "blue"],
    description: "These Ultraboost running shoes serve up comfort and responsive energy return. The shoe's upper is made with yarn containing 50% Parley Ocean Plastic."
  },
  {
    id: 3,
    name: "Old Skool",
    brand: "Vans",
    price: 6990,
    image: "https://images.vans.com/is/image/VansEU/VN000D3HY28-HERO?wid=800&hei=800&fmt=jpg&qlt=85,1&op_sharpen=0&resMode=sharp2&op_usm=1,1,1,0",
    category: "casual",
    isFeatured: true,
    rating: 4.7,
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["black", "blue", "red"],
    description: "The Old Skool, Vans classic skate shoe and the first to bear the iconic side stripe, has a low-top lace-up silhouette with a durable suede and canvas upper with padded tongue and lining and Vans signature Waffle Outsole."
  },
  {
    id: 4,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 5990,
    image: "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw33f761a4/images/a_107/M9160_A_107X1.jpg",
    category: "casual",
    rating: 4.6,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["black", "white", "red", "navy"],
    description: "The Converse Chuck Taylor All Star is the one that started it all for Converse. The original basketball shoe, first created in 1917, has become a style icon."
  },
  {
    id: 5,
    name: "Suede Classic",
    brand: "Puma",
    price: 7990,
    image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/EEA/fmt/png",
    category: "casual",
    isFeatured: true,
    rating: 4.5,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["black", "blue", "red", "green"],
    description: "The Suede has been kicking around for a long time. It's been worn by icons of every generation, and it's stayed classic through it all."
  },
  {
    id: 6,
    name: "574 Core",
    brand: "New Balance",
    price: 8990,
    oldPrice: 10990,
    image: "https://nb.scene7.com/is/image/NB/u574laa_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=440&hei=440",
    category: "lifestyle",
    isNew: true,
    rating: 4.7,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["navy", "gray", "green"],
    description: "The 574 Core features clean lines and a classic design made from premium suede and mesh materials. This iconic sneaker features ENCAP midsole cushioning technology providing support and maximum durability."
  },
  {
    id: 7,
    name: "Blazer Mid '77",
    brand: "Nike",
    price: 9990,
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f45cec26-24b3-4621-ad9f-667e06c58d8e/blazer-mid-77-vintage-mens-shoes-nw30B2.png",
    category: "lifestyle",
    rating: 4.8,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["white", "black"],
    description: "In the '70s, Nike was the new shoe on the block. So new in fact, we were still testing prototypes on elite runners. Of course, the design improved over the years, but the name stuck."
  },
  {
    id: 8,
    name: "Classic Leather",
    brand: "Reebok",
    price: 7990,
    oldPrice: 9990,
    image: "https://assets.reebok.com/images/w_600,f_auto,q_auto/4354df5e0e774de5a3f9aa64014397a3_9366/Classic_Leather_Shoes_White_2232.jpg",
    category: "lifestyle",
    rating: 4.6,
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["white", "black", "gray"],
    description: "Originally designed for running, these Reebok shoes have become a street style staple. The supple leather upper gives them a premium look and feel. A cushioned midsole keeps you comfortable all day."
  }
];

export const brands = [
  { id: 1, name: "Nike", logo: "https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo.png" },
  { id: 2, name: "Adidas", logo: "https://1000logos.net/wp-content/uploads/2019/07/Adidas-Logo-1991.jpg" },
  { id: 3, name: "Puma", logo: "https://1000logos.net/wp-content/uploads/2017/05/PUMA-logo.jpg" },
  { id: 4, name: "New Balance", logo: "https://1000logos.net/wp-content/uploads/2018/10/New-Balance-logo.jpg" },
  { id: 5, name: "Vans", logo: "https://1000logos.net/wp-content/uploads/2021/04/Vans-logo.png" },
  { id: 6, name: "Converse", logo: "https://1000logos.net/wp-content/uploads/2021/04/Converse-logo.png" },
  { id: 7, name: "Reebok", logo: "https://1000logos.net/wp-content/uploads/2017/05/Reebok-logo.jpg" }
];

export const categories = [
  { id: 1, name: "running", label: "Для бега", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" },
  { id: 2, name: "casual", label: "Повседневные", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2012&q=80" },
  { id: 3, name: "lifestyle", label: "Лайфстайл", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80" }
];
