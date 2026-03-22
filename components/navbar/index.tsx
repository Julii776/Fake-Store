import { APP_ROUTES } from '@/constants/routes';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav className="xl:mx-[248px] mx-4 md:mx-16">
        <div className="flex h-16 items-center gap-4">
          <Link
            href={APP_ROUTES.DASHBOARD}
            className="text-2xl font-bold text-gray-900"
          >
            FakeStore
          </Link>

          <Link
            href={APP_ROUTES.PRODUCTS}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hover:underline underline-offset-4"
          >
            All
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
