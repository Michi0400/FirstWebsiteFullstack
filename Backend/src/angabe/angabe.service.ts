import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Angabe } from './model/angabe.entity';

@Injectable()
export class AngabeService {

    constructor(@InjectRepository(Angabe) private readonly anlagenRepository: Repository<Angabe>) {
    }

    public async getAll(searchTerm: string) {
        const ss = ["%"];
        for (const s of searchTerm) {
            ss.push(s, "%")
        }
        return this.anlagenRepository.find({
            where: {
                name: Like(ss.join(''))
            }
        })
    }

    public async getByIds(ids: string[]) {
        return this.anlagenRepository.findByIds(ids)
    }

    public async create() {
        const a = new Angabe();
        a.name = "Gegenstand 3";

        this.anlagenRepository.save(a);
    }
}
