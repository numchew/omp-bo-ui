import { HInfo } from "./HInfo";
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LyInfo() {
  const location = useLocation();
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (location.pathname.indexOf('/order') > -1) {
      setLabel('ข้อมูลการสั่งสินค้า')
    } else if (location.pathname.indexOf('/customer') > -1) {
      setLabel('ข้อมูลลูกค้า')
    } else if (location.pathname.indexOf('/avatar') > -1) {
      setLabel('AVATAR')
    } else if (location.pathname.indexOf('/character') > -1) {
      setLabel('CHARACTER')
    } else if (location.pathname.indexOf('/productlist') > -1) {
      setLabel('PRODUCT LIST')
    } else if (location.pathname.indexOf('/employee') > -1) {
      setLabel('EMPLOYEE')
    }
  }, [location.pathname])

  //--------------------------------------------------//
  //--------------------------------------------------//
  return (
    <div className="flex-g">
      <HInfo label={label} />
      <Outlet />
    </div>
  );
}
