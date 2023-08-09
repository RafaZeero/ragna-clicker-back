import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Response } from 'express';

@Controller('monsters')
export class MonsterController {
  constructor(private readonly monsterService: MonsterService) {}

  @Post()
  create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monsterService.create(createMonsterDto);
  }

  @Get()
  findAll() {
    return this.monsterService.findAll();
  }

  @Get(':monsterId')
  findOne(@Param('monsterId') monsterId: string, @Res() res: Response) {
    const { response } = this.monsterService.findOne(monsterId);

    if (response === 'Image not found') {
      return res.status(404).json({ response: 'Image not found' });
    }

    if (response === 'Monster Data not found') {
      return res.status(404).json({ response });
    }

    // Send file back to front
    return res.status(200).json({ response });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    return this.monsterService.update(+id, updateMonsterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monsterService.remove(+id);
  }
}

// # downloads
// app.get('/monsters/download/images', (req: Request, res: Response) => {
//   const monsters = req.body.monsters as Array<string>;

//   if (!monsters) return res.status(400).json({ message: 'No monsters provided' });

//   createMonsterImageFromRequest(monsters);

//   res.status(200).json({ message: 'Monster(s) file(s) created', monsters });
// });

// app.get('/monsters/download/data', (req: Request, res: Response) => {
//   const monsters = req.body.monsters as Array<string>;

//   if (!monsters) return res.status(400).json({ message: 'No monsters provided' });

//   createMonsterDataFromRequest(monsters);

//   res.status(200).json({ message: 'Monster(s) file(s) created', monsters });
// });
// # downloads end
