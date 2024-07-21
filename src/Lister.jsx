import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import './lister.css';
import { db } from '../firebaseConfig';

const Lister = () => {
  const [placements, setPlacements] = useState([]);
  const [companyName, setCompanyName] = useState('');
  const [information, setInformation] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState(''); // To display success or error messages

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'placementsdata'));
        const placementsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort placements by timestamp (if available)
        placementsData.sort((a, b) => {
          const dateA = a.timestamp ? a.timestamp.toDate() : new Date(0);
          const dateB = b.timestamp ? b.timestamp.toDate() : new Date(0);
          return dateB - dateA; // Newest first
        });

        setPlacements(placementsData);
      } catch (error) {
        console.error('Error fetching placements: ', error);
      }
    };

    fetchPlacements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'placementsdata'), {
        companyName,
        information,
        link,
        timestamp: Timestamp.fromDate(new Date()), // Add current timestamp
      });

      // Fetch placements again to refresh the list
      const querySnapshot = await getDocs(collection(db, 'placementsdata'));
      const placementsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort placements by timestamp (if available)
      placementsData.sort((a, b) => {
        const dateA = a.timestamp ? a.timestamp.toDate() : new Date(0);
        const dateB = b.timestamp ? b.timestamp.toDate() : new Date(0);
        return dateB - dateA; // Newest first
      });

      setPlacements(placementsData);

      // Clear form fields and show success message
      setCompanyName('');
      setInformation('');
      setLink('');
      setMessage('Placement added successfully!');
    } catch (error) {
      console.error('Error adding placement: ', error);
      setMessage('Error adding placement. Please try again.');
    }
  };

  return (
    <div className="placement-form-container">
      <h1>PLACEMENT LISTER</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          required
          className="input-field"
        />
        <textarea
          value={information}
          onChange={(e) => setInformation(e.target.value)}
          placeholder="Information"
          required
          className="textarea-field"
        />
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link"
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Add Placement</button>
      </form>

      <ul className="placement-list">
        {placements.map((placement) => (
          <li key={placement.id} className="placement-item">
            <h3>{placement.companyName}</h3>
            <p>{placement.information}</p>
            <p><a href={placement.link} target="_blank" rel="noopener noreferrer">Link</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lister;
