import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ElectionEntity } from '@app/efile-api-data/tables/entity/elections.entity';
import { getCSD } from '@app/sdvv-database/shared/agencies';

interface ElectionsInput {
  electionYear?: any;
  filters?: any;
}

@Injectable()
export class ElectionService {
  constructor(private connection: Connection) {}

  async getElections({ electionYear, filters }: ElectionsInput) {
    if (electionYear) return await this.getElectionsByYear({ electionYear });

    if (filters) return this.getElectionsByFilter({ filters });
  }

  async getElectionsByFilter({ filters }) {
    const { agencyId, electionYear } = filters;

    const agencies = getCSD();
    const result = agencies.find((agency) => agency.id === agencyId);
    if (!result) return [];

    const agencyName = result.name;

    const query = this.connection
      .getRepository(ElectionEntity)
      .createQueryBuilder()
      .select(`MD5(LOWER(election_date || election_type || :agencyName))`, 'id')
      .setParameter('agencyName', agencyName)

      .addSelect(`:agencyId`, 'agencyId')
      .setParameter('agencyId', agencyId)

      .addSelect(`election_date || ' ' || election_type`, 'name')
      .addSelect('election_date', 'date')
      .addSelect(
        `EXTRACT(YEAR FROM TO_DATE(election_date, 'MM/DD/YYYY'))`,
        'year',
      )
      .addSelect('election_type', 'type');

    if (electionYear) {
      query.where(
        `EXTRACT(YEAR FROM TO_DATE(election_date, 'MM/DD/YYYY')) = :electionYear`,
        {
          electionYear,
        },
      );
    }

    const elections = await query.getRawMany();
    return elections;
  }

  async getElectionsByYear({ electionYear }) {
    const query = this.connection
      .getRepository(ElectionEntity)
      .createQueryBuilder()
      .select('election_id')
      .addSelect('UPPER(election_type)', 'type')
      .addSelect('election_date', 'date')
      .where(
        `EXTRACT(YEAR FROM TO_DATE(election_date, 'MM/DD/YYYY')) = :electionYear`,
        {
          electionYear,
        },
      )
      .andWhere('UPPER(election_type) IN (:...election_types)', {
        election_types: ['GENERAL', 'PRIMARY'],
      });

    const elections = await query.getRawMany();
    return elections;
  }
}
