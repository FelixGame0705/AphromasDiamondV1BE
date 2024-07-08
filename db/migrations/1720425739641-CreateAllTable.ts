import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTable1720425739641 implements MigrationInterface {
    name = 'CreateAllTable1720425739641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`JewelryType\` (\`JewelryTypeID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NOT NULL, PRIMARY KEY (\`JewelryTypeID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Certificate\` (\`CertificateID\` int NOT NULL AUTO_INCREMENT, \`DiamondID\` int NULL, \`Name\` varchar(255) NULL, PRIMARY KEY (\`CertificateID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Voucher\` (\`VoucherID\` int NOT NULL AUTO_INCREMENT, \`VoucherCode\` varchar(255) NULL, \`Description\` varchar(255) NULL, \`StartDate\` datetime NOT NULL, \`EndDate\` datetime NOT NULL, \`PercentDiscounts\` int NOT NULL, \`OrderID\` int NULL, PRIMARY KEY (\`VoucherID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Notification\` (\`NotificationID\` int NOT NULL AUTO_INCREMENT, \`IsRead\` tinyint NOT NULL, \`Date\` datetime NULL, \`Message\` text NULL, \`AccountID\` int NULL, PRIMARY KEY (\`NotificationID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Feedback\` (\`FeedbackID\` int NOT NULL AUTO_INCREMENT, \`Stars\` int NULL, \`Comment\` text NULL, \`CommentTime\` datetime NULL, \`IsActive\` tinyint NOT NULL DEFAULT 1, \`DiamondID\` int NULL, \`JewelrySettingID\` int NULL, \`OrderID\` int NULL, \`AccountID\` int NULL, \`ProductID\` int NULL, PRIMARY KEY (\`FeedbackID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Account\` (\`AccountID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NOT NULL, \`PhoneNumber\` varchar(13) NOT NULL, \`Email\` varchar(255) NOT NULL, \`Password\` varchar(255) NOT NULL, \`Role\` varchar(255) NOT NULL, \`CustomerID\` int NULL, UNIQUE INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` (\`Email\`), UNIQUE INDEX \`REL_1f40b69ab608afc66251c4d11e\` (\`CustomerID\`), PRIMARY KEY (\`AccountID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Customer\` (\`CustomerID\` int NOT NULL AUTO_INCREMENT, \`Birthday\` datetime NULL, \`Gender\` tinyint NULL, \`Address\` varchar(255) NULL, PRIMARY KEY (\`CustomerID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Order\` (\`OrderID\` int NOT NULL AUTO_INCREMENT, \`OrderDate\` datetime NOT NULL, \`CompleteDate\` datetime NOT NULL, \`CustomerID\` int NULL, \`OrderStatus\` varchar(255) NULL, \`IsActive\` tinyint NOT NULL, \`AccountDeliveryID\` int NULL, \`AccountSaleID\` int NULL, PRIMARY KEY (\`OrderID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`OrderLine\` (\`OrderLineID\` int NOT NULL AUTO_INCREMENT, \`Quantity\` int NOT NULL DEFAULT '1', \`OrderID\` int NULL, \`DiamondID\` int NULL, \`ProductID\` int NULL, \`CustomerID\` int NULL, UNIQUE INDEX \`REL_87d1a0e4fca950091a52e91be4\` (\`DiamondID\`), PRIMARY KEY (\`OrderLineID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Collection\` (\`CollectionID\` int NOT NULL AUTO_INCREMENT, \`CollectionName\` varchar(255) NULL, \`Description\` varchar(255) NULL, \`DebutTime\` datetime NULL, PRIMARY KEY (\`CollectionID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Discount\` (\`DiscountID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NULL, \`Description\` varchar(255) NULL, \`StartDate\` datetime NULL, \`EndDate\` datetime NULL, \`PercentDiscounts\` int NOT NULL DEFAULT '0', \`FinalPrice\` int NULL, PRIMARY KEY (\`DiscountID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Diamond\` (\`DiamondID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NULL, \`Shape\` varchar(255) NULL, \`Cut\` varchar(255) NULL, \`Price\` int NULL, \`Color\` varchar(255) NULL, \`WeightCarat\` int NULL, \`PercentDepth\` int NULL, \`LengthOnWidthRatio\` int NULL, \`Description\` text NULL, \`IsActive\` tinyint NULL, \`Fluorescence\` varchar(255) NULL, \`Clarity\` varchar(255) NULL, \`PercentTable\` int NULL, \`Polish\` varchar(255) NULL, \`Symmetry\` varchar(255) NULL, \`ChargeRate\` int NULL, \`UpdateTime\` datetime NOT NULL, \`JewelrySettingID\` int NULL, \`ProductID\` int NULL, \`CollectionID\` int NULL, \`DiscountID\` int NULL, PRIMARY KEY (\`DiamondID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Size\` (\`SizeID\` int NOT NULL AUTO_INCREMENT, \`SizeValue\` int NOT NULL, \`UnitOfMeasure\` varchar(255) NOT NULL, PRIMARY KEY (\`SizeID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`MaterialJewelry\` (\`MaterialJewelryID\` int NOT NULL AUTO_INCREMENT, \`BuyPrice\` int NULL, \`SellPrice\` int NULL, \`UpdateTime\` datetime NOT NULL, \`Name\` varchar(255) NOT NULL, PRIMARY KEY (\`MaterialJewelryID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`JewelrySettingVariant\` (\`JewelrySettingVariantID\` int NOT NULL AUTO_INCREMENT, \`SizeID\` int NULL, \`JewelrySettingID\` int NULL, \`MaterialJewelryID\` int NULL, \`Weight\` int NOT NULL, \`Amount\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`JewelrySettingVariantID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`JewelrySetting\` (\`JewelrySettingID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NOT NULL, \`ProductionCost\` int NOT NULL, \`AuxiliaryCost\` int NOT NULL, \`IsActive\` tinyint NOT NULL, \`UpdateTime\` datetime NOT NULL, \`DiamondShape\` varchar(255) NULL, \`ChargeRate\` int NOT NULL DEFAULT '100', \`JewelryTypeID\` int NULL, \`ProductID\` int NULL, UNIQUE INDEX \`REL_5cd826fd008793434bc4ce4da1\` (\`ProductID\`), PRIMARY KEY (\`JewelrySettingID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product\` (\`ProductID\` int NOT NULL AUTO_INCREMENT, \`Name\` varchar(255) NULL, \`Inscription\` varchar(255) NULL, \`InscriptionFont\` varchar(255) NULL, \`Brand\` varchar(255) NULL, \`JewelrySettingID\` int NULL, \`AccountID\` int NULL, \`CollectionID\` int NULL, \`DiscountID\` int NULL, PRIMARY KEY (\`ProductID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UsingImage\` (\`UsingImageID\` int NOT NULL AUTO_INCREMENT, \`ProductID\` int NULL, \`DiamondID\` int NULL, \`JewelrySettingID\` int NULL, \`Name\` varchar(255) NULL, \`url\` varchar(255) NULL, \`CertificateID\` int NULL, PRIMARY KEY (\`UsingImageID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Certificate\` ADD CONSTRAINT \`FK_f336682a2e0a7a6d43e112ee8d6\` FOREIGN KEY (\`DiamondID\`) REFERENCES \`Diamond\`(\`DiamondID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Voucher\` ADD CONSTRAINT \`FK_14b3ff9672754a7c6d0cfa5fe65\` FOREIGN KEY (\`OrderID\`) REFERENCES \`Order\`(\`OrderID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Notification\` ADD CONSTRAINT \`FK_242207db359f002548b506633bf\` FOREIGN KEY (\`AccountID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_d6fcb584fc265983d0ce5a10b2e\` FOREIGN KEY (\`DiamondID\`) REFERENCES \`Diamond\`(\`DiamondID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_a59ba69713765caf0c1e2c5ebc3\` FOREIGN KEY (\`JewelrySettingID\`) REFERENCES \`JewelrySetting\`(\`JewelrySettingID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_332bd44d0fde3be7cc618a5cc85\` FOREIGN KEY (\`OrderID\`) REFERENCES \`Order\`(\`OrderID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_1ffbd6363d12c970949fb53908c\` FOREIGN KEY (\`AccountID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Feedback\` ADD CONSTRAINT \`FK_7801a16c560b2df76c0a64e8455\` FOREIGN KEY (\`ProductID\`) REFERENCES \`Product\`(\`ProductID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Account\` ADD CONSTRAINT \`FK_1f40b69ab608afc66251c4d11ea\` FOREIGN KEY (\`CustomerID\`) REFERENCES \`Customer\`(\`CustomerID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_e75f91068e5c01ca5860e0d2f6c\` FOREIGN KEY (\`CustomerID\`) REFERENCES \`Customer\`(\`CustomerID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_615919c21ee5a55c66b3d7859d5\` FOREIGN KEY (\`AccountDeliveryID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Order\` ADD CONSTRAINT \`FK_badcce4599250806d6bff5426eb\` FOREIGN KEY (\`AccountSaleID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` ADD CONSTRAINT \`FK_a22922c02ef2239f2a5e0f42e55\` FOREIGN KEY (\`OrderID\`) REFERENCES \`Order\`(\`OrderID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` ADD CONSTRAINT \`FK_87d1a0e4fca950091a52e91be4e\` FOREIGN KEY (\`DiamondID\`) REFERENCES \`Diamond\`(\`DiamondID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` ADD CONSTRAINT \`FK_702b00a19cd576fd332922cddb6\` FOREIGN KEY (\`ProductID\`) REFERENCES \`Product\`(\`ProductID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` ADD CONSTRAINT \`FK_3e24b08697d0dcb0ea607f9da64\` FOREIGN KEY (\`CustomerID\`) REFERENCES \`Customer\`(\`CustomerID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Diamond\` ADD CONSTRAINT \`FK_beac11fc7b1deab9050b9c00ce0\` FOREIGN KEY (\`JewelrySettingID\`) REFERENCES \`JewelrySetting\`(\`JewelrySettingID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Diamond\` ADD CONSTRAINT \`FK_ef1ccbbba54707b874a1b3df2bf\` FOREIGN KEY (\`ProductID\`) REFERENCES \`Product\`(\`ProductID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Diamond\` ADD CONSTRAINT \`FK_d74fc40323e6e74bc3839e373d6\` FOREIGN KEY (\`CollectionID\`) REFERENCES \`Collection\`(\`CollectionID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Diamond\` ADD CONSTRAINT \`FK_b7bb10650d760424df4571ee3d5\` FOREIGN KEY (\`DiscountID\`) REFERENCES \`Discount\`(\`DiscountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` ADD CONSTRAINT \`FK_44b3e702c419f480d14b7df4f96\` FOREIGN KEY (\`SizeID\`) REFERENCES \`Size\`(\`SizeID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` ADD CONSTRAINT \`FK_fe40c0ef9c180bf635b2899eee1\` FOREIGN KEY (\`JewelrySettingID\`) REFERENCES \`JewelrySetting\`(\`JewelrySettingID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` ADD CONSTRAINT \`FK_ed6b364c34a05be5c11cd4bbc80\` FOREIGN KEY (\`MaterialJewelryID\`) REFERENCES \`MaterialJewelry\`(\`MaterialJewelryID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`JewelrySetting\` ADD CONSTRAINT \`FK_d87fe3a6c984623fa33839bb1d4\` FOREIGN KEY (\`JewelryTypeID\`) REFERENCES \`JewelryType\`(\`JewelryTypeID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`JewelrySetting\` ADD CONSTRAINT \`FK_5cd826fd008793434bc4ce4da18\` FOREIGN KEY (\`ProductID\`) REFERENCES \`Product\`(\`ProductID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Product\` ADD CONSTRAINT \`FK_66067f5f3673d509378b9b34151\` FOREIGN KEY (\`AccountID\`) REFERENCES \`Account\`(\`AccountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Product\` ADD CONSTRAINT \`FK_588f242bdafefcfeaf046da2c6a\` FOREIGN KEY (\`CollectionID\`) REFERENCES \`Collection\`(\`CollectionID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Product\` ADD CONSTRAINT \`FK_f8a68b3419fb78d942a33445836\` FOREIGN KEY (\`DiscountID\`) REFERENCES \`Discount\`(\`DiscountID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` ADD CONSTRAINT \`FK_2a80b04b3dfa404b976d035aeb4\` FOREIGN KEY (\`ProductID\`) REFERENCES \`Product\`(\`ProductID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` ADD CONSTRAINT \`FK_f7f9074e3314bdcf9d5d79eec9a\` FOREIGN KEY (\`DiamondID\`) REFERENCES \`Diamond\`(\`DiamondID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` ADD CONSTRAINT \`FK_1af09bfef8153f175e16073587e\` FOREIGN KEY (\`JewelrySettingID\`) REFERENCES \`JewelrySetting\`(\`JewelrySettingID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` ADD CONSTRAINT \`FK_53ec240e215a245c90ca349e60c\` FOREIGN KEY (\`CertificateID\`) REFERENCES \`Certificate\`(\`CertificateID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`UsingImage\` DROP FOREIGN KEY \`FK_53ec240e215a245c90ca349e60c\``);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` DROP FOREIGN KEY \`FK_1af09bfef8153f175e16073587e\``);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` DROP FOREIGN KEY \`FK_f7f9074e3314bdcf9d5d79eec9a\``);
        await queryRunner.query(`ALTER TABLE \`UsingImage\` DROP FOREIGN KEY \`FK_2a80b04b3dfa404b976d035aeb4\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_f8a68b3419fb78d942a33445836\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_588f242bdafefcfeaf046da2c6a\``);
        await queryRunner.query(`ALTER TABLE \`Product\` DROP FOREIGN KEY \`FK_66067f5f3673d509378b9b34151\``);
        await queryRunner.query(`ALTER TABLE \`JewelrySetting\` DROP FOREIGN KEY \`FK_5cd826fd008793434bc4ce4da18\``);
        await queryRunner.query(`ALTER TABLE \`JewelrySetting\` DROP FOREIGN KEY \`FK_d87fe3a6c984623fa33839bb1d4\``);
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` DROP FOREIGN KEY \`FK_ed6b364c34a05be5c11cd4bbc80\``);
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` DROP FOREIGN KEY \`FK_fe40c0ef9c180bf635b2899eee1\``);
        await queryRunner.query(`ALTER TABLE \`JewelrySettingVariant\` DROP FOREIGN KEY \`FK_44b3e702c419f480d14b7df4f96\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_b7bb10650d760424df4571ee3d5\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_d74fc40323e6e74bc3839e373d6\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_ef1ccbbba54707b874a1b3df2bf\``);
        await queryRunner.query(`ALTER TABLE \`Diamond\` DROP FOREIGN KEY \`FK_beac11fc7b1deab9050b9c00ce0\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_3e24b08697d0dcb0ea607f9da64\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_702b00a19cd576fd332922cddb6\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_87d1a0e4fca950091a52e91be4e\``);
        await queryRunner.query(`ALTER TABLE \`OrderLine\` DROP FOREIGN KEY \`FK_a22922c02ef2239f2a5e0f42e55\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_badcce4599250806d6bff5426eb\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_615919c21ee5a55c66b3d7859d5\``);
        await queryRunner.query(`ALTER TABLE \`Order\` DROP FOREIGN KEY \`FK_e75f91068e5c01ca5860e0d2f6c\``);
        await queryRunner.query(`ALTER TABLE \`Account\` DROP FOREIGN KEY \`FK_1f40b69ab608afc66251c4d11ea\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_7801a16c560b2df76c0a64e8455\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_1ffbd6363d12c970949fb53908c\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_332bd44d0fde3be7cc618a5cc85\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_a59ba69713765caf0c1e2c5ebc3\``);
        await queryRunner.query(`ALTER TABLE \`Feedback\` DROP FOREIGN KEY \`FK_d6fcb584fc265983d0ce5a10b2e\``);
        await queryRunner.query(`ALTER TABLE \`Notification\` DROP FOREIGN KEY \`FK_242207db359f002548b506633bf\``);
        await queryRunner.query(`ALTER TABLE \`Voucher\` DROP FOREIGN KEY \`FK_14b3ff9672754a7c6d0cfa5fe65\``);
        await queryRunner.query(`ALTER TABLE \`Certificate\` DROP FOREIGN KEY \`FK_f336682a2e0a7a6d43e112ee8d6\``);
        await queryRunner.query(`DROP TABLE \`UsingImage\``);
        await queryRunner.query(`DROP TABLE \`Product\``);
        await queryRunner.query(`DROP INDEX \`REL_5cd826fd008793434bc4ce4da1\` ON \`JewelrySetting\``);
        await queryRunner.query(`DROP TABLE \`JewelrySetting\``);
        await queryRunner.query(`DROP TABLE \`JewelrySettingVariant\``);
        await queryRunner.query(`DROP TABLE \`MaterialJewelry\``);
        await queryRunner.query(`DROP TABLE \`Size\``);
        await queryRunner.query(`DROP TABLE \`Diamond\``);
        await queryRunner.query(`DROP TABLE \`Discount\``);
        await queryRunner.query(`DROP TABLE \`Collection\``);
        await queryRunner.query(`DROP INDEX \`REL_87d1a0e4fca950091a52e91be4\` ON \`OrderLine\``);
        await queryRunner.query(`DROP TABLE \`OrderLine\``);
        await queryRunner.query(`DROP TABLE \`Order\``);
        await queryRunner.query(`DROP TABLE \`Customer\``);
        await queryRunner.query(`DROP INDEX \`REL_1f40b69ab608afc66251c4d11e\` ON \`Account\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c86ef34cc3c239edf499feb7d\` ON \`Account\``);
        await queryRunner.query(`DROP TABLE \`Account\``);
        await queryRunner.query(`DROP TABLE \`Feedback\``);
        await queryRunner.query(`DROP TABLE \`Notification\``);
        await queryRunner.query(`DROP TABLE \`Voucher\``);
        await queryRunner.query(`DROP TABLE \`Certificate\``);
        await queryRunner.query(`DROP TABLE \`JewelryType\``);
    }

}
