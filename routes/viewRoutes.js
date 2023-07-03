const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');
const bookingController = require('../controller/bookingController');

const router = express.Router();

router.get(
 '/',
 bookingController.createBookingCheckout,
 authController.isLoggedIn,
 viewsController.getOverview
);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.get('/forgotPassword', viewsController.getForgotPasswordForm);
router.get('/resetPassword/:token', viewsController.getResetPasswordForm);

// router.post(
//  '/submit-user-data',
//  authController.protect,
//  viewsController.updateUserData
// );

module.exports = router;
