import { denormalize, schema } from 'normalizr';

/**
 * Keys denormalize entities array
 * @param ids 
 * @param entities 
 * @returns  array of entity
 */
export const denormalizeEntitiesArray = (ids: any[], entities: any) => {
  const key = 'whatever';
  const fanpageSchema = new schema.Entity(key);
  return denormalize(ids, [fanpageSchema], { [key]: entities });
}
