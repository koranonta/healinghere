import {images} from '../../util/Images';

export const sideBarData = [
  {
    title: 'dashboard',
    path: '/',
    icon: images.user_white,
    activeIcon: images.user,
  },
  {
    title: 'สมาชิก',
    path: '/member',
    icon: images.user_white,
    activeIcon: images.user,
  },
  {
    title: 'ออมทรัพย์/กู้ยืม',
    path: '/savingandloan',
    icon: images.user_white,
    activeIcon: images.user,    
  },
  {
    title: 'ผู้ใช้',
    path: '/users',
    icon: images.user_white,
    activeIcon: images.user,    
  },
  {
    title: 'การตั้งค่า',
    path: '/settings',
    icon: images.setting_white,
    activeIcon: images.setting,
  },  
];
