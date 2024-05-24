import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';

const WordPressVersionSelector = () => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch('https://api.wordpress.org/core/version-check/1.7/');
        const data = await response.json();
        const allVersions = data.offers.map((offer: any) => offer.version);
        const lastFiveVersions = allVersions.slice(0, 5);
        setVersions(lastFiveVersions);
      } catch (error) {
        console.error('Error fetching WordPress versions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  const handleChange = (event: any) => {
    setVersion(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="wp-version-select-label">WordPress Version</InputLabel>
      {loading ? (
        <CircularProgress />
      ) : (
        <Select
          labelId="wp-version-select-label"
          id="wp-version-select"
          value={version}
          onChange={handleChange}
          label="WordPress Version"
        >
          {versions.map((version) => (
            <MenuItem key={version} value={version}>
              {version}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default WordPressVersionSelector;
