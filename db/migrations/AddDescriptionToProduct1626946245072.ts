import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDescriptionToProduct1626946245072 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('Product', new TableColumn({
            name: 'Description',
            type: 'text',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('Product', 'Description');
    }
}
