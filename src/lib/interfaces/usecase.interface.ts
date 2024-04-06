export interface IUsecase<T, R> {
  execute(input: T): R;
}
