import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTable1721669315861 implements MigrationInterface {
    name = 'CreateAllTable1721669315861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`Order\`
            ADD \`NameReceived\` varchar(255) NULL,
            ADD \`PhoneNumber\` varchar(255) NULL,
            ADD \`Email\` varchar(255) NULL,
            ADD \`Address\` varchar(255) NULL
          `);
        //await queryRunner.query(`ALTER TABLE \`Order\` (\`NameReceived\` varchar(255) NULL, \`PhoneNumber\` varchar(255) NULL, \`Email\` varchar(255) NULL, \`Address\` varchar(255) NULL`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` DROP FOREIGN KEY \`FK_ed6b364c34a05be5c11cd4bbc80\``);
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` DROP FOREIGN KEY \`FK_fe40c0ef9c180bf635b2899eee1\``);
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` DROP FOREIGN KEY \`FK_44b3e702c419f480d14b7df4f96\``);
        await queryRunner.query(`ALTER TABLE \`JewelrySetting\` DROP FOREIGN KEY \`FK_d87fe3a6c984623fa33839bb1d4\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_7801a16c560b2df76c0a64e8455\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_1ffbd6363d12c970949fb53908c\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_332bd44d0fde3be7cc618a5cc85\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_a59ba69713765caf0c1e2c5ebc3\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_d6fcb584fc265983d0ce5a10b2e\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_b7bb10650d760424df4571ee3d5\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_d74fc40323e6e74bc3839e373d6\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_ef1ccbbba54707b874a1b3df2bf\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_c06525726296e24b9bf31c8f867\``);
        await queryRunner.query(`ALTER TABLE \`Certificate\` DROP FOREIGN KEY \`FK_f336682a2e0a7a6d43e112ee8d6\``);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` DROP FOREIGN KEY \`FK_53ec240e215a245c90ca349e60c\``);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` DROP FOREIGN KEY \`FK_1af09bfef8153f175e16073587e\``);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` DROP FOREIGN KEY \`FK_f7f9074e3314bdcf9d5d79eec9a\``);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` DROP FOREIGN KEY \`FK_2a80b04b3dfa404b976d035aeb4\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_f8a68b3419fb78d942a33445836\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_588f242bdafefcfeaf046da2c6a\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_66067f5f3673d509378b9b34151\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_8ad7c9e325be1665be3c021fdc0\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_9d3b1225f7550d8307bf99ddc4c\``);
        await queryRunner.query(`ALTER TABLE \`Account\` DROP FOREIGN KEY \`FK_1f40b69ab608afc66251c4d11ea\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_badcce4599250806d6bff5426eb\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_615919c21ee5a55c66b3d7859d5\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_e75f91068e5c01ca5860e0d2f6c\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_5ff8d6265e2f3b79b654ea717c4\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_3e24b08697d0dcb0ea607f9da64\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_702b00a19cd576fd332922cddb6\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_87d1a0e4fca950091a52e91be4e\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_a22922c02ef2239f2a5e0f42e55\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_242207db359f002548b506633bf\``);
        await queryRunner.query(`DROP TABLE \`JewelrySettingVariant\``);
        await queryRunner.query(`DROP TABLE \`MaterialJewelry\``);
        await queryRunner.query(`DROP TABLE \`JewelrySetting\``);
        await queryRunner.query(`DROP TABLE \`Feedback\``);
        await queryRunner.query(`DROP TABLE \`Diamond\``);
        await queryRunner.query(`DROP TABLE \`Certificate\``);
        await queryRunner.query(`DROP TABLE \`UsingImage\``);
        await queryRunner.query(`DROP TABLE \`Product\``);
        await queryRunner.query(`DROP TABLE \`Discount\``);
        await queryRunner.query(`DROP TABLE \`Collection\``);
        await queryRunner.query(`DROP INDEX \`REL_1f40b69ab608afc66251c4d11e\` ON \`Account\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` ON \`Account\``);
        await queryRunner.query(`DROP TABLE \`Account\``);
        await queryRunner.query(`DROP TABLE \`Customer\``);
        await queryRunner.query(`DROP TABLE \`Order\``);
        await queryRunner.query(`DROP TABLE \`OrderLine\``);
        await queryRunner.query(`DROP TABLE \`Voucher\``);
        await queryRunner.query(`DROP TABLE \`Notification\``);
        await queryRunner.query(`DROP TABLE \`JewelryType\``);
        await queryRunner.query(`DROP TABLE \`Size\``);
    }

}
