import './styles.css';

import clsx from 'clsx';
import { Link, Outlet, useLocation } from 'react-router';

export default function RootLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <main className="layout">
      <header className="header">
        <div className="header-nav">
          <Link
            to="/upload-photo"
            className={clsx('header-nav-item', isActive('/upload-photo') && 'active')}
          >
            【題目一】上傳相片並顯示
          </Link>
          <Link
            to="/filter-search"
            className={clsx('header-nav-item', isActive('/filter-search') && 'active')}
          >
            【題目二】動態篩選
          </Link>
          <Link
            to="/photograph-book"
            className={clsx('header-nav-item', isActive('/photograph-book') && 'active')}
          >
            【題目三】翻書效果圖片輪播
          </Link>
        </div>
      </header>
      <div className="wrapper">
        <Outlet />
      </div>
    </main>
  );
}
