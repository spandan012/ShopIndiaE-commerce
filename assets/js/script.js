// ShopIndia E-commerce JavaScript

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 134900,
        originalPrice: 149900,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "electronics",
        rating: 5,
        reviews: 128,
        description: "Latest Apple smartphone with A17 Pro chip, titanium design, and advanced camera system.",
        features: ["A17 Pro Chip", "48MP Camera", "Titanium Design", "USB-C", "Action Button"]
    },
    {
        id: 2,
        name: "Nike Air Max",
        price: 8995,
        originalPrice: 12995,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "fashion",
        rating: 4,
        reviews: 89,
        description: "Premium running shoes with Air Max technology for ultimate comfort.",
        features: ["Air Max Technology", "Lightweight", "Breathable", "Durable Sole", "Comfortable Fit"]
    },
    {
        id: 3,
        name: "MacBook Pro M3",
        price: 169900,
        originalPrice: 199900,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "electronics",
        rating: 5,
        reviews: 256,
        description: "14-inch MacBook Pro with M3 chip for incredible performance and battery life.",
        features: ["M3 Chip", "14-inch Display", "16GB RAM", "512GB SSD", "22-hour Battery"]
    },
    {
        id: 4,
        name: "3-Seater Sofa",
        price: 45999,
        originalPrice: 65999,
        image: "https://images.unsplash.com/photo-1564466809058-bf4114613385?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "home",
        rating: 4,
        reviews: 45,
        description: "Comfortable 3-seater sofa perfect for your living room.",
        features: ["Premium Fabric", "Solid Wood Frame", "High Density Foam", "Easy Assembly", "2 Year Warranty"]
    },
    {
        id: 5,
        name: "Samsung 55\" 4K TV",
        price: 54999,
        originalPrice: 74999,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "electronics",
        rating: 4,
        reviews: 312,
        description: "55-inch 4K Smart TV with Crystal Display and Smart Hub.",
        features: ["4K Resolution", "Smart TV", "HDR10+", "Crystal Display", "Alexa Built-in"]
    },
    {
        id: 6,
        name: "Adidas Running Shoes",
        price: 7999,
        originalPrice: 9999,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "fashion",
        rating: 4,
        reviews: 156,
        description: "Lightweight running shoes with Boost technology.",
        features: ["Boost Technology", "Lightweight", "Breathable Upper", "Flexible Sole", "All-day Comfort"]
    },
    {
        id: 7,
        name: "Dining Table Set",
        price: 32999,
        originalPrice: 45999,
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "home",
        rating: 4,
        reviews: 78,
        description: "6-seater wooden dining table set with chairs.",
        features: ["Solid Wood", "6 Chairs Included", "Easy Assembly", "Scratch Resistant", "Modern Design"]
    },
    {
        id: 8,
        name: "Wireless Headphones",
        price: 15999,
        originalPrice: 24999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "electronics",
        rating: 5,
        reviews: 203,
        description: "Premium wireless headphones with noise cancellation.",
        features: ["Active Noise Cancellation", "30-hour Battery", "Quick Charge", "Premium Sound", "Comfortable Fit"]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    setupEventListeners();
    loadPageContent();
});

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            addToCart(button);
        }
        
        // Remove from cart
        if (e.target.classList.contains('remove-item')) {
            removeFromCart(parseInt(e.target.dataset.id));
        }
        
        // Quantity controls
        if (e.target.classList.contains('quantity-btn')) {
            updateQuantity(e.target);
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
    
    // Filter functionality
    document.addEventListener('change', function(e) {
        if (e.target.name === 'category' || e.target.name === 'price-range') {
            filterProducts();
        }
    });
    
    // Category filter checkboxes
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    // Price range filter
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('input', filterProducts);
    }
}

// Add product to cart
function addToCart(button) {
    const productId = parseInt(button.dataset.id);
    const productName = button.dataset.name;
    const productPrice = parseInt(button.dataset.price);
    const productImage = button.dataset.image || getProductImage(productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Product added to cart!', 'success');
    
    // Add visual feedback
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.classList.add('btn-success');
    button.classList.remove('btn-primary');
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        button.classList.add('btn-primary');
        button.classList.remove('btn-success');
    }, 1500);
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
    showToast('Product removed from cart!', 'success');
}

// Update product quantity
function updateQuantity(button) {
    const productId = parseInt(button.dataset.id);
    const action = button.dataset.action;
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadCartItems();
    }
}

// Update cart count in navigation
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Get product image by ID
function getProductImage(productId) {
    const product = products.find(p => p.id === productId);
    return product ? product.image : 'https://via.placeholder.com/300x200';
}

// Load cart items (for cart page)
function loadCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-5x text-muted mb-3"></i>
                <h3>Your cart is empty</h3>
                <p class="text-muted">Add some products to get started!</p>
                <a href="products.html" class="btn btn-primary btn-lg">Shop Now</a>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-4">
                        <h5>${item.name}</h5>
                        <p class="text-muted">₹${item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div class="col-md-3">
                        <div class="quantity-controls">
                            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                            <input type="number" value="${item.quantity}" class="quantity-input" readonly>
                            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <strong>₹${itemTotal.toLocaleString('en-IN')}</strong>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    // Update cart summary
    if (cartSummary) {
        const shipping = total > 99900 ? 0 : 9900; // Free shipping above ₹999
        const tax = Math.round(total * 0.18); // 18% GST
        const finalTotal = total + shipping + tax;
        
        cartSummary.innerHTML = `
            <h4>Order Summary</h4>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${total.toLocaleString('en-IN')}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'Free' : '₹' + shipping.toLocaleString('en-IN')}</span>
            </div>
            <div class="summary-row">
                <span>Tax (GST 18%):</span>
                <span>₹${tax.toLocaleString('en-IN')}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>₹${finalTotal.toLocaleString('en-IN')}</span>
            </div>
            <button class="btn btn-primary btn-lg w-100 mt-3" onclick="proceedToCheckout()">
                Proceed to Checkout
            </button>
        `;
        cartSummary.style.display = 'block';
    }
}

// Load products (for products page)
function loadProducts(productsToShow = products) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    let productsHTML = '';
    
    productsToShow.forEach(product => {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        
        productsHTML += `
            <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                <div class="product-card">
                    ${discount > 0 ? `<div class="badge-sale">${discount}% OFF</div>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="product-image" onclick="viewProduct(${product.id})">
                    <div class="product-info">
                        <h5>${product.name}</h5>
                        <p class="text-muted">${product.description.substring(0, 50)}...</p>
                        <div class="price-rating">
                            <div>
                                <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
                                ${product.originalPrice > product.price ? 
                                    `<span class="product-original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                            </div>
                            <div class="rating">
                                <span style="color: #ffc107;">${stars}</span>
                                <span>(${product.reviews})</span>
                            </div>
                        </div>
                        <button class="btn btn-primary w-100 add-to-cart" 
                                data-id="${product.id}" 
                                data-name="${product.name}" 
                                data-price="${product.price}"
                                data-image="${product.image}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    productsContainer.innerHTML = productsHTML;
}

// Filter products
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.value);
    const priceRange = document.getElementById('price-range');
    const maxPrice = priceRange ? parseInt(priceRange.value) : 200000;

    let filteredProducts = products;
    
    // Filter by category
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category));
    }
    
    // Filter by price
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Update results count
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        const categoryText = selectedCategories.length > 0 
            ? `in ${selectedCategories.join(', ')}` 
            : '';
        resultsCount.textContent = `Showing ${filteredProducts.length} products ${categoryText}`;
    }
    
    // Load filtered products
    loadProducts(filteredProducts);
}

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    
    if (!searchTerm || !searchResults) return;
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    let resultsHTML = '';
    
    if (filteredProducts.length === 0) {
        resultsHTML = `
            <div class="text-center py-5">
                <i class="fas fa-search fa-5x text-muted mb-3"></i>
                <h3>No products found</h3>
                <p class="text-muted">Try searching with different keywords</p>
            </div>
        `;
    } else {
        filteredProducts.forEach(product => {
            const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
            resultsHTML += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image" onclick="viewProduct(${product.id})">
                        <div class="product-info">
                            <h5>${product.name}</h5>
                            <p class="text-muted">${product.description.substring(0, 60)}...</p>
                            <div class="price-rating">
                                <span class="price">₹${product.price.toLocaleString('en-IN')}</span>
                                <div class="rating">
                                    <span style="color: #ffc107;">${stars}</span>
                                    <span>(${product.reviews})</span>
                                </div>
                            </div>
                            <button class="btn btn-primary w-100 add-to-cart" 
                                    data-id="${product.id}" 
                                    data-name="${product.name}" 
                                    data-price="${product.price}"
                                    data-image="${product.image}">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    searchResults.innerHTML = `
        <div class="mb-4">
            <h4>Search Results for "${searchTerm}" (${filteredProducts.length} found)</h4>
        </div>
        <div class="row">
            ${resultsHTML}
        </div>
    `;
}

// View single product
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Store product data for product detail page
    localStorage.setItem('currentProduct', JSON.stringify(product));
    window.location.href = 'product-detail.html';
}

// Load single product details
function loadProductDetail() {
    const product = JSON.parse(localStorage.getItem('currentProduct'));
    const productContainer = document.getElementById('product-detail');
    
    if (!product || !productContainer) return;
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    productContainer.innerHTML = `
        <div class="row">
            <div class="col-lg-6">
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="col-lg-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item"><a href="products.html">Products</a></li>
                        <li class="breadcrumb-item active">${product.name}</li>
                    </ol>
                </nav>
                
                <h1>${product.name}</h1>
                <div class="rating mb-3">
                    <span style="color: #ffc107; font-size: 1.2rem;">${stars}</span>
                    <span class="ms-2">(${product.reviews} reviews)</span>
                </div>
                
                <div class="product-detail-price">
                    ₹${product.price.toLocaleString('en-IN')}
                    ${product.originalPrice > product.price ? 
                        `<span class="product-original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                         <span class="discount-badge">${discount}% OFF</span>` : ''}
                </div>
                
                <p class="lead">${product.description}</p>
                
                <h5>Key Features:</h5>
                <ul class="product-features">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <div class="mt-4">
                    <div class="row">
                        <div class="col-md-6">
                            <button class="btn btn-primary btn-lg w-100 add-to-cart" 
                                    data-id="${product.id}" 
                                    data-name="${product.name}" 
                                    data-price="${product.price}"
                                    data-image="${product.image}">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-success btn-lg w-100" onclick="buyNow(${product.id})">
                                <i class="fas fa-bolt"></i> Buy Now
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 p-3 bg-light rounded">
                    <h6><i class="fas fa-truck text-success"></i> Free Delivery</h6>
                    <p class="mb-0">Free delivery on orders above ₹999</p>
                </div>
            </div>
        </div>
    `;
}

// Buy now functionality
function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Check if product is already in cart
        let existingItem = cart.find(item => item.id === productId);
        if (!existingItem) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    } else {
        showToast('Product not found!', 'error');
    }
}


// Debounce utility for search input
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Toast notification
function showToast(message, type = 'success') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-fade-in`;
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="me-2">
                ${type === 'success' ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-exclamation-circle text-danger"></i>'}
            </div>
            <div>${message}</div>
        </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// Proceed to checkout (dummy implementation)
function proceedToCheckout() {
    showToast('Proceeding to checkout...', 'success');
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000);
}

// Load page content based on current page (optional, for SPA-like navigation)
function loadPageContent() {
    const path = window.location.pathname;
    
    if (path.endsWith('products.html')) {
        // Get category from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            // If category is specified, filter products and check the corresponding checkbox
            const checkbox = document.querySelector(`input[name="category"][value="${category}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
            const filteredProducts = products.filter(product => product.category === category);
            loadProducts(filteredProducts);
            
            // Update results count
            const resultsCount = document.getElementById('results-count');
            if (resultsCount) {
                resultsCount.textContent = `Showing ${filteredProducts.length} products in ${category}`;
            }
        } else {
            loadProducts();
        }
    }
    
    if (path.endsWith('cart.html')) {
        loadCartItems();
    }
    
    if (path.endsWith('index.html') || path === '/' || path.endsWith('shopindiaecommerce/')) {
        updateCartCount();
    }
}

// Initialize featured products and categories on index.html (optional)
document.addEventListener('DOMContentLoaded', function () {
    // Only run on index.html
    if (
        window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('shopindiaecommerce/')
    ) {
        updateCartCount();
        // You can add code here to dynamically load featured products/categories if needed
    }
});
