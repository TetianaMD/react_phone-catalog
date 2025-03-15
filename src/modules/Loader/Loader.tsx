import classNames from 'classnames';
import styles from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={classNames(styles.loadingContainer)}>
      <div className={classNames(styles.loader)}></div>;
    </div>
  );
};
