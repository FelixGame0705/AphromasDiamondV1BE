import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDescriptionToProduct1626946245072 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.addColumn('Product', new TableColumn({
        //     name: 'Description',
        //     type: 'text',
        //     isNullable: true
        // }));
        // await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_c06525726296e24b9bf31c8f867\``);
        // await queryRunner.dropColumn('Diamond', 'JewelrySettingVariantID');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropColumn('Product', 'Description');
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_c06525726296e24b9bf31c8f867\``);
        await queryRunner.dropColumn('Diamond', 'JewelrySettingVariantID');
        await queryRunner.dropColumn('Product', 'Price');
        await queryRunner.dropColumn('Product', 'DiscountPrice');
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_588f242bdafefcfeaf046da2c6a\``);
        await queryRunner.dropColumn('Product', 'CollectionID');
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_d74fc40323e6e74bc3839e373d6\``);
        await queryRunner.dropColumn('Diamond', 'IndexVariantGroup');
        await queryRunner.dropColumn('Diamond', 'CollectionID');
        await queryRunner.query(`DROP TABLE \`Collection\``);
        
    }
}
