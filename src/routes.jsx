// Admin Imports
import MainDashboard from '@pages/admin/views/admin/default'
import Category from './pages/admin/views/admin/category'
import Promotion from './pages/admin/views/admin/promotion'

// Icon Imports
import IconDashboard from '@assets/icons/admin/IconDashboard.jsx'
import IconMember from '@assets/icons/admin/IconMember.jsx'
import IconTransaction from '@assets/icons/admin/IconTransaction.jsx'
import IconProduct from '@assets/icons/admin/IconProduct.jsx'
import IconPromotion from '@assets/icons/admin/IconPromotion.jsx'
import IconBoard from '@assets/icons/admin/IconBoard.jsx'
import IconCategory from '@assets/icons/admin/IconCategory.jsx'
import MemberInformation from '@pages/admin/views/admin/member/featureMember/MemberInformation.jsx'
import AddNewMember from '@pages/admin/views/admin/member/featureMember/AddNewMember'
import ManagerProduct from '@pages/admin/views/admin/product/ManagerProduct'
import ProductAdmin from './pages/admin/views/admin/product'
import AddNewProduct from '@pages/admin/views/admin/product/featureProduct/AddNewProduct'
import EditProduct from '@pages/admin/views/admin/product/featureProduct/EditProduct'
import TransactionAdmin from '@pages/admin/views/admin/transaction'
import ManagerTranction from '@pages/admin/views/admin/transaction/ManagerTransaction'
import DetailTransaction from '@pages/admin/views/admin/transaction/detailTransaction/DetailTransaction'
import MemberAdmin from '@pages/admin/views/admin/member'
import ManagerMember from '@pages/admin/views/admin/member/ManagerMember'
import BoardAdmin from './pages/admin/views/admin/board'
import ManagerBoard from '@pages/admin/views/admin/board/ManagerBoard'
import AddBoard from '@pages/admin/views/admin/board/featureBoard/AddBoard'
import UpdateBoard from '@pages/admin/views/admin/board/featureBoard/UpdateBoard'

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'manager-dashboard',
    icon: <IconDashboard />,
    component: <MainDashboard />,
  },

  {
    name: 'Manage Member',
    layout: '/admin',
    path: 'manager-member',
    icon: <IconMember />,
    component: <MemberAdmin />,
    children: [
      {
        index: true,
        icon: <IconMember />,
        component: <ManagerMember />,
      },
      {
        name: 'Add New Member',
        path: 'add-new-member',
        component: <AddNewMember />,
      },
      {
        name: 'Member Information',
        path: 'edit-member/:id',
        component: <MemberInformation />,
      },
    ],
  },

  {
    name: 'Manage Transaction',
    layout: '/admin',
    path: 'manager-transaction',
    icon: <IconTransaction />,
    component: <TransactionAdmin />,
    children: [
      {
        index: true,
        icon: <IconTransaction />,
        component: <ManagerTranction />,
      },
      {
        name: 'Check Transaction',
        path: 'detail-transaction/:id',
        component: <DetailTransaction />,
      },
    ],
  },

  {
    name: 'Manage Product',
    layout: '/admin',
    path: 'manager-product',
    icon: <IconProduct />,
    component: <ProductAdmin />,
    children: [
      {
        index: true,
        icon: <IconProduct />,
        component: <ManagerProduct />,
      },
      {
        name: 'Add New Product',
        path: 'add-product',
        component: <AddNewProduct />,
      },
      {
        name: 'Edit Product',
        path: 'edit-product/:id',
        component: <EditProduct />,
      },
    ],
  },
  {
    name: 'Manager Promotion',
    layout: '/admin',
    icon: <IconPromotion />,
    path: 'manager-promotion',
    component: <Promotion />,
  },

  {
    name: 'Manager Board',
    layout: '/admin',
    icon: <IconBoard />,
    path: 'manager-board',
    component: <BoardAdmin />,
    children: [
      {
        index: true,
        icon: <IconProduct />,
        component: <ManagerBoard />,
      },
      {
        name: 'Add New Write Board',
        path: 'add-board',
        component: <AddBoard />,
      },
      {
        name: 'Edit Write Board',
        path: 'edit-board/:id',
        component: <UpdateBoard />,
      },
    ],
  },
  {
    name: 'Manager Category',
    layout: '/admin',
    path: 'manager-category',
    icon: <IconCategory />,
    component: <Category />,
  },
]

export default routes
