import React from 'react';
import './SkeletonLoader.css';  // Import CSS file

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-image"></div>
      <div className="skeleton-text">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line full"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
