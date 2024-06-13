import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTable1718295770532 implements MigrationInterface {
    name = 'CreateAllTable1718295770532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Size\` (\`SizeID\` int NOT NULL AUTO_INCREMENT, \`SizeValue\` int NOT NULL, \`UnitOfMeasure\` varchar(255) NOT NULL, PRIMARY KEY (\`SizeID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`JewelryType\` (\`JewelryTypeID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NOT NULL, PRIMARY KEY (\`JewelryTypeID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`MaterialJewelry\` (\`MaterialID\` int NOT NULL AUTO_INCREMENT, \`BuyPrice\` int NULL, \`SellPrice\` int NULL, \`UpdateTime\` datetime NOT NULL, \`Name\` varchar(255) NOT NULL, PRIMARY KEY (\`MaterialID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Certificate\` (\`CerID\` int NOT NULL AUTO_INCREMENT, \`DiamondID\` int NULL, \`Name\` varchar(255) NULL, PRIMARY KEY (\`CerID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BillDiscount\` (\`BillDiscountID\` int NOT NULL AUTO_INCREMENT, \`StartDate\` datetime NOT NULL, \`EndDate\` datetime NOT NULL, \`PercentDiscounts\` int NOT NULL, \`OrderID\` int NULL, PRIMARY KEY (\`BillDiscountID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Notification\` (\`NotificationID\` int NOT NULL AUTO_INCREMENT, \`IsRead\` tinyint NOT NULL, \`Date\` datetime NULL, \`Message\` text NULL, \`AccountID\` int NULL, PRIMARY KEY (\`NotificationID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Feedback\` (\`FeedbackID\` int NOT NULL AUTO_INCREMENT, \`Stars\` int NULL, \`Comment\` text NULL, \`CommentTime\` datetime NULL, \`IsActive\` tinyint NOT NULL DEFAULT 1, \`DiamondID\` int NULL, \`ShellID\` int NULL, \`OrderID\` int NULL, \`AccountID\` int NULL, PRIMARY KEY (\`FeedbackID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Account\` (\`AccountID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NOT NULL, \`PhoneNumber\` varchar(13) NOT NULL, \`Email\` varchar(255) NOT NULL, \`Password\` varchar(255) NOT NULL, \`Role\` varchar(255) NOT NULL, \`CustomerID\` int NULL, UNIQUE INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` (\`Email\`), UNIQUE INDEX \`REL_1f40b69ab608afc66251c4d11e\` (\`CustomerID\`), PRIMARY KEY (\`AccountID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Customer\` (\`CustomerID\` int NOT NULL, \`Birthday\` datetime NULL, \`Gender\` tinyint NULL, \`Address\` varchar(255) NULL, PRIMARY KEY (\`CustomerID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Order\` (\`OrderID\` int NOT NULL AUTO_INCREMENT, \`OrderDate\` datetime NOT NULL, \`CompleteDate\` datetime NOT NULL, \`CustomerID\` int NULL, \`OrderStatus\` varchar(255) NULL, \`IsActive\` tinyint NOT NULL, \`AccountDeliveryID\` int NULL, \`AccountSaleID\` int NULL, PRIMARY KEY (\`OrderID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`OrderLine\` (\`OrderLineID\` int NOT NULL AUTO_INCREMENT, \`Quantity\` int NOT NULL DEFAULT '1', \`OrderID\` int NULL, \`DiamondID\` int NULL, \`ShellID\` int NULL, UNIQUE INDEX \`REL_87d1a0e4fca950091a52e91be4\` (\`DiamondID\`), PRIMARY KEY (\`OrderLineID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Diamond\` (\`DiamondID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NULL, \`Shape\` varchar(255) NULL, \`Cut\` varchar(255) NULL, \`Price\` int NULL, \`Color\` varchar(255) NULL, \`WeightCarat\` int NULL, \`PercentDepth\` int NULL, \`LengthOnWidthRatio\` int NULL, \`Description\` text NULL, \`IsActive\` tinyint NULL, \`Fluorescence\` varchar(255) NULL, \`Clarity\` varchar(255) NULL, \`PercentTable\` int NULL, \`Polish\` varchar(255) NULL, \`Symmetry\` varchar(255) NULL, \`ChargeRate\` int NULL, \`UpdateTime\` datetime NOT NULL, \`ShellID\` int NULL, PRIMARY KEY (\`DiamondID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Shell\` (\`ShellID\` int NOT NULL AUTO_INCREMENT, \`ProductionCost\` int NOT NULL, \`IsActive\` tinyint NOT NULL, \`Weight\` int NOT NULL, \`UpdateTime\` datetime NOT NULL, \`DiamondShape\` varchar(255) NULL, \`ChargeRate\` int NOT NULL DEFAULT '100', \`JewelryTypeID\` int NULL, \`MarterialJewelrID\` int NULL, \`MaterialID\` int NULL, PRIMARY KEY (\`ShellID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`SizeMatchShell\` (\`SizeMatchShellID\` int NOT NULL AUTO_INCREMENT, \`SizeID\` int NOT NULL, \`ShellID\` int NOT NULL, PRIMARY KEY (\`SizeMatchShellID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Certificate\` ADD CONSTRAINT \`FK_f336682a2e0a7a6d43e112ee8d6\` FOREIGN KEY (\`DiamondID\`) REFERENCES \`Diamond\`(\`DiamondID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`BillDiscount\` ADD CONSTRAINT \`FK_65a674bc4101168340694a4fef5\` FOREIGN KEY (\`OrderID\`) REFERENCES \`Order\`(\`OrderID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_242207db359f002548b506633bf\` FOREIGN KEY (\`AccountID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_d6fcb584fc265983d0ce5a10b2e\` FOREIGN KEY (\`DiamondID\`) REFERENCES \`Diamond\`(\`DiamondID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_ad7fd9a2781b7339e69986dbcc8\` FOREIGN KEY (\`ShellID\`) REFERENCES \`Shell\`(\`ShellID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_332bd44d0fde3be7cc618a5cc85\` FOREIGN KEY (\`OrderID\`) REFERENCES \`Order\`(\`OrderID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_1ffbd6363d12c970949fb53908c\` FOREIGN KEY (\`AccountID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Account\` ADD CONSTRAINT \`FK_1f40b69ab608afc66251c4d11ea\` FOREIGN KEY (\`CustomerID\`) REFERENCES \`Customer\`(\`CustomerID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_e75f91068e5c01ca5860e0d2f6c\` FOREIGN KEY (\`CustomerID\`) REFERENCES \`Customer\`(\`CustomerID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_615919c21ee5a55c66b3d7859d5\` FOREIGN KEY (\`AccountDeliveryID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_badcce4599250806d6bff5426eb\` FOREIGN KEY (\`AccountSaleID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` ADD CONSTRAINT \`FK_a22922c02ef2239f2a5e0f42e55\` FOREIGN KEY (\`OrderID\`) REFERENCES \`Order\`(\`OrderID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` ADD CONSTRAINT \`FK_87d1a0e4fca950091a52e91be4e\` FOREIGN KEY (\`DiamondID\`) REFERENCES \`Diamond\`(\`DiamondID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` ADD CONSTRAINT \`FK_1e975c25bf0bf28d5ffa58a3520\` FOREIGN KEY (\`ShellID\`) REFERENCES \`Shell\`(\`ShellID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Diamond\` ADD CONSTRAINT \`FK_4b38ba59cc9d763638b95b1802b\` FOREIGN KEY (\`ShellID\`) REFERENCES \`Shell\`(\`ShellID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Shell\` ADD CONSTRAINT \`FK_740132ed9a0786a2b92ccc4891c\` FOREIGN KEY (\`JewelryTypeID\`) REFERENCES \`JewelryType\`(\`JewelryTypeID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Shell\` ADD CONSTRAINT \`FK_ae032daa3f897646a4764879404\` FOREIGN KEY (\`MaterialID\`) REFERENCES \`MaterialJewelry\`(\`MaterialID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`SizeMatchShell\` ADD CONSTRAINT \`FK_8ba1c471806750b0194efbb4370\` FOREIGN KEY (\`SizeID\`) REFERENCES \`Size\`(\`SizeID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`SizeMatchShell\` ADD CONSTRAINT \`FK_4c87364b886e435cfe5fa004b50\` FOREIGN KEY (\`ShellID\`) REFERENCES \`Shell\`(\`ShellID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`SizeMatchShell\` DROP FOREIGN KEY \`FK_4c87364b886e435cfe5fa004b50\``);
        await queryRunner.query(`ALTER TABLE \`SizeMatchShell\` DROP FOREIGN KEY \`FK_8ba1c471806750b0194efbb4370\``);
        await queryRunner.query(`ALTER TABLE \`Shell\` DROP FOREIGN KEY \`FK_ae032daa3f897646a4764879404\``);
        await queryRunner.query(`ALTER TABLE \`Shell\` DROP FOREIGN KEY \`FK_740132ed9a0786a2b92ccc4891c\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_4b38ba59cc9d763638b95b1802b\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_1e975c25bf0bf28d5ffa58a3520\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_87d1a0e4fca950091a52e91be4e\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_a22922c02ef2239f2a5e0f42e55\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_badcce4599250806d6bff5426eb\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_615919c21ee5a55c66b3d7859d5\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_e75f91068e5c01ca5860e0d2f6c\``);
        await queryRunner.query(`ALTER TABLE \`Account\` DROP FOREIGN KEY \`FK_1f40b69ab608afc66251c4d11ea\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_1ffbd6363d12c970949fb53908c\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_332bd44d0fde3be7cc618a5cc85\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_ad7fd9a2781b7339e69986dbcc8\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_d6fcb584fc265983d0ce5a10b2e\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_242207db359f002548b506633bf\``);
        await queryRunner.query(`ALTER TABLE \`BillDiscount\` DROP FOREIGN KEY \`FK_65a674bc4101168340694a4fef5\``);
        await queryRunner.query(`ALTER TABLE \`Certificate\` DROP FOREIGN KEY \`FK_f336682a2e0a7a6d43e112ee8d6\``);
        await queryRunner.query(`DROP TABLE \`SizeMatchShell\``);
        await queryRunner.query(`DROP TABLE \`Shell\``);
        await queryRunner.query(`DROP TABLE \`Diamond\``);
        await queryRunner.query(`DROP INDEX \`REL_87d1a0e4fca950091a52e91be4\` ON \`OrderLine\``);
        await queryRunner.query(`DROP TABLE \`OrderLine\``);
        await queryRunner.query(`DROP TABLE \`Order\``);
        await queryRunner.query(`DROP TABLE \`Customer\``);
        await queryRunner.query(`DROP INDEX \`REL_1f40b69ab608afc66251c4d11e\` ON \`Account\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` ON \`Account\``);
        await queryRunner.query(`DROP TABLE \`Account\``);
        await queryRunner.query(`DROP TABLE \`Feedback\``);
        await queryRunner.query(`DROP TABLE \`Notification\``);
        await queryRunner.query(`DROP TABLE \`BillDiscount\``);
        await queryRunner.query(`DROP TABLE \`Certificate\``);
        await queryRunner.query(`DROP TABLE \`MaterialJewelry\``);
        await queryRunner.query(`DROP TABLE \`JewelryType\``);
        await queryRunner.query(`DROP TABLE \`Size\``);
    }

}
