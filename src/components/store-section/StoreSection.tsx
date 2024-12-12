import React from 'react'
import './StoreSection.css'
import { StoreSectionProps } from '../../types/types';
import { BsArrowRight } from 'react-icons/bs';
import StoreCard from '../store-card/StoreCard';

const StoreSection = ({ name, data }: StoreSectionProps) => {
    const displayStoreData = data.slice(0, 5); // Limit to the first 6 products

    return (
      <div className="store_section_container">
        <div className="store_name_container">
          <span>{name}</span>
  
          <div className="store_view_container">
            <span>View All</span>
            <BsArrowRight size={12} />
          </div>
        </div>
  
        <hr style={{ border: "0.5px solid #e5e7eb" }} />
  
        <div className="store_section_row">
          {displayStoreData.map((item, index) => (
              <StoreCard item={item}/> 
          ))}
        </div>
      </div>
    )
}

export default StoreSection