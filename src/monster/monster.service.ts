import * as path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { monsterDBPath } from '@ragna-clicker/utils';

@Injectable()
export class MonsterService {
  create(_createMonsterDto: CreateMonsterDto) {
    return 'This action adds a new monster';
  }

  findAll() {
    return `This action returns all monster`;
  }

  findOne(monsterId: string) {
    // Monster Id from params
    const monsterID = monsterId;

    // Get image from file
    const monsterImage = this._imageFromFile(monsterID);

    if (!monsterImage) {
      return { response: 'Image not found' };
    }

    // Get data from file
    const monsterInfo = fs.readFileSync(monsterDBPath);
    const jsonData = JSON.parse(monsterInfo.toString()) as {
      monsters: Array<any>;
    };

    const monsterData = jsonData.monsters.find(monster => monster.id === parseInt(monsterID));

    if (!monsterData) {
      return { response: 'Monster Data not found' };
    }

    // Send file back to front
    return { response: { monsterImage, monsterData } };
  }

  update(id: number, _updateMonsterDto: UpdateMonsterDto) {
    return `This action updates a #${id} monster`;
  }

  remove(id: number) {
    return `This action removes a #${id} monster`;
  }

  private _checkImageExists = (file: string): boolean => {
    // const maybeFile = fs.existsSync(path.join(process.cwd(), `/images/monsters/${file}.png`));
    const maybeFile = fs.existsSync(path.join(process.cwd(), `/src/images/monsters/${file}.png`));

    return maybeFile;
  };

  private _imageFromFile = (file: string) => {
    return this._checkImageExists(file)
      ? 'data:image/png;base64,' +
          fs.readFileSync(path.join(process.cwd(), `/src/images/monsters/${file}.png`), 'base64')
      : 'data:image/png;base64,' +
          // fs.readFileSync(path.join(process.cwd(), `back/src/images/monsters/not-found.png`), 'base64');
          fs.readFileSync(path.join(process.cwd(), `/src/images/monsters/not-found.png`), 'base64');
  };
}
