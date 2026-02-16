export const restaurants = [
  {
    id: '1',
    name: 'Pizza Suprema',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    coverImage: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=400',
    rating: 4.5,
    reviews: 2345,
    deliveryTime: '30-45',
    deliveryFee: 5.0,
    category: 'Pizza',
    categories: ['Pizzas', 'Bebidas', 'Sobremesas'],
    address: 'Av. Paulista, 1000 - São Paulo',
    phone: '(11) 3456-7890',
    items: [
      { 
        id: '101', 
        name: 'Margherita', 
        description: 'Molho de tomate, mussarela, manjericão',
        price: 45.90,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
        category: 'Pizzas',
        popular: true
      },
      { 
        id: '102', 
        name: 'Pepperoni', 
        description: 'Molho de tomate, mussarela, pepperoni',
        price: 52.90,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
        category: 'Pizzas',
        popular: true
      },
      { 
        id: '103', 
        name: 'Portuguesa', 
        description: 'Molho de tomate, presunto, ovos, cebola, azeitonas',
        price: 49.90,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        category: 'Pizzas',
        popular: false
      },
      { 
        id: '104', 
        name: 'Coca-Cola 2L', 
        description: 'Refrigerante de cola 2 litros',
        price: 12.90,
        image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
        category: 'Bebidas',
        popular: true
      },
      { 
        id: '105', 
        name: 'Brownie com Sorvete', 
        description: 'Brownie de chocolate com sorvete de creme',
        price: 24.90,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
        category: 'Sobremesas',
        popular: true
      }
    ]
  },
  {
    id: '2',
    name: 'Hamburgueria Artesanal',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400',
    rating: 4.7,
    reviews: 1876,
    deliveryTime: '20-35',
    deliveryFee: 6.0,
    category: 'Hambúrguer',
    categories: ['Hambúrgueres', 'Batatas', 'Bebidas'],
    address: 'Rua Augusta, 500 - São Paulo',
    phone: '(11) 3456-7891',
    items: [
      { 
        id: '201', 
        name: 'Classic Burger', 
        description: 'Pão brioche, hambúrguer 180g, queijo cheddar, alface, tomate',
        price: 32.90,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        category: 'Hambúrgueres',
        popular: true
      },
      { 
        id: '202', 
        name: 'Bacon Burger', 
        description: 'Pão brioche, hambúrguer 180g, queijo cheddar, bacon crocante',
        price: 38.90,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400',
        category: 'Hambúrgueres',
        popular: true
      },
      { 
        id: '203', 
        name: 'Batata Frita', 
        description: 'Porção de batata frita crocante',
        price: 18.90,
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
        category: 'Batatas',
        popular: true
      }
    ]
  },
  {
    id: '3',
    name: 'Sushi Express',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    coverImage: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
    rating: 4.6,
    reviews: 1543,
    deliveryTime: '40-55',
    deliveryFee: 8.0,
    category: 'Japonês',
    categories: ['Combinados', 'Sushis', 'Temakis'],
    address: 'Rua Oscar Freire, 800 - São Paulo',
    phone: '(11) 3456-7892',
    items: [
      { 
        id: '301', 
        name: 'Combinado 10 peças', 
        description: '5 sushis e 5 sashimis variados',
        price: 65.90,
        image: 'https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?w=400',
        category: 'Combinados',
        popular: true
      },
      { 
        id: '302', 
        name: 'Uramaki Filadélfia', 
        description: '8 uramakis de salmão com cream cheese',
        price: 48.90,
        image: 'https://images.unsplash.com/photo-1617196034737-5c5a7a05e7d6?w=400',
        category: 'Sushis',
        popular: true
      },
      { 
        id: '303', 
        name: 'Temaki Salmão', 
        description: 'Cone de alga com salmão e arroz',
        price: 29.90,
        image: 'https://images.unsplash.com/photo-1617196034737-5c5a7a05e7d6?w=400',
        category: 'Temakis',
        popular: true
      }
    ]
  }
];

export const categories = [
  { id: '1', name: 'Pizza', icon: 'pizza' },
  { id: '2', name: 'Hambúrguer', icon: 'fast-food' },
  { id: '3', name: 'Japonês', icon: 'fish' },
  { id: '4', name: 'Brasileira', icon: 'restaurant' },
  { id: '5', name: 'Italiana', icon: 'restaurant' },
  { id: '6', name: 'Mexicana', icon: 'restaurant' }
];

export const orders = [
  {
    id: '1001',
    restaurantId: '1',
    restaurantName: 'Pizza Suprema',
    date: '2024-01-15T20:30:00',
    status: 'entregue',
    items: [
      { name: 'Margherita', quantity: 1, price: 45.90 },
      { name: 'Coca-Cola 2L', quantity: 1, price: 12.90 }
    ],
    total: 63.80,
    deliveryFee: 5.0
  },
  {
    id: '1002',
    restaurantId: '2',
    restaurantName: 'Hamburgueria Artesanal',
    date: '2024-01-20T19:15:00',
    status: 'preparando',
    items: [
      { name: 'Classic Burger', quantity: 2, price: 32.90 },
      { name: 'Batata Frita', quantity: 1, price: 18.90 }
    ],
    total: 84.70,
    deliveryFee: 6.0
  }
];