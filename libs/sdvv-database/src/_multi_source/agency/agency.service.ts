import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { getCSD } from '../../shared/agencies';
import { AgencyEntity } from './agency.entity';

@Injectable()
export class AgencyQLService {
  constructor(private connection: Connection) {}

  async getAgency(id: string) {
    const agencies = await this.getAgencies();

    const result = agencies.find((agency) => agency.id === id);
    return result;
  }

  async getAgencies() {
    const query = this.connection
      .getRepository(AgencyEntity)
      .createQueryBuilder()
      .select('id')
      .addSelect('shortcut')
      .addSelect('name')
      .addSelect('software_name')
      .orderBy('shortcut', 'DESC');

    const agencies = await query.getRawMany();
    return agencies;

    // return getCSD();
  }
}
