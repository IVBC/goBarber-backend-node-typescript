import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1589349762836
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true, // CASCADE se o prestador for deletado, o agendamento continua com null
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'], // id do usuario
        referencedTableName: 'users',
        onDelete: 'SET NULL', // O que vai acontecer com o agendamento caso o usuario seja deletado
        onUpdate: 'CASCADE', // Caso o id do usuario seja alterado, o provider_id será alterado para o mesmo
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
