import { csv } from 'd3';
import csvData from './proteins.csv';

async function getData() {
  const data = await csv(csvData);
  return data;
}

const arrayStrConversion = str => {
  const newStr = str.replace(/'/g, '"');
  const array = JSON.parse(newStr);
  return array;
};

const getProteins = async () => {
  const proteinsData = [];
  const proteins = await getData();
  proteins.forEach(el => {
    const protein = {};
    protein.value = el['Entry name'];
    protein.label = el['Entry name'];
    protein.description = el['Protein names'];
    protein.disulfideBonds = arrayStrConversion(el['Dislfide bond']);
    protein.glycoslation = arrayStrConversion(el.Glycosylation);
    protein.length = parseInt(el.Length, 10);
    proteinsData.push(protein);
  });
  return proteinsData;
};

export default { getProteins };
