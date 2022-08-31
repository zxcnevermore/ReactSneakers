import { Link } from 'react-router-dom';
import React from 'react';
import { useCart } from '../hooks/useCart';

function Header(props) {
  const { totalprice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.svg" alt="logo"></img>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <div>
        <ul className="d-flex">
          <li className="mr-30 cu-p">
            <img
              width={20}
              height={20}
              onClick={props.onClickCart}
              src="img/cart.svg"
              alt="Корзина"></img>
            <span>{totalprice} руб.</span>
          </li>
          <li className="cu-p mr-20">
            <Link to="/favorites">
              <img width={20} height={20} src="img/favorite.svg" alt="Закладки"></img>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img width={20} height={20} src="img/user.svg" alt="Пользователь"></img>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
export default Header;
