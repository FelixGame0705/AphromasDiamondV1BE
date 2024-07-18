import { CertificateEntity } from "src/entities/certificate.entity";
import { setSeederFactory } from "typeorm-extension";

// Mapping cố định giữa ID và loại chứng chỉ
const certificateMapping = {
    1: 'GIA',
    // 2: 'AGS',
    // 3: 'IGI',
    // 4: 'HRD',
    // 5: 'GCAL',
    // 6: 'EGL',
    // 7: 'GSI',
    // 8: 'PGS',
    // 9: 'IIDGR',
    // 10: 'SGL'
  };
  
  export const certificateFactory = setSeederFactory(CertificateEntity, async (faker) => {
    const certificate = new CertificateEntity()
  
    // Chọn một ID ngẫu nhiên từ 1 đến 10
    const certificateID = faker.datatype.number({ min: 1, max: 1 });
  
    certificate.DiamondID = certificateID;
    
    // Lấy loại chứng chỉ tương ứng với ID
    const certificateType = certificateMapping[certificateID];
    
    // Tạo tên chứng chỉ
    certificate.Name = `${certificateType} Diamond Certificate`;
    
    certificate.usingImages = null;
       
    return certificate;
  })