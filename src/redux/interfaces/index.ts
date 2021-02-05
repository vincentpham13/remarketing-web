export interface IGenericEntityState {
  status: 'idle' | 'loading' | 'succeeded' | 'creating-child' | 'creating-child-failed' | 'creating-child-succeeded' | 'loading-child' | 'failed' | 'reset';
  error: string | null;
}
