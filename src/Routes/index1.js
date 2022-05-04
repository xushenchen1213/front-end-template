import Login from"../pages/Login"; 
import PageNotFound from"../pages/PageNotFound"; 
import Student from "../pages/students/Student";
import Teacher from "../pages/teachers/Teacher";
import User from "../pages/userinfo/User";

export const mainRoutes=[{
        path:'/login', element:Login
    },{
        path:'/notFound', element: PageNotFound
    }]
    export const adminRoutes=[{
    path:'/teacher', element: Teacher
    },{
    path:'/student', element: Student
    },{
    path:'/user', element: User}]