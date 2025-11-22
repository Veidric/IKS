import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Component } from '@angular/core';
import { Register } from './register/register';

export const routes: Routes = [
  {path: '', component: Login},
  {path: 'reg', component: Register},
];
