import { 
  DashboardOutlined,  
  FundOutlined, 
  DotChartOutlined,
} from '@ant-design/icons';
import { APP_PREFIX_PATH,  } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'dashboards-dafault',
      path: `${APP_PREFIX_PATH}/dashboards/default`,
      title: 'Summary',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
 
    {
      key: 'dashboards-analytic',
      path: `${APP_PREFIX_PATH}/dashboards/analytic`,
      title: 'Bank and Cash Accounts',
      icon: DotChartOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'dashboards-sales',
      path: `${APP_PREFIX_PATH}/dashboards/sales`,
      title: 'Receipts',
      icon: FundOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]


const navigationConfig = [
  ...dashBoardNavTree,
  
]

export default navigationConfig;
