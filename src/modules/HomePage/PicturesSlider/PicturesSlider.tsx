import classNames from 'classnames';
import styles from './picturesSlider.module.scss';
import { useEffect, useState } from 'react';

export const PicturesSlider = () => {
  const image = [
    './img/Banner.png',
    './img/banner-accessories.png',
    './img/banner-phones.png',
    './img/banner-tablets.png',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex);
      setCurrentIndex(prevIndex => (prevIndex + 1) % image.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, image.length]);

  const startAnimation = (nextIndex: number) => {
    setPreviousIndex(currentIndex);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
    }, 1000);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? image.length - 1 : currentIndex - 1;

    startAnimation(prevIndex);
  };

  const goToNext = () => {
    startAnimation((currentIndex + 1) % image.length);
  };

  return (
    <div className={classNames(styles.containerBannerSlider)}>
      <button
        onClick={goToPrevious}
        className={classNames(styles.leftButtonSlider)}
      ></button>
      <div className={classNames(styles.containerImageSlider)}>
        <div
          className={classNames(
            styles.containerImage,
            isAnimating && styles.hidden,
          )}
        >
          <img
            src={image[previousIndex !== null ? previousIndex : currentIndex]}
            alt="Current"
            className={classNames(styles.image)}
          />
        </div>
      </div>
      <button
        onClick={goToNext}
        className={classNames(styles.rightButtonSlider)}
      ></button>

      <div className={classNames(styles.containerDashes)}>
        {image.map((_, index) => (
          <div key={index} className={classNames(styles.containerLine)}>
            <button
              className={classNames(
                styles.dashes,
                currentIndex === index && styles.activeDashes,
              )}
              onClick={() => startAnimation(index)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};
