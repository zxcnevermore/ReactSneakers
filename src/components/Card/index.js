import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

function Card({ id, itemid, title, price, imageUrl, onFavorite, onAddToCart, loading = false }) {
  const { hasCartItems, hasFavoritesItems } = React.useContext(AppContext);

  const obj = { id, itemid, title, price, imageUrl };

  const onLiked = () => {
    onFavorite(obj);
  };

  const onClickPlus = () => {
    onAddToCart(obj);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="108" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="134" rx="3" ry="3" width="93" height="15" />
          <rect x="1" y="162" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="153" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorit}>
            {onFavorite && (
              <img
                className="cu-p"
                src={hasFavoritesItems(itemid) ? 'img/heartliked.svg' : 'img/heartunliked.svg'}
                onClick={onLiked}
                alt="unliked"></img>
            )}
          </div>
          <img width={133} height={112} src={imageUrl} alt="1"></img>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена: </span>
              <b>{price} руб</b>
            </div>
            <div>
              {onAddToCart && (
                <img
                  className={styles.plus}
                  onClick={onClickPlus}
                  src={hasCartItems(itemid) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                  alt="Plus"></img>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
