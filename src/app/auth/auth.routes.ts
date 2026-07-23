import { Routes } from "@angular/router";
import { RegisterPage } from "./pages/register-page/register-page";

// Sección 14 del curso terminada 


export const authRoutes: Routes = [

{
 path: '',
 children: [
    {
        path: 'sign-up',
         component: RegisterPage, 
    },
    {
        path: '**',
        redirectTo: 'sign-up',
    }
 ],
},

]; 

export default authRoutes;
