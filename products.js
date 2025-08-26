// Professional E-commerce Product Management
"use strict"; with improved structure
const products = {
    "counterfeit-notes": [
        {
            id: "usd-100",
            name: "USD 100 Bills",
            price: "$1500",
            category: "counterfeit-notes",
            image: "assets/image/products/usd-100.jpg",
            description: "High quality USD 100 bills with latest security features"
        },
        {
            id: "eur-500",
            name: "EUR 500 Notes",
            price: "$2000",
            category: "counterfeit-notes",
            image: "assets/image/products/eur-500.jpg",
            description: "Premium quality EUR 500 notes"
        },
        {
            id: "gbp-50",
            name: "GBP 50 Notes",
            price: "$1800",
            category: "counterfeit-notes",
            image: "assets/image/products/gbp-50.jpg",
            description: "High quality British Pound notes"
        }
    ],
    "clone-cards": [
        {
            id: "visa-platinum",
            name: "Visa Platinum Card",
            price: "$800",
            category: "clone-cards",
            image: "assets/image/products/visa-platinum.jpg",
            description: "Premium Visa Platinum clone card"
        },
        {
            id: "mastercard-black",
            name: "Mastercard Black",
            price: "$900",
            category: "clone-cards",
            image: "assets/image/products/mastercard-black.jpg",
            description: "Elite Mastercard Black clone card"
        }
    ],
    "documents": [
        {
            id: "passport",
            name: "International Passport",
            price: "$2500",
            category: "documents",
            image: "assets/image/products/passport.jpg",
            description: "High quality passport with all security features"
        },
        {
            id: "drivers-license",
            name: "Driver's License",
            price: "$1200",
            category: "documents",
            image: "assets/image/products/license.jpg",
            description: "Authentic looking driver's license"
        }
    ]
};

// Category filtering functionality
function filterProducts(category) {
    const productGrid = document.querySelector('.product-grid');
    
    // Show loading state
    productGrid.innerHTML = '<div class="product-loading"><div class="loading-spinner"></div></div>';
    
    // Simulate network delay for smooth transition
    setTimeout(() => {
        const productsToShow = category === 'all' ? Object.values(products).flat() : products[category] || [];
        
        if (productsToShow.length === 0) {
            productGrid.innerHTML = `
                <div class="no-products">
                    <p>No products found in this category.</p>
                </div>
            `;
            return;
        }
        
        productGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="quick-view-btn" data-product-id="${product.id}">Quick View</button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <p class="description">${product.description}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Quick view functionality
function setupQuickView() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-view-btn')) {
            const productId = e.target.dataset.productId;
            const product = findProduct(productId);
            if (product) {
                showQuickViewModal(product);
            }
        }
    });
}

function findProduct(productId) {
    return Object.values(products).flat().find(p => p.id === productId);
}

function showQuickViewModal(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="product-details">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p class="price">${product.price}</p>
                    <p class="description">${product.description}</p>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupQuickView();
    
    // Set up category filter buttons
    const filterButtons = document.querySelectorAll('.category-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            filterProducts(category);
            
            // Update active state of filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // Show all products initially
    filterProducts('all');
});
