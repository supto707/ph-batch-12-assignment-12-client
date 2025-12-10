import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllProducts from './pages/AllProducts';
import ProductDetails from './pages/ProductDetails';
import PrivateRoute from './routes/PrivateRoute';
import RoleRoute from './routes/RoleRoute';
import DashboardLayout from './components/DashboardLayout';
import ManageUsers from './pages/dashboard/ManageUsers';
import AdminAllProducts from './pages/dashboard/AllProducts';
import AdminAllOrders from './pages/dashboard/AllOrders';
import AddProduct from './pages/dashboard/AddProduct';
import ManageProducts from './pages/dashboard/ManageProducts';
import PendingOrders from './pages/dashboard/PendingOrders';
import ApprovedOrders from './pages/dashboard/ApprovedOrders';
import MyOrders from './pages/dashboard/MyOrders';
import TrackOrder from './pages/dashboard/TrackOrder';
import Profile from './pages/dashboard/Profile';
import Analytics from './pages/dashboard/Analytics';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:id" element={
                <PrivateRoute><ProductDetails /></PrivateRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
              
              <Route path="/dashboard" element={
                <PrivateRoute><DashboardLayout /></PrivateRoute>
              }>
                <Route path="profile" element={<Profile />} />
                
                <Route path="manage-users" element={
                  <RoleRoute allowedRoles={['admin']}><ManageUsers /></RoleRoute>
                } />
                <Route path="all-products" element={
                  <RoleRoute allowedRoles={['admin']}><AdminAllProducts /></RoleRoute>
                } />
                <Route path="all-orders" element={
                  <RoleRoute allowedRoles={['admin']}><AdminAllOrders /></RoleRoute>
                } />
                <Route path="analytics" element={
                  <RoleRoute allowedRoles={['admin']}><Analytics /></RoleRoute>
                } />
                
                <Route path="add-product" element={
                  <RoleRoute allowedRoles={['manager']} requireApproved={true}><AddProduct /></RoleRoute>
                } />
                <Route path="manage-products" element={
                  <RoleRoute allowedRoles={['manager']}><ManageProducts /></RoleRoute>
                } />
                <Route path="pending-orders" element={
                  <RoleRoute allowedRoles={['manager']} requireApproved={true}><PendingOrders /></RoleRoute>
                } />
                <Route path="approved-orders" element={
                  <RoleRoute allowedRoles={['manager']} requireApproved={true}><ApprovedOrders /></RoleRoute>
                } />
                
                <Route path="my-orders" element={
                  <RoleRoute allowedRoles={['buyer']}><MyOrders /></RoleRoute>
                } />
                <Route path="track-order/:orderId" element={
                  <RoleRoute allowedRoles={['buyer']}><TrackOrder /></RoleRoute>
                } />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
