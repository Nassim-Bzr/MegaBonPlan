const React = require('react');

const Swiper = ({ children }) => React.createElement('div', null, children);
const SwiperSlide = ({ children }) => React.createElement('div', null, children);

module.exports = {
  Swiper,
  SwiperSlide,
  EffectCube: 'EffectCube',
  Pagination: 'Pagination',
  Navigation: 'Navigation',
  Autoplay: 'Autoplay'
}; 