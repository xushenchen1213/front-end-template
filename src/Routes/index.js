import Student from '../pages/students/Student';
import Teacher from '../pages/teachers/Teacher';
import User from '../pages/userinfo/User';
// import Login from '../pages/Login';
// import NotFound from '../Pages/PageNotFound';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function router(){
  return (
      <Router>
          <Routes>
              <Route path="/Student" element={<Student/>}/>
              <Route path="/Teacher" element={<Teacher/>}/>
              <Route path="/User" element={<User/>}/>
                {/* {adminRoutes.map(route=>{
                  return <Route key={route.path} {...route} />
                })} */}
          </Routes>
    </Router>
  )
}

export default router

// export const mainRoutes=[{
//   path:'/login', 
//   component: Login
//   },
//   {
//     path: '/PageNotFound',
//     component: NotFound
//   }
// ]
//   export const adminRoutes=[
//     {
//   path:'/Teacher', component:Teacher
//   },
//   {
//   path:'/Student', component:Student
//   },
//   {
//   path:'/User', component: User}]
  

