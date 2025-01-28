import express, { response } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cors from 'cors'
import Jwt from 'jsonwebtoken';
const jwtKey = 'quadbtech';
import { fileURLToPath } from 'url';
import path from 'path';
import connectDb from './config/db.js';
import Product from './module/Product.js';
import Checkouts from './module/Checkout.js';
import { userModel, usercardModel } from './module/User.js';
const app = express();
dotenv.config();
app.use(express.json()); // For JSON data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;
//upload image for product
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin: "https://quadbtechn.vercel.app"
}))

// Create a new product
app.post('/api/create_product', upload.array('files', 5), async (req, res) => {
    req.body.image = req.files;
    if (req.body.name === '') return res.status(400).json({ message: 'Name is required' });
    if (req.body.price === '') return res.status(400).json({ message: 'Price is required' });
    if (req.body.category === '') return res.status(400).json({ message: 'Category is required' });
    if (req.body.height === '') return res.status(400).json({ message: 'Height is required' });
    if (req.body.width === '') return res.status(400).json({ message: 'Width is required' });
    if (req.body.discount === '') return res.status(400).json({ message: 'Discount is required' });
    if (req.body.addistiondetails === '') return res.status(400).json({ message: 'Addistiondetails is required' });
    if (req.body.originnalPrice === '') return res.status(400).json({ message: 'OriginnalPrice is required' });
    if (req.body.qnt === '') return res.status(400).json({ message: 'Qnt is required' });
    try {
        const newProduct = new Product(req.body);
        let response = await newProduct.save();
        return res.status(200).json({ response, message: "Product Added" });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

//delete a product
app.delete('/api/delete_product/:id', verifyToken, async (req, res) => {
    try {
        let response = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

//get one products
app.get('/api/get_products/:id', verifyToken, async (req, res) => {
    if (req.params.id) {
        try {
            let response = await Product.findById(req.params.id);
            return res.status(200).json(response);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
});

// get all the product
app.get('/api/get_products', async (req, res) => {
    try {
        let response = await Product.find();
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

//update a product
app.put('/api/update_product/:id', verifyToken, upload.array('files', 5), async (req, res) => {
    req.body.image = req.files;
    if (req.body.name === '') return res.status(400).json({ message: 'Name is required' });
    if (req.body.price === '') return res.status(400).json({ message: 'Price is required' });
    if (req.body.category === '') return res.status(400).json({ message: 'Category is required' });
    if (req.body.height === '') return res.status(400).json({ message: 'Height is required' });
    if (req.body.width === '') return res.status(400).json({ message: 'Width is required' });
    if (req.body.discount === '') return res.status(400).json({ message: 'Discount is required' });
    if (req.body.addistiondetails === '') return res.status(400).json({ message: 'Addistiondetails is required' });
    if (req.body.originnalPrice === '') return res.status(400).json({ message: 'OriginnalPrice is required' });
    if (req.body.qnt === '') return res.status(400).json({ message: 'Qnt is required' });
    try {
        let response = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
        return res.status(200).json({ response, message: "Product Updated" });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

//admin login
app.post('/api/admin_login', async (req, res) => {
    if (req.body.email === '')
        return res.status(400).json({ message: 'Email is required' });
    if (req.body.password === '')
        return res.status(400).json({ message: 'Password is required' });
    if (req.body.email === 'abhishek@admin.com' && req.body.password === 'admin') {
        Jwt.sign({ response }, jwtKey, { expiresIn: '30d' }, (err, token) => {
            return res.status(200).json({ message: 'Login Successful', response: { email: req.body.email, name: "Abhishek Tiwari" }, token });
        })
    }
    else
        return res.status(400).json({ message: 'Invalid Credentials' });
})

//user registration
app.post('/api/user_registration', async (req, res) => {
    if (req.body.email === '')
        return res.status(400).json({ message: 'Email is required' });
    if (req.body.password === '')
        return res.status(400).json({ message: 'Password is required' });
    if (req.body.name === '')
        return res.status(400).json({ message: 'Name is required' });
    if (req.body.username === '')
        return res.status(400).json({ message: 'Username is required' });
    const user = await userModel.findOne({ email: req.body.email });
    if (user)
        return res.status(400).json({ message: 'Email already exists' });
    try {
        let response = await userModel.create(req.body);
        return res.status(200).json({ response, message: "User Created" });
    }
    catch (err) {
        return res.status(400).json(err);
    }
})
//user login
app.post('/api/user_login', async (req, res) => {
    if (req.body.email === '')
        return res.status(400).json({ message: 'Email is required' });
    if (req.body.password === '')
        return res.status(400).json({ message: 'Password is required' });
    try {
        let response = await userModel.findOne({ email: req.body.email, password: req.body.password }).select('-password');
        if (response) {
            Jwt.sign({ response }, jwtKey, { expiresIn: '30d' }, (err, token) => {
                return res.status(200).json({ response: response, message: "Login Done..!", token });
            })
        }

        else
            return res.status(400).json({ message: 'Invalid Credentials' });
    }
    catch (err) {
        return res.status(400).json(err);
    }
})
//user cart checkout details
app.post('/api/checkoutdetails', verifyToken, async (req, res) => {
    if (req.body.phone === '')
        return res.status(400).json({ message: 'Phone is required' });
    if (req.body.streataddress === '')
        return res.status(400).json({ message: 'Streat Address is required' });
    if (req.body.country === '')
        return res.status(400).json({ message: 'Country is required' });
    if (req.body.towncity === '')
        return res.status(400).json({ message: 'Town/City is required' });
    if (req.body.state === '')
        return res.status(400).json({ message: 'State is required' });
    if (req.body.pincode === '')
        return res.status(400).json({ message: 'Pincode is required' });
    if (req.body.payment === '')
        return res.status(400).json({ message: 'Payment is required' });
    try {
        const checkout = new Checkouts(req.body);
        let response = await checkout.save();
        if (response) {
            const usercard = await usercardModel.updateOne({ _id: req.body.cartid }, { $set: { order: true } })
            return res.status(200).json({ response: response, message: "Order" });
        }
        else
            return res.status(400).json({ message: 'Invalid Credentials' });
    }
    catch (err) {
        console.log(err.errors)
        return res.status(400).json(err);
    }
})

//get all the user
app.get('/api/statsdetails', verifyToken, async (req, res) => {
    try {
        const user = await userModel.find();
        const order = await Checkouts.find();
        const Pendingorder = await Checkouts.find({ status: 'Pending' });
        const Sellorder = await Checkouts.find({ status: 'Delivered' });
        return res.status(200).json({ user, order, Pendingorder, Sellorder });
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
})

//add to card
app.post("/api/addtocard", verifyToken, async (req, resp) => {
    try {
        const { email, pid, count } = req.body.cart;

        // Find the latest usercard for the given email
        const usercard = await usercardModel.findOne({ email }).sort({ _id: -1 });
        if (usercard) {
            if (usercard.order) {
                // If the last order is completed (order: true), create a new document
                const newUsercard = new usercardModel({
                    email,
                    product: [{ pid, quantity: count }],
                    order: false // New order starts with order set to false
                });
                await newUsercard.save();
                return resp.status(200).send("New cart created for completed order.");
            } else {
                // If the order is not completed (order: false), update the current cart
                const productIndex = usercard.product.findIndex(item => item.pid.toString() === pid);
                if (productIndex > -1) {
                    // If the product exists, update the quantity
                    usercard.product[productIndex].quantity += count;
                } else {
                    // If the product doesn't exist, add it to the cart
                    usercard.product.push({ pid, quantity: count });
                }
                await usercard.save();
                return resp.status(200).send("Cart updated successfully.");
            }
        } else {
            // If no usercard exists, create a new one
            const newUsercard = new usercardModel({
                email,
                product: [{ pid, quantity: count }],
                order: false // New order starts with order set to false
            });
            await newUsercard.save();
            return resp.status(200).send("New cart created successfully.");
        }
    } catch (error) {
        console.log(error)
        console.error("Error adding to cart:", error);
        return resp.status(500).send("Internal Server Error.");
    }
});



//decrese one qnt from card
app.post("/api/removeonefromcard", verifyToken, async (req, resp) => {
    try {
        const { email, pid, count } = req.body.cart; // Destructure the incoming data

        // Check if the user with the email exists
        const user = await usercardModel.findOne({ email }).sort({ _id: -1 });
        if (!user.order) {
            // Check if the product with pid already exists for the user
            const productIndex = user.product.findIndex(item => item.pid.toString() === pid);
            if (productIndex > -1) {
                // If product exists, increase quantity by 1
                user.product[productIndex].quantity -= count;
            } else {
                // If product doesn't exist, add it with default quantity of 1
                user.product.push({ pid, quantity: count });
            }
            await user.save();
            return resp.status(200).send("Product quantity updated or added to existing user cart.");
        } else {
            // If user doesn't exist, create a new user document with the product
            const newUser = new usercardModel({
                email,
                product: [{ pid, quantity: count }]
            });
            await newUser.save();
            return resp.status(200).send("New User Created and Product Added");
        }
    } catch (error) {
        return resp.status(500).send(error); // Send correct status for internal error
    }
});

// remove to cart
app.post('/api/removetocard', verifyToken, async (req, resp) => {
    try {
        const { email, pid } = req.body.cart;
        const user = await usercardModel.findOne({ email }).sort({ _id: -1 });
        if (user) {
            // Check if `pid` exists in the user's card
            if (user.product.some((productId) => String(productId.pid) === String(pid))) {
                // Remove the specific `pid` from `user.pid`
                user.product = user.product.filter((productId) => String(productId.pid) !== String(pid));
                await user.save();
                return resp.status(200).send("Product Removed from User's Card");
            } else {
                return resp.status(200).send("Product Does Not Exist in User's Card");
            }
        } else {
            return resp.status(404).send("User does not exist.");
        }
    } catch (error) {
        resp.status(500).send("An error occurred.");
    }
});

//return the number of product added in card
app.post('/api/checktocart', verifyToken, async (req, resp) => {
    try {
        const res = await usercardModel.findOne({ email: req.body.email, order: false });
        if (res) {
            resp.send(res)
        } else {
            return resp.status(201).send("User is Not Exist");
        }
    } catch (error) {
        resp.status(208).send();
    }
})

//get user add to cart data
app.get('/api/getcartdetails/:email', verifyToken, async (req, res) => {
    try {
        // Assuming user's email is in the session
        const userEmail = req.params.email;

        // Find user card by email and populate product details
        const userCard = await usercardModel.findOne({ email: userEmail, order: false })
            .populate('product.pid')  // Populate to get full product details for each pid
            .exec();
        if (!userCard) {
            return res.status(404).json({ message: 'User cart not found' });
        }

        res.json(userCard);  // Send user card with populated product details
    } catch (error) {
        res.status(500).json({ result: error });
    }
});

//get order details by user
app.get('/api/getorderdetails/:email', verifyToken, async (req, res) => {
    try {
        // Find the user's checkout details
        const checkoutDetails = await Checkouts.find({ user: req.params.email })
            .populate({
                path: 'cartid', // Populate the referenced 'cartid' from usercards
                populate: {
                    path: 'product.pid', // Populate 'product.pid' from products
                    model: 'products',
                },
            });

        if (!checkoutDetails || checkoutDetails.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json(checkoutDetails);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// get all the order details of user
app.post('/api/getoneproductqnt', async (req, res) => {
    try {
        const { email, pid } = req.body;
        if (email) {
            const getoneproductqnt = await usercardModel.findOne({ email, order: false });
            const product = await Product.findById(pid)
            // Find the specific product in the user's product list
            const productqnt = getoneproductqnt.product.find((item) => item.pid == pid);
            if (!getoneproductqnt) {
                return res.status(200).json({ product });
            }


            if (product) {
                return res.status(200).json({ productqnt, product });
            } else {
                return res.status(404).json({ message: 'Product not found' });
            }
        }
        if (pid) {
            const product = await Product.findById(pid)
            return res.status(200).json({ product });
        }
        // Fetch user card based on email

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});


// update status of order
app.post('/api/updateorderstatus', verifyToken, async (req, res) => {
    try {
        const cancelorder = await Checkouts.updateOne({ _id: req.body.orderId }, { status: req.body.status });
        return res.status(200).json({ cancelorder, message: "Order Update Stutus" });
    } catch (error) {
        return res.status(400).json(error);
    }
})


function verifyToken(req, resp, next) {
    const token = req.headers.authorization;
    if (token) {
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(400).send("Invalid JWT Token");
            } else {
                next();
            }
        })
    }
    else {
        resp.status(401).send("Please Add Token");
    }
}

app.get('/', (req, res) => {
    res.send('Hello World');
});
connectDb();
app.listen(PORT, () => { console.log(`Server started on http://localhost:${PORT}`) });