import { csv } from 'd3';

async function getData() {
  const data = await csv(csvData);
  return data;
}
