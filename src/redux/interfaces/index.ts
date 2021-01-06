export interface IGenericEntityState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
