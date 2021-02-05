import { denormalize, schema } from 'normalizr';

/**
 * Keys denormalize entities array
 * @param ids 
 * @param entities 
 * @returns  array of entity
 */
export const denormalizeEntitiesArray = (ids: any[], entities: any): any[] => {
  const key = 'whatever';
  const fanpageSchema = new schema.Entity(key);
  return [...denormalize(ids, [fanpageSchema], { [key]: entities })];
}

/**
* formatMoney translate number to money format
* @param num the number need to be converted
* @returns  
*/
export const formatMoney = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
* formatNumber translate number to Number format
* @param num the number need to be converted
* @returns  
*/
export const formatNumber = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

/**
 * Packages format packages
 * @param packages 
 * @returns  
 */
export const formatPackages = (packages) => {
  const maintainPackageNames: string[] = [];
  const messagePackageNames: string[] = [];

  for (const packagePlan of packages) {
    if (packagePlan.packageTypeId === 1) {
      maintainPackageNames.push(packagePlan.label);
    }
    if (packagePlan.packageTypeId === 2) {
      messagePackageNames.push(packagePlan.label);
    }
  }
  return `${maintainPackageNames.length
    ? ` Gói duy trì: ${maintainPackageNames.join(', ')}`
    : ''
    } ${messagePackageNames.length
      ? ` Gói tin nhắn: ${messagePackageNames.join(', ')}`
      : ''
    } `;
};

/**
 * Packages format price
 * @param packages 
 * @returns  
 */
export const formatPrice = (packages) => {
  return formatMoney(
    packages.reduce((a, b) => {
      return a + b.price;
    }, 0),
  );
};

/**
 * Status format status
 * @param status 
 * @returns  
 */
export const formatStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Đang chờ';
    case 'running':
      return 'Đang chạy';
    case 'completed':
      return 'Hoàn thành';
    default:
      return 'Không xác định';
  }
};