import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Banner from './Banner';

const BannersContainer = ({ closeBanner }) => {
  const banners = useSelector((state) => state.app.banners);

  const [infoBanners, setInfoBanners] = useState([]);

  useEffect(() => {
    setInfoBanners(banners);
  }, [banners]);

  return (
    <>
      <Banner banner={infoBanners[0]} close={closeBanner} show={infoBanners.length !== 0} />
    </>
  );
};

export default BannersContainer;
