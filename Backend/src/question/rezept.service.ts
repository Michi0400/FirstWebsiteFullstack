import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { AngabeService } from '../angabe/angabe.service';
import { AngabeC, AngabeH } from './model/angabe.dto';
import { RezeptDTO } from './model/rezept.dto';
import { Rezept } from './model/rezept.entity';

@Injectable()
export class RezeptService {
  @Inject()
  private readonly angabenService: AngabeService;

  public HelpAngaben: AngabeC[] = [];

  constructor(
    @InjectRepository(Rezept)
    private readonly rezeptRepository: Repository<Rezept>,
    @InjectEntityManager('default')
    private readonly manager: EntityManager,
  ) { }

  public async getAll() {
    return this.rezeptRepository.find({ relations: ['angaben'] });
  }
  public async create({ name, description, angaben, anleitung }: RezeptDTO) {
    const resolvedAngaben = await this.angabenService.getByIds(
      angaben.map(a => a.id),
    );
    const rezept = this.rezeptRepository.create({
      name,
      description,
      anleitung,
      angaben: resolvedAngaben,
    });

    const q = await this.rezeptRepository.save(rezept);
    this.manager.transaction(async manager => {
      for (let i = 0; i < resolvedAngaben.length; i++) {
        await manager.query(`Update rezept_angaben_angabe set amount = $1, einheit = $2
        where "rezept_angaben_angabe"."rezeptId" = $3
        and "rezept_angaben_angabe"."angabeId" = $4`, [angaben[i].menge, angaben[i].einheit, q.id, resolvedAngaben[i].id])
      }
    })
    return q;
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.rezeptRepository.delete(id);
  }

  public async update(
    id: string,
    question: Rezept,
  ): Promise<UpdateResult> {
    return this.rezeptRepository.update(id, question);
  }

  public async getOne(id) {
    const rezept = await this.rezeptRepository.findOne(id, { relations: ["angaben"] });
    const resolvedAngaben = await this.angabenService.getByIds(
      rezept.angaben.map(a => a.id),
    );
    for (let i = 0; i < resolvedAngaben.length; i++) {
      const angabe: AngabeH[] = await this.manager
        .createQueryBuilder()
        .select('*')
        .from('rezept_angaben_angabe', 'rezept_angaben_angabe')
        .where("rezept_angaben_angabe.rezeptId = :qid", { qid: rezept.id })
        .andWhere("rezept_angaben_angabe.angabeId = :aid", { aid: resolvedAngaben[i].id })
        .getRawMany();

      const HelpAngabe = new AngabeC();
      HelpAngabe.id = resolvedAngaben[i].id;
      HelpAngabe.name = resolvedAngaben[i].name;
      HelpAngabe.menge = angabe[0].amount;
      HelpAngabe.einheit = angabe[0].einheit;
      this.HelpAngaben = [...this.HelpAngaben, HelpAngabe];
    }
    rezept.angaben = this.HelpAngaben;
    this.HelpAngaben = [];
    console.log(rezept)
    return rezept;
  }

}
