'use server';

export async function getProducts(page: number, searchTerm?: string) {
  const products = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
    },

    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts ',
      price: 22.3,
    },

    {
      id: 3,
      title: 'Mens Cotton Jacket',
      price: 55.99,
    },

    {
      id: 4,
      title: 'Mens Casual Slim Fit',
      price: 15.99,
    },

    {
      id: 5,
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
    },

    {
      id: 6,
      title: 'Solid Gold Petite Micropave ',
      price: 168,
    },

    {
      id: 7,
      title: 'White Gold Plated Princess',
      price: 9.99,
    },

    {
      id: 8,
      title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
      price: 10.99,
    },

    {
      id: 9,
      title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',
      price: 64,
    },

    {
      id: 10,
      title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
      price: 109,
    },

    {
      id: 11,
      title:
        'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
      price: 109,
    },

    {
      id: 12,
      title:
        'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
      price: 114,
    },

    {
      id: 13,
      title: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
      price: 599,
    },

    {
      id: 14,
      title:
        'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED Computer Monitor, 3840 x 1080p Resolution, 1ms Response, FreeSync 2 with HDR',
      price: 999.99,
    },

    {
      id: 15,
      title: 'BIYLACLESEN Women’s 3-in-1 Snowboard Jacket Winter Coats',
      price: 56.99,
    },

    {
      id: 16,
      title:
        'Lock and Love Women’s Removable Hooded Faux Leather Moto Biker Jacket',
      price: 29.99,
    },

    {
      id: 17,
      title: 'Rain Jacket',
      price: 39.99,
    },
    {
      id: 18,
      title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
      price: 9.85,
    },
    {
      id: 19,
      title: "Opna Women's Short Sleeve Moisture",
      price: 7.95,
    },
    {
      id: 20,
      title: 'DANVOUY Womens T Shirt Casual Cotton Short',
      price: 12.99,
    },
    {
      id: 21,
      title: 'JBL FLIP 4 - Waterproof Portable Bluetooth Speaker',
      price: 79.99,
    },
    {
      id: 22,
      title: 'Echo Dot (3rd Gen) - Smart speaker with Alexa - Charcoal',
      price: 29.99,
    },
    {
      id: 23,
      title: 'Apple iPhone 12, 64GB, Black - Fully Unlocked',
      price: 699.99,
    },
    {
      id: 24,
      title: 'Samsung Galaxy S21 Ultra 5G | Factory Unlocked',
      price: 1199.99,
    },
    {
      id: 25,
      title: 'Sony WH-1000XM4 Wireless Noise Canceling Overhead Headphones',
      price: 348,
    },
    {
      id: 26,
      title: 'Apple MacBook Pro 13-inch, 8GB RAM, 256GB SSD Storage',
      price: 1299.99,
    },
    {
      id: 27,
      title: 'Dell XPS 13 9310, 13.4 inch UHD+ Touchscreen Laptop',
      price: 1599.99,
    },
    {
      id: 28,
      title: 'HP Spectre x360 14 2-in-1 Laptop, 13.5" 3K2K OLED Touchscreen',
      price: 1699.99,
    },
    {
      id: 29,
      title: 'Microsoft Surface Laptop 4 13.5” Touch-Screen – Intel Core i5',
      price: 999.99,
    },
    {
      id: 30,
      title:
        'ASUS ROG Strix G15 (2021) Gaming Laptop, 15.6” 300Hz IPS Type FHD',
      price: 1449.99,
    },
    {
      id: 31,
      title: 'Acer Predator Helios 300 Gaming Laptop, Intel i7-10750H',
      price: 1199.99,
    },
    {
      id: 32,
      title:
        'Razer Blade 15 Base Gaming Laptop 2021: Intel Core i7-10750H 6 Core',
      price: 1699.99,
    },
    {
      id: 33,
      title:
        'Alienware m15 R4, 15.6 inch FHD Gaming Laptop - Intel Core i7-10870H',
      price: 2099.99,
    },
    {
      id: 34,
      title: 'Lenovo Legion 5 Gaming Laptop, 15.6" FHD (1920x1080) IPS Screen',
      price: 999.99,
    },
    {
      id: 35,
      title: 'MSI GL65 Leopard 10SFK-062 15.6" FHD 144Hz 3ms Gaming Laptop',
      price: 1399.99,
    },
    {
      id: 36,
      title:
        'Gigabyte AERO 15 OLED XD - 15.6" UHD 4k AMOLED IPS, Intel Core i7',
      price: 1999.99,
    },
    {
      id: 37,
      title:
        'Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Space Gray (4th Generation)',
      price: 999.99,
    },
    {
      id: 38,
      title: 'Samsung Galaxy Tab S7 Wi-Fi, Mystic Black - 128 GB',
      price: 649.99,
    },
    {
      id: 39,
      title: 'Amazon Fire HD 10 Tablet (10.1" 1080p full HD display, 32 GB)',
      price: 149.99,
    },
    {
      id: 40,
      title:
        'Microsoft Surface Pro 7 – 12.3" Touch-Screen - 10th Gen Intel Core i5',
      price: 749.99,
    },
    {
      id: 41,
      title: 'Lenovo Tab M10 Plus, 10.3" FHD Android Tablet',
      price: 149.99,
    },
    {
      id: 42,
      title: 'ASUS ZenPad 3S 10 9.7" 2K IPS Display Android Tablet',
      price: 299.99,
    },
    {
      id: 43,
      title: 'Google Pixel Slate 12.3-Inch 2 in 1 Tablet',
      price: 799.99,
    },
    {
      id: 44,
      title: 'Huawei MediaPad M5 8.4" 64GB WiFi Tablet',
      price: 349.99,
    },
    {
      id: 45,
      title:
        'Sony Alpha a6400 Mirrorless Camera: Compact APS-C Interchangeable Lens',
      price: 898,
    },
    {
      id: 46,
      title: 'Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens',
      price: 449,
    },
    {
      id: 47,
      title: 'Nikon D3500 W/ AF-P DX NIKKOR 18-55mm f/3.5-5.6G VR',
      price: 496.95,
    },
    {
      id: 48,
      title:
        'Fujifilm X-T30 Mirrorless Digital Camera w/XF18-55mm F2.8-4 R LM OIS Lens',
      price: 1299,
    },
    {
      id: 49,
      title:
        'Panasonic LUMIX G7 4K Digital Mirrorless Camera with 14-42mm Lens',
      price: 497.99,
    },
    {
      id: 50,
      title: 'Olympus OM-D E-M10 Mark III Camera with 14-42mm II R Lens',
      price: 649,
    },
    {
      id: 51,
      title:
        'GoPro HERO9 Black - Waterproof Action Camera with Front LCD and Touch Rear Screens',
      price: 399.99,
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const result = products.filter((product) => {
    return product.title
      .toLowerCase()
      .includes(searchTerm?.toLowerCase() || '');
  });

  const data = result.slice((page - 1) * 10, page * 10);

  return data;
}
