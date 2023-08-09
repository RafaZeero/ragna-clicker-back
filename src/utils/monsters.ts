import axios from 'axios';
import { monsterDBPath } from './path';
import path from 'path';
import fs from 'fs';
import { pipe } from 'fp-ts/function';
import { MonsterData, MonsterRequest } from '@ragna-clicker/models';

export const mapMonsterData = (monster: MonsterRequest): MonsterData => ({
  id: monster.id,
  name: monster.name,
  stats: {
    hp: monster.stats.health,
    attributes: {
      agility: monster.stats.agi,
      dexterity: monster.stats.dex,
      inteligence: monster.stats.int,
      luck: monster.stats.luk,
      strength: monster.stats.str,
      vitality: monster.stats.vit,
    },
    defense: monster.stats.defense,
  },
  exp: {
    base: monster.stats.baseExperience,
    job: monster.stats.jobExperience,
  },
});

async function downloadImage(image: string) {
  const url = `https://db.irowiki.org/image/monster/${image}.png`;
  const outputPath = path.resolve(__dirname, 'images', 'monsters', `${image}.png`);
  const writer = fs.createWriteStream(outputPath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

const pushToArray = (array: Array<any>) => (data: any) => {
  array.push(data);
  return array;
};

async function monsterData(monster: string) {
  const url = `https://www.divine-pride.net/api/database/Monster/${monster}?apiKey=1aa1f34e90e8afdcadcb3c61b6d5fcd9`;
  const writer = (data: string) => fs.writeFileSync(monsterDBPath, data, { encoding: 'utf-8' });

  const response = await axios({
    url,
    method: 'GET',
  });

  const data = fs.readFileSync(monsterDBPath);

  const jsonData = JSON.parse(data.toString()) as { monsters: Array<any> };

  pipe(response.data, mapMonsterData, pushToArray(jsonData.monsters), () => jsonData, JSON.stringify, writer);
}

// Download images
export const createMonsterImageFromRequest = async (data: Array<string>) => {
  data.map(downloadImage);
};

export const createMonsterDataFromRequest = async (data: Array<string>) => {
  data.map(monsterData);
};
