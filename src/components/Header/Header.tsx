import { Buttons } from './Buttons/Buttons';
import { Logo } from './Logo/Logo';
import { MenuItems } from './MenuItems/MenuItems';
import './header.scss';

export const Header = () => {
  return (
    <header className="container_header">
      <div>
        <Logo />
      </div>

      <div>
        <MenuItems />
      </div>

      <div>
        <Buttons />
      </div>
    </header>
  );
};
