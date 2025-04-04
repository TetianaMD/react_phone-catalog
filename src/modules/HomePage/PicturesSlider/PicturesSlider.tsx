import classNames from 'classnames';
import styles from './picturesSlider.module.scss';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

interface PicturesSliderProps {
  title: string;
}

export const PicturesSlider: React.FC<PicturesSliderProps> = ({ title }) => {
  const image = [
    './img/Banner.png',
    './img/banner-accessories.png',
    './img/banner-phones.png',
    './img/banner-tablets.png',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const swiperRef = useRef<SwiperRef | null>(null);

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? image.length - 1 : currentIndex - 1;

    setCurrentIndex(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % image.length;

    setCurrentIndex(nextIndex);
  };

  return (
    <section className={classNames(styles.containerBanner)}>
      <div className={classNames(styles.containerTitle)}>
        {' '}
        <h1 className={classNames(styles.title)}>{title}</h1>
      </div>
      <div className={classNames(styles.containerBannerSlider)}>
        {' '}
        <button
          onClick={goToPrevious}
          className={classNames(styles.leftButtonSlider)}
        ></button>
        <Swiper
          ref={swiperRef}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1000}
          // onSlideChange={swiper => setCurrentIndex(swiper.realIndex)}
          className={classNames(styles.slickContainer)}
          autoHeight
        >
          {image.map((img, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <img src={img} alt={`Slide ${index}`} className={styles.image} />
            </SwiperSlide>
          ))}
        </Swiper>
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
                onClick={() => setCurrentIndex(index)}
              ></button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
