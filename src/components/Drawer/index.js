import Info from '../Info';
import React from 'react';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resplve) => setTimeout(resplve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const [isOrderComplete, setisOrderCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orederId, setOrderId] = React.useState(null);

  const { cartItems, totalprice, setCartItems } = useCart();

  const isOrderClick = async () => {
    try {
      const { data } = await axios.post('https://62f666fe612c13062b4db2e5.mockapi.io/orders', {
        items: cartItems,
        totalprice,
      });

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62f666fe612c13062b4db2e5.mockapi.io/cart/' + item.id);
        await delay(300);
      }

      setIsLoading(true);
      setOrderId(data.id);
      setCartItems([]);
      setisOrderCompleted(true);
    } catch (error) {
      alert('Не удалось оформить заказ');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img className="cu-p" onClick={onClose} src="img/btn-remove.svg" alt="Close"></img>
        </h2>

        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб</b>
                  </div>
                  <img
                    className="removeBtn"
                    onClick={() => onRemove(obj.id)}
                    src="img/btn-remove.svg"
                    alt="Remove"></img>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalprice} руб. </b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalprice / 100) * 5} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={isOrderClick} className="greenButton">
                Оформить заказ<img src="img/arrow.svg" alt="Arrow"></img>
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Коризна пустая'}
            desc={
              isOrderComplete
                ? `Ваш заказ #${orederId} скоро будет передан курьерской доставке`
                : 'Добавьте хотябы одну пару кроссовок, чтобы сделать заказ.'
            }
            imageUrl={isOrderComplete ? '/img/complete-order.jpg' : '/img/cart-empty.svg'}
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
