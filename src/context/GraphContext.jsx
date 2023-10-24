import { createContext, useEffect, useState } from "react"
import axios from "axios";

export const GraphContext = createContext();

function GraphContextProvider(props) {

  const [apiData, setApiData] = useState({});
  const [interactionsData, setInteractionsData] = useState([]);

  async function fetchApiData() {
    try {
      const response = await axios.get('https://substantive.pythonanywhere.com/');
      setApiData(response.data.interactions);
    } catch (error) {
      console.error('Error fetching API data: ', error);
    }
  }

  useEffect(() => {
    fetchApiData();
  }, []);

  useEffect(() => {
    if (Array.isArray(apiData) && apiData.length > 0) {
      const interactionsCount = {};

      apiData.forEach(interaction => {
        const sectorId = interaction.sector_id;
        interactionsCount[sectorId] = (interactionsCount[sectorId] || 0) + 1;
      });

      const newInteractionsData = Object.keys(interactionsCount).map(sectorId => {
        const count = interactionsCount[sectorId];
        const sectorName = apiData.find(interaction => interaction.sector_id === sectorId).name;
        const totalInteractions = apiData.length;
        const percentage = (count / totalInteractions) * 100;
        return {
          id: sectorId,
          name: sectorName,
          count: percentage.toFixed(2),
        };
      });

      setInteractionsData(newInteractionsData);
    }
  }, [apiData]);

  const value = {
    interactionsData,
  };

  return (
      <GraphContext.Provider value={value}>
      {props.children}
      </GraphContext.Provider>
  );
}

export default GraphContextProvider;
