const express = require('express')
const app = express()
const path = require('path')
const { menu } = require('./util/data')
const authorize = require('./util/authorizedUser')

const port = process.env.PORT || 5000;

// Uses the authorize file in every app.get that has '/api' in it
app.use('/api', authorize)

// Homepage
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/homepage.html'))
})

// All menu items
app.get('/api/menu', (req, res) => {
    const newProducts = menu.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All breakfast items
app.get('/api/menu/breakfast', (req, res) => {
    let items = menu.filter(item => item.itemType == 'Breakfast');
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All lunch items
app.get('/api/menu/lunch', (req, res) => {
    let items = menu.filter(item => item.itemType == 'Lunch');
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All dinner items
app.get('/api/menu/dinner', (req, res) => {
    let items = menu.filter(item => item.itemType == 'Dinner');
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All starters
app.get('/api/menu/starters', (req, res) => {
    let items = menu.filter(item => item.itemType == 'Starter');
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All sides
app.get('/api/menu/sides', (req, res) => {
    let items = menu.filter(item => item.itemType == 'Side');
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All desserts
app.get('/api/menu/desserts', (req, res) => {
    let items = menu.filter(item => item.itemType == 'Dessert');
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All beverages
app.get('/api/menu/beverages', (req, res) => {
    let items = menu.filter(item => item.itemType == 'Beverage');
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All To go Fave items
app.get('/api/menu/toGoFave', (req, res) => {
    let items = menu.filter(item => item.toGoFave === true);
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// All gluten free items
app.get('/api/menu/glutenFree', (req, res) => {
    let items = menu.filter(item => item.glutenFree === true);
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts);  
})

// Returns items by category
app.get('/api/menu/category/:category', (req, res) => {
    const { category } = req.params;

    let items = menu.filter(item => item.category.toLowerCase() == category);
    const newProducts = items.map((item) => {
        const { id, toGoFave, glutenFree, itemType, category, name, price, calories, description } = item
        return { id, toGoFave, glutenFree, itemType, category, name, price, calories, description }
    })

    res.json(newProducts); 
})


// Searches menu by item id
app.get('/api/menu/:menuID', (req, res) => {
    const { menuID } = req.params

    const singleProduct = menu.find(
        (product) => product.id === Number(menuID)
    )
    if (!singleProduct) {
        return res.status(404).send('Product does not Exist')
    }

    return res.json(singleProduct)
})

// Query search for different parameters
app.get('/api/menu/v1/query', (req, res) => {
    const { search, limit, minCal, maxCal, minPrice, maxPrice } = req.query
    let sortedMenu = [...menu]

    // Returns if the search word is in the name or the description of the item
    if (search) {
        sortedMenu = sortedMenu.filter((item) => {
            if (item.name.toLowerCase().includes(search)) {
                return item.name.toLowerCase().includes(search);
            } else if (item.description.toLowerCase().includes(search)) {
                return item.description.toLowerCase().includes(search);
            }
        })
    }
    // Returns if the calorie count is at least the minCal
    if (minCal) {
        sortedMenu = sortedMenu.filter((item) => {
            return item.calories[0] >= minCal;
        })
    }
    // Returns if the calorie count is less than the maxCal
    if (maxCal) {
        sortedMenu = sortedMenu.filter((item) => {
            if (item.calories.length == 1) {
                return item.calories[0] <= maxCal;
            } else {
                return item.calories[item.calories.length - 1] <= maxCal;
            }
        })
    }
    // Returns if the price is at least the minPrice
    if (minPrice) {
        sortedMenu = sortedMenu.filter((item) => {
            if (!isNaN(item.price)) {
                return item.price >= minPrice;
            }
        })
    }
    // Returns if the price is less than the maxPrice
    if (maxPrice) {
        sortedMenu = sortedMenu.filter((item) => {
            return item.price <= maxPrice;
        })
    }
    // Limits the amount of objects that can be returned
    if (limit) {
        sortedMenu = sortedMenu.slice(0, Number(limit))
    }
    // Returns if there are no objects to display
    if (sortedMenu.length < 1) {
        res.status(200).send('No products matched your search');
        // return res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json(sortedMenu)
})

app.listen(port, () => {
    console.log('Server is listening on port 5000....');
})