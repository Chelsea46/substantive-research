import axios from "axios";
import { useEffect, useState} from "react";

export default function Graph(){

  const [apiData, setApiData] = useState({});
  const [maxSectorId, setMaxSectorId] = useState('');
  const [sectorCounts, setSectorCounts] = useState({});
  const [sectorPercentages, setSectorPercentages] = useState({});

  async function fetchApiData() {
    try {
      const response = await axios.get('https://substantive.pythonanywhere.com/')
      setApiData(response.data.interactions);
    } catch (error) {
      console.error('Error fetching API data: ', error);
    }
  }

  useEffect(() => {
    fetchApiData();
  }, []);

  useEffect(() => {
    if(Array.isArray(apiData)){
      const sectorIds = apiData.map(interaction => interaction.sector_id);
      setMaxSectorId(Math.max(...sectorIds));
    }
  }, [apiData])

  useEffect(() => {
    if (maxSectorId && Array.isArray(apiData) && apiData.length > 0) {
      const counts = {};

      apiData.forEach(interaction => {
        const sectorId = interaction.sector_id;
        counts[sectorId] = (counts[sectorId] || 0) + 1;
      });

      setSectorCounts(counts);
    }
  }, [apiData, maxSectorId]);

  useEffect(() => {
    if (maxSectorId && Object.keys(sectorCounts).length > 0) {
      const percentages = {};

      for (const sectorId in sectorCounts) {
        percentages[sectorId] = (sectorCounts[sectorId] / apiData.length) * 100;
      }

      setSectorPercentages(percentages);
    }
  }, [apiData, maxSectorId, sectorCounts]);

  console.log(sectorPercentages);

  return(
    <>
    </>
  )
}
