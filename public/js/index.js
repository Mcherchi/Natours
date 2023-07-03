import '@babel/polyfill';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { forgotPassword } from './frogotPassword';
import { resetPassword } from './resetPassword';
import { bookTour } from './stripe';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const forgotPasswordForm = document.querySelector('.form--forgot-password');
const resetPasswordForm = document.querySelector('.form--reset-password');
const bookBtn = document.getElementById('book-tour');

if (loginForm)
 loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
 });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (signupForm)
 signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  signup({ name, email, password, passwordConfirm });
 });

if (userDataForm)
 userDataForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append('name', document.getElementById('name').value);
  form.append('email', document.getElementById('email').value);
  form.append('photo', document.getElementById('photo').files[0]);
  console.log(form);
  updateSettings(form, 'data');
 });

if (userPasswordForm)
 userPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.querySelector('.btn--save-password').textContent = 'Updating...';

  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  await updateSettings(
   { passwordCurrent, password, passwordConfirm },
   'password'
  );

  document.querySelector('.btn--save-password').textContent = 'Save password';
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password-confirm').value = '';
 });

if (forgotPasswordForm)
 forgotPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  await forgotPassword(email);
 });

if (resetPasswordForm)
 resetPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = window.location.pathname.split('/')[2];
  console.log(token);
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;
  await resetPassword(password, passwordConfirm, token);
 });

if (bookBtn)
 bookBtn.addEventListener('click', (e) => {
  e.target.textContent = 'Processing...';
  const { tourId } = e.target.dataset;
  bookTour(tourId);
 });
