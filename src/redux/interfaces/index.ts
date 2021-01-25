export interface IGenericEntityState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'reset';
  error: string | null;
}
