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
