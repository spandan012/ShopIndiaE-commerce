# ShopIndia E-commerce Website

A modern e-commerce website built with HTML, CSS, and JavaScript, featuring a responsive design and comprehensive shopping experience.

## Features

### 1. User Interface
- Responsive navigation with search and cart functionality
- Hero carousel showcasing featured products and offers
- Category browsing with visual cards
- Product listings with filtering options
- Detailed product pages with images and specifications
- Shopping cart management
- Checkout process
- Contact and about pages

### 2. Key Components

#### Navigation
- Responsive navbar with collapsible menu
- Search functionality
- Cart counter with real-time updates
- Category and page navigation

#### Home Page
- Dynamic hero carousel with 3 slides
- Featured categories section
- Featured products section
- Special offers banner

#### Product Features
- Product cards with images
- Price display
- Rating system
- Add to cart functionality
- Quick view options

#### Shopping Cart
- Add/remove items
- Quantity adjustment
- Price calculation
- Cart persistence using localStorage

### 3. Technical Details

#### Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Font Awesome 6.0.0

#### File Structure
```
shopindiaecommerce/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── index.html
├── products.html
├── categories.html
├── cart.html
├── checkout.html
├── about.html
├── contact.html
├── search.html
└── product-detail.html
```

### 4. Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/spandan012/ShopIndiaE-commerce.git
```

2. Open the project folder:
```bash
cd shopindiaecommerce
```

3. Open `index.html` in a web browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000
```

### 5. Usage

#### Navigation
- Use the top navigation bar to browse different sections
- Click on cart icon to view shopping cart
- Use search icon to find specific products

#### Shopping
1. Browse products by category or through the product listing
2. Click on products to view details
3. Add items to cart using "Add to Cart" button
4. Adjust quantities in the cart page
5. Proceed to checkout

### 6. Customization

#### Adding Products
Add new products by following this structure:
```html
<div class="product-card">
    <a href="product-detail.html?id=[PRODUCT_ID]">
        <img src="[IMAGE_URL]" alt="[PRODUCT_NAME]" class="product-image">
    </a>
    <div class="product-info">
        <!-- Product details -->
    </div>
</div>
```

#### Modifying Styles
Custom styles are defined in `assets/css/style.css`. Key variables:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --border-radius: 8px;
    --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    --transition: all 0.3s ease;
}
```

### 7. Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### 8. Performance Optimization
- Optimized images using proper sizing and compression
- Minified CSS and JavaScript files
- Lazy loading for images
- Efficient carousel implementation

### 9. Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

### 10. License
This project is licensed under the MIT License - see the LICENSE file for details.

### 11. Contact
For support or queries, contact:
- Email: connectwithspandan1106@gmail.com

---

*Last updated: June 13, 2025*