// App.js
import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AdminLayout from '@pages/admin/layouts/admin'
import Login from './pages/user/login/Login.jsx'
import SignUp from './pages/user/signUp/SignUp.jsx'
import Layout from './pages/layout/Layout.jsx'
import NotFoundPage from './pages/404/NotFoundPage.jsx'
import { Button, Result } from 'antd'
import ForgotPass from './pages/user/forgotPass/ForgetPass.jsx'
import Loading from '@components/loadingCommon/Loading.jsx'
import { getToken, getUserInfor, remoteUserInfor, removeToken, setUserInfor } from '@utils/auth.js'
import { callApiAuthen } from '@apis/index.jsx'
import HomePage from '@pages/user/homePage/HomePage.jsx'
import CategoryMain from '@pages/user/categoryMain/CategoryMain.jsx'
import DetailUser from '@pages/user/detailUser/DetailUser.jsx'
import ChangeInformation from '@pages/user/detailUser/personalInformation/ChangeInformation.jsx'
import AdditionalInformation from '@pages/user/detailUser/personalInformation/AdditionalInformation.jsx'
import DetailProduct from '@pages/user/product/index.jsx'
import ShoppingCart from '@pages/user/shoppingCart/ShoppingCart.jsx'
import CartProduct from '@components/cartProduct/CartProduct.jsx'
import FavoriteProducts from '@components/favoriteProducts/FavoriteProducts.jsx'
import OrderConfirmation from '@pages/user/orderConfirmation/OrderConfirmation.jsx'
import CouponPage from '@pages/user/coupon/CouponPage.jsx'
import Cart from '@pages/user/cart/Cart.jsx'
import AvailableCoupons from '@pages/user/coupon/couponComponent/AvailableCoupons.jsx'
import LastCoupon from '@pages/user/coupon/couponComponent/LastCoupon.jsx'
import ManagerQuestion from '@pages/user/q&a/ManagerQuestion.jsx'
import DSPCashIn from '@pages/user/dsp/DSPCashIn.jsx'
import DSPHistory from '@pages/user/dsp/DSPHistory.jsx'
import OrderHistory from '@pages/user/orderHistory/OrderHistory.jsx'
import TYCDeposit from '@pages/user/dsp/TYCDeposit.jsx'
import OrderHistoryDetail from '@pages/user/orderHistory/OrderHistoryDetail.jsx'
import AboutUs from '@pages/user/customerCenter/AboutUs.jsx'
import Service from '@pages/user/customerCenter/Service.jsx'
import Logout from '@pages/user/logout/Logout.jsx'
import TermsOfService from '@pages/user/termsOfService/TermsOfService.jsx'
import AskedQuestion from '@pages/user/askedQuestions/AskedQuestion.jsx'
import SettingFeature from '@pages/user/settingFeature/SettingFeature.jsx'
import SettingCountry from '@pages/user/settingCountry/SettingCountry.jsx'
import NewsPage from '@pages/user/news/NewsPage.jsx'
import CategoryComponent from '@pages/user/categoryMain/CategoryComponent.jsx'
import PrivacyPolicy from '@pages/user/privacyPolicy/PrivacyPolicy.jsx'
import ContentPrivacyPolicy from '@components/documentContent/ContentPrivacyPolicy.jsx'
import ContentTermsOfUse from '@components/documentContent/ContentTermsOfUse.jsx'
import TermsOfUse from '@pages/user/termsOfUse/TermsOfUse.jsx'
import SearchProduct from '@pages/user/product/featureProduct/SearchProduct.jsx'
import NavigateMenu from '@components/allMenu/navigateMenu/NavigateMenu.jsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const token = getToken('token') || ''
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token)
      try {
        const userRoles = decodedToken.authorities || []
        setIsAuthenticated(true)
        setUserRole(userRoles[0])

        // Get current user
        callApiAuthen(`/api/v1/user/current`, 'get', null)
          .then((res) => {
            setUserInfor(JSON.stringify(res.data))
          })
          .catch((error) => {
            if (error.response.status === 401) {
              removeToken('token')
              remoteUserInfor('userInfo')
              navigate('/login')
            }
          })
      } catch (error) {
        setIsAuthenticated(false)
        setUserRole('')
      }
    } else {
      setIsAuthenticated(false)
      setUserRole('')
    }
    setLoading(false)
  }, [token])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='product/:id' element={<DetailProduct />} />
          <Route path='search-product' element={<SearchProduct />} />
          <Route path='category' element={<CategoryComponent />} />
          <Route path='shopping-cart' element={<ShoppingCart />}>
            <Route index element={<CartProduct />} />
            <Route path='favorites' element={<FavoriteProducts />} />
          </Route>

          <Route path='order-confimation' element={<OrderConfirmation />} />
          <Route path='account' element={<DetailUser />}>
            <Route index path='change-information' element={<ChangeInformation />}></Route>
            <Route path='additional-info' element={<AdditionalInformation />}></Route>
            <Route path='tyc'>
              <Route path='cashin' element={<DSPCashIn />} />
              <Route path='transaction-history' element={<DSPHistory />} />
            </Route>
            <Route path='coupon' element={<CouponPage />}>
              <Route index element={<AvailableCoupons />} />
              <Route path='last-coupon' element={<LastCoupon />} />
            </Route>
          </Route>

          <Route path='tyc-deposit' element={<TYCDeposit />} />
          <Route path='order-history' element={<OrderHistory />} />

          <Route path='about-us' element={<AboutUs />} />
          <Route path='service' element={<Service />} />
          <Route path='logout' element={<Logout />} />

          <Route path='menu' element={<NavigateMenu />}>
            <Route path='asked-question' element={<AskedQuestion />} />
            <Route path='question' element={<ManagerQuestion />} />
            <Route path='terms-of-use' element={<TermsOfUse />} />
            <Route path='privacy-policy' element={<PrivacyPolicy />} />
            <Route path='setting-country' element={<SettingCountry />} />
          </Route>

          <Route path='order-history-detail/:id' element={<OrderHistoryDetail />} />
          <Route path='terms-of-service' element={<TermsOfService />} />
          <Route path='setting-feature' element={<SettingFeature />} />
          <Route path='news-page' element={<NewsPage />} />
          <Route path='terms-of-use-content' element={<ContentTermsOfUse />} />
        </Route>
        <Route
          path='/admin/*'
          element={
            isAuthenticated && userRole === 'role_admin' ? (
              <>
                <AdminLayout />
              </>
            ) : (
              <Result
                status='403'
                title={<div className='text-black'>403</div>}
                subTitle={<div className='text-black'>Sorry, you are not authorized to access this page.</div>}
                extra={
                  <Button type='primary' onClick={() => navigate('/login')} className='bg-admin-btn-primary'>
                    Login now
                  </Button>
                }
              />
            )
          }
        ></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPass />} />
        <Route path='privacy-policy-content' element={<ContentPrivacyPolicy />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
