import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './PlacementList.css';

const PlacementList = () => {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'placementsdata'));
        const placementsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Detailed logging
        console.log('Fetched Placements Data:', placementsData);

        // Sorting function with detailed logging
        placementsData.sort((a, b) => {
          // Check and log the 'timestamp' field
          const dateA = a.timestamp ? a.timestamp.toDate() : new Date(0);
          const dateB = b.timestamp ? b.timestamp.toDate() : new Date(0);

          console.log(`Date A: ${dateA}, Date B: ${dateB}`);

          return dateB - dateA; // Newest first
        });

        setPlacements(placementsData);
      } catch (error) {
        console.error('Error fetching placements:', error);
      }
    };

    fetchPlacements();
  }, []);

  return (
    <div className="placement-list-container">
      <div className="placement-cards">
        {placements.map((placement) => (
          <div key={placement.id} className="placement-card">
            <h3>{placement.companyName}</h3>
            <p>{placement.information}</p>
            <button onClick={() => window.open(placement.link, '_blank')} className="placement-link">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementList;
